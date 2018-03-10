import {Component, OnInit} from '@angular/core';
import {Product} from '../domain/Product';
import {Router} from '@angular/router';
import {OrderService} from '../service/OrderService';
import {UserService} from '../service/UserService';
import {MatDialog, MatDialogRef} from '@angular/material';
import {AddToCartDialogComponent} from '../add-to-cart-dialog/add-to-cart-dialog.component';
import {ProductService} from "../service/ProductService";
import {CartService} from "../service/CartService";
import {CartItem} from "../domain/CartItem";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  private productId: string;
  private product: Product;
  private currentCount = 1;
  addToCartDialogRef: MatDialogRef<AddToCartDialogComponent>;
  private isLogin = false;
  private isBuyer = false;
  private soldPrice = 0;
  private imageCachePath = 'assets/image_cache/';
  private imageExtension = '.jpg';
  private imagePath;

  constructor(private router: Router,
              private orderService: OrderService,
              private userService: UserService,
              private dialog: MatDialog,
              private productService: ProductService,
              private cartService: CartService) {
  }

  ngOnInit() {
    this.productId = this.router.url.split('/')[2];
    this.imagePath = this.imageCachePath + this.productId + this.imageExtension;
    this.productService.getProductById(this.productId).subscribe(
      data => {
        this.product = data;
        if (this.product.bought) {
          this.orderService.getOrderItemByTitle(this.product.title).subscribe(
            data => this.soldPrice = data.perPrice
          );
        }
      });
    this.userService.getIsLoginSubject().subscribe(data => {
      this.isLogin = data;
    });
    this.userService.getIsBuyerSubject().subscribe(data => {
      this.isBuyer = data;
    });
  }


  /**
   * 将商品添加到购物车
   * @param {Product} product
   */
  addToCart(product: Product) {
    let cartItem: CartItem = new CartItem();
    cartItem.cartItemId = product.productId;
    cartItem.title = product.title;
    cartItem.count = this.currentCount;
    cartItem.perPrice = product.price;
    cartItem.totalPrice = cartItem.count * cartItem.perPrice;
    this.cartService.getCartItemById(cartItem.cartItemId).subscribe(data => {
      if (data == null) {
        this.cartService.addCartItem(cartItem).subscribe(data => {
          this.cartService.getAllCartItem().subscribe(data => {
            this.cartService.setCartSubject(data);
          });
        });
      } else if (data != null) {
        cartItem.count += data.count;
        cartItem.totalPrice += data.totalPrice;
        this.cartService.addCartItem(cartItem).subscribe(data => {
          this.cartService.getAllCartItem().subscribe(data => {
            this.cartService.setCartSubject(data);
          });
        });
      }
    });
  }

  /**
   * 在商品查看界面减少商品的数量
   */
  reduceCurrentCount() {
    if (this.currentCount > 0) {
      this.currentCount--;
    } else {
      this.currentCount = 0;
    }
  }

  /**
   * 在商品查看界面增加商品的数量
   */
  addCurrentCount() {
    this.currentCount++;
  }

  /**
   * 弹出是否确认将该商品添加到购物车的对话框，并在用户点击确认后将商品添加到购物车
   */
  openAddToCartDialog() {
    this.addToCartDialogRef = this.dialog.open(AddToCartDialogComponent);
    this.addToCartDialogRef.afterClosed().subscribe(result => {
        if (true === result) {
          this.addToCart(this.product);
        }
      }
    );
  }

  /**
   * 进入商品编辑界面
   */
  openEditPage() {
    this.router.navigateByUrl('/publish/' + this.productId);
  }
}
