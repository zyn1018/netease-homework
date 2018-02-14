import {OrderDetail} from './OrderDetail';

export class Order {
  constructor(public orderDetail: OrderDetail[],
              public price: number,
              public time: Date) {
  }
}
