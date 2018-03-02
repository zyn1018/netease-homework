import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {OrderItem} from "../domain/OrderItem";
import {Observable} from "rxjs/Observable";

@Injectable()
export class OrderService {

  private saveOrderItemUrl = '/api/save_order_item';

  private getOrderItemByTitleUrl = '/api/get_order_item_by_title/';

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

  public getOrderItemByTitle(title: string): Observable<any> {
    if (title != null && title.length > 0) {
      return this.http.get(this.getOrderItemByTitleUrl + title, this.httpOptions);
    }
  }
}

