import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {OrderItem} from "../domain/OrderItem";
import {Observable} from "rxjs/Observable";

@Injectable()
export class OrderService {

  private saveOrderItemUrl = '/api/save_order_item';

  private getOrderItemByTitleUrl = '/api/get_order_item_by_title/';

  private getAllOrderItemUrl = '/api/get_all_order_items';

  private httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }
    )
  };


  constructor(private http: HttpClient) {
  }

  /**
   * 提交订单
   * @param {OrderItem} orderItem
   * @returns {Observable<Object>}
   */
  public saveOrder(orderItem: OrderItem) {
    if (orderItem !== null) {
      return this.http.post(this.saveOrderItemUrl, orderItem, this.httpOptions);
    }
  }

  /**
   * 根据商品标题，获取单件商品的订单历史
   * @param {string} title
   * @returns {Observable<any>}
   */
  public getOrderItemByTitle(title: string): Observable<any> {
    if (title != null && title.length > 0) {
      return this.http.get<OrderItem>(this.getOrderItemByTitleUrl + title, this.httpOptions);
    }
  }

  /**
   * 获取buyer所有的订单历史
   * @returns {Observable<any>}
   */
  public getAllOrderItems(): Observable<any> {
    return this.http.get<OrderItem[]>(this.getAllOrderItemUrl);
  }
}

