import {Component, OnInit} from '@angular/core';
import {products} from '../utils/mock-products';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  displayedColumns = ['image', 'title', 'time', 'count', 'totalPrice'];
  dataSource = MOCK_ORDER_HISTORY;
  totalPaidAmount = 0;

  constructor() {
  }

  ngOnInit() {
    for (let i = 0; i < MOCK_ORDER_HISTORY.length; i++) {
      this.totalPaidAmount += MOCK_ORDER_HISTORY[i].totalPrice;
    }
  }
}

export interface OrderHistory {
  image: string;
  title: string;
  time: Date;
  count: number;
  totalPrice: number;
}

const MOCK_ORDER_HISTORY: OrderHistory[] = [
  {image: products[1].imgUrl, title: products[1].title, time: new Date(), count: 2, totalPrice: products[1].price * 2}
];
