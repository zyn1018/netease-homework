export class Order {
  constructor(public orderDetail: Map<string, number[]>,
              public totalPrice: number,
              public time: Date) {
  }
}
