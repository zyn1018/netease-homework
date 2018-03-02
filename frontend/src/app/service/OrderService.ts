import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {OrderItem} from "../domain/OrderItem";

@Injectable()
export class OrderService {

  private saveOrderItemUrl = '/api/save_order_item'

  private httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }
    )
  };


  constructor(private http: HttpClient) {
  }

  public saveOrder(orderItem: OrderItem) {
    if (orderItem !== null) {
      return this.http.post(this.saveOrderItemUrl, orderItem, this.httpOptions);
    }
  }
}

