import {Component, OnInit} from '@angular/core';
import {DataSource} from "@angular/cdk/collections";
import {OrderService} from "../service/OrderService";
import {ProductService} from "../service/ProductService";
import {Observable} from "rxjs/Observable";
import {OrderItem} from "../domain/OrderItem";

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  displayedColumns = ['image', 'title', 'time', 'count', 'totalPrice'];
  totalPaidAmount = 0;
  dataSource = new OrderDataSource(this.orderService);
  showSpinner = false;


  constructor(private productService: ProductService,
              private orderService: OrderService) {
  }

  ngOnInit() {
    this.showSpinner = true;
    setTimeout(() => {
      this.showSpinner = false;
    }, 700);
    this.orderService.getAllOrderItems().subscribe(
      data => {
        data.forEach(item => {
          this.totalPaidAmount += item.totalPrice;
        })
      }
    );
  }
}

export class OrderDataSource extends DataSource<any> {
  constructor(private orderService: OrderService) {
    super();
  }

  connect(): Observable<OrderItem[]> {
    return this.orderService.getAllOrderItems();
  }

  disconnect() {
  }
}
