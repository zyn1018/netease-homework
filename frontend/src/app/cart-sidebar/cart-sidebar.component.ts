import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {OrderService} from '../service/OrderService';
import {OrderItem} from '../domain/OrderItem';
import {CartService} from "../service/CartService";
import {CartItem} from "../domain/CartItem";
import {ProductService} from "../service/ProductService";
import {Router} from "@angular/router";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-cart-sidebar',
  templateUrl: './cart-sidebar.component.html',
  styleUrls: ['./cart-sidebar.component.css']
})
export class CartSidebarComponent implements OnInit {
  private cartItemList: CartItem[];
  private show = false;
  private totalPrice = 0;
  @Output() toggle = new EventEmitter<void>();

  constructor(private orderService: OrderService,
              private productService: ProductService,
              private cartService: CartService,
              private router: Router,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.cartService.getCartSubject().subscribe(data => {
      this.cartItemList = data;
      this.checkShowParam();
      this.calTotalPrice();
      this.cdr.markForCheck();
      this.cdr.detectChanges();
    });
  }

  /**
   * 检测是否需要显示购物车为空
   */
  checkShowParam() {
    if (this.cartItemList.length === 0) {
      this.show = false;
    } else if (this.cartItemList.length > 0) {
      this.show = true;
    }
  }

  /**
   * 计算购物车内所有商品总价
   */
  calTotalPrice() {
    this.totalPrice = 0;
    for (let i = 0; i < this.cartItemList.length; i++) {
      this.totalPrice += this.cartItemList[i].totalPrice;
    }
  }

  /**
   * 向后端提交订单
   */
  submitOrder() {
    this.cartService.getAllCartItem().subscribe(data => {
      data.forEach(item => {
        let orderItem = new OrderItem();
        this.productService.getProductByTitle(item.title).subscribe(
          data => {
            orderItem.imgUrl = data.imgUrl;
            orderItem.productId = data.productId;
            orderItem.title = item.title;
            orderItem.count = item.count;
            orderItem.totalPrice = item.totalPrice;
            orderItem.date = new Date();
            orderItem.perPrice = item.perPrice;
            this.orderService.saveOrder(orderItem).subscribe(data => {
            });
            this.productService.getProductById(item.cartItemId).subscribe(data => {
              data.bought = true;
              data.soldNumber += orderItem.count;
              this.productService.updateProductList(data).subscribe(data => {
                alert("提交订单成功!");
                location.reload();
              });
            });
          });
      });
      let cartItems: CartItem[] = [];
      this.cartService.deleteAllCartItems().subscribe(data => {
        this.cartService.setCartSubject(cartItems);
      });
    });
  }

  /**
   * 控制购物车侧边栏的开关
   */
  toggleSidebar() {
    this.toggle.emit();
  }

  /**
   * 在购物车内增加商品数量
   * @param {string} cartItemId
   */
  addProductCount(cartItemId: string) {
    let cartItem: CartItem = this.cartItemList.find(cartItem => cartItemId === cartItem.cartItemId);
    cartItem.count += 1;
    cartItem.totalPrice = cartItem.count * cartItem.perPrice;
    this.cartService.addCartItem(cartItem).subscribe(data => {
      this.cartService.getAllCartItem().subscribe(data => {
        this.cartService.setCartSubject(data);
      });
      this.cartService.getCartSubject().subscribe(data => {
        this.cartItemList = data;
        this.checkShowParam();
        this.calTotalPrice();
        this.cdr.markForCheck();
        this.cdr.detectChanges();
      });
    });
  }

  /**
   * 在购物车内减少商品数量
   * @param {string} cartItemId
   */
  reduceProductCount(cartItemId: string) {
    let cartItem: CartItem = this.cartItemList.find(cartItem => cartItemId === cartItem.cartItemId);
    if (cartItem.count === 1) {
      this.cartService.deleteCartItem(cartItem).subscribe(data => {
        this.cartService.getAllCartItem().subscribe(data => {
          this.cartService.setCartSubject(data);
        });
        this.cartService.getCartSubject().subscribe(data => {
          this.cartItemList = data;
          this.checkShowParam();
          this.calTotalPrice();
          this.cdr.markForCheck();
          this.cdr.detectChanges();
        });
      });
    } else if (cartItem.count > 1) {
      cartItem.count -= 1;
      cartItem.totalPrice = cartItem.count * cartItem.perPrice;
      this.cartService.addCartItem(cartItem).subscribe(data => {
        this.cartService.getAllCartItem().subscribe(data => {
          this.cartService.setCartSubject(data);
        });
        this.cartService.getCartSubject().subscribe(data => {
          this.cartItemList = data;
          this.checkShowParam();
          this.calTotalPrice();
          this.cdr.markForCheck();
          this.cdr.detectChanges();
        });
      })
    }
  }

}
