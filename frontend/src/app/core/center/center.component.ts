import {Component, OnInit} from '@angular/core';
import {product} from "../../domain/product";
import {products} from "../../utils/mock-products";

@Component({
  selector: 'app-center',
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.css']
})
export class CenterComponent implements OnInit {
  products: product[];
  constructor() {
  }

  ngOnInit() {
    this.products = products
  }

}
