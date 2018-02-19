import {Component, OnInit} from '@angular/core';
import {Product} from '../domain/Product';
import {products} from '../utils/mock-products';
import {Router} from '@angular/router';
import {OrderService} from '../service/OrderService';
import {UserService} from '../service/UserService';
import {MatDialog, MatDialogRef} from '@angular/material';
import {AddToCartDialogComponent} from '../add-to-cart-dialog/add-to-cart-dialog.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  public productId: number;
  public product: Product;
  public orderDetail;
  public currentCount = 1;
  addToCartDialogRef: MatDialogRef<AddToCartDialogComponent>;
  // public isLogin = false;
  // public isBuyer = false;

  constructor(private router: Router,
              private orderService: OrderService,
              private userService: UserService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.productId = parseInt(this.router.url.split('/')[2]);
    this.product = products.find(product => product.productId === this.productId);
    this.orderDetail = new Map<string, number[]>();
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
}
