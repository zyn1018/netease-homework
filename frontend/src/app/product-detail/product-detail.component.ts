import {Component, OnInit} from '@angular/core';
import {Product} from '../domain/Product';
import {Router} from '@angular/router';
import {OrderService} from '../service/OrderService';
import {UserService} from '../service/UserService';
import {MatDialog, MatDialogRef} from '@angular/material';
import {AddToCartDialogComponent} from '../add-to-cart-dialog/add-to-cart-dialog.component';
import {ProductService} from "../service/ProductService";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  public productId: string;
  public product: Product;
  public imageUrl: string;
  public orderDetail;
  public currentCount = 1;
  addToCartDialogRef: MatDialogRef<AddToCartDialogComponent>;
  public isLogin = false;
  public isBuyer = false;

  constructor(private router: Router,
              private orderService: OrderService,
              private userService: UserService,
              private dialog: MatDialog,
              private productService: ProductService,
              private http: HttpClient) {
  }

  ngOnInit() {
    this.productId = this.router.url.split('/')[2];
    this.productService.getProductById(this.productId).subscribe(
      data => this.product = data
    );
    this.orderDetail = new Map<string, number[]>();
    this.userService.getIsLoginSubject().subscribe(data => {
      this.isLogin = data;
    });
    this.userService.getIsBuyerSubject().subscribe(data => {
      this.isBuyer = data;
    });
  }


  addToOrder(product: Product) {
    this.orderDetail.set(product.title, [this.currentCount, product.price]);
    this.orderService.setOrderDetailSubject(this.orderDetail);
  }

  reduceCurrentCount() {
    if (this.currentCount > 0) {
      this.currentCount--;
    } else {
      this.currentCount = 0;
    }
  }

  addCurrentCount() {
    this.currentCount++;
  }

  openAddToCartDialog() {
    this.addToCartDialogRef = this.dialog.open(AddToCartDialogComponent);
    this.addToCartDialogRef.afterClosed().subscribe(result => {
        if (true === result) {
          this.addToOrder(this.product);
        }
      }
    );
  }

  openEditPage() {
    this.router.navigateByUrl('/publish/' + this.productId);
  }
}
