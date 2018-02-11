import {Component, Inject, OnInit} from '@angular/core';
import {Product} from "../domain/Product";
import {products} from "../utils/mock-products";
import {DOCUMENT} from "@angular/platform-browser";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  public productId: number;
  public product: Product;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.productId = parseInt(this.router.url.split('/')[2]);
    this.product = products.find(product => product.productId == this.productId);
  }


}
