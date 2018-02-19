import {OrderDetail} from './OrderDetail';

export class Order {
  constructor(public orderDetail: OrderDetail[],
              public totalPrice: number,
              public time: Date) {
  }
}
