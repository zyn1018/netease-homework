import {Component, OnInit} from '@angular/core';
import {products} from "../utils/mock-products";

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  displayedColumns = ['image', 'title', 'time', 'count', 'price'];
  dataSource = MOCK_ORDER_HISTORY;

  constructor() {
  }

  ngOnInit() {
  }
}

export interface OrderHistory {
  image: string,
  title: string,
  time: Date,
  count: number,
  price: number
}

const MOCK_ORDER_HISTORY: OrderHistory[] = [
  {image: products[1].imgUrl, title: products[1].title, time: new Date(), count: 2, price: products[1].price * 2}
];
