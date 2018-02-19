import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class OrderService {

  /**
   * For share order information
   */
  private orderDetail: Map<string, number[]>;

  private orderDetailSubject = new Subject<Map<string, number[]>>();

  constructor() {
    this.orderDetail = new Map<string, number[]>();
  }

  public setOrderDetailSubject(orderMap: Map<string, number[]>) {
    orderMap.forEach((v, k) => {
      if (this.orderDetail.has(k)) {
        this.orderDetail.set(k, [this.orderDetail.get(k)[0] + v[0], v[1]]);
      } else {
        this.orderDetail.set(k, v);
      }
    });
    this.orderDetailSubject.next(this.orderDetail);
  }

  public getOrderDetailSubject(): Observable<Map<string, number[]>> {
    return this.orderDetailSubject.asObservable();
  }
}

