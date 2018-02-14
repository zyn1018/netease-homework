import {Product} from './Product';

export class OrderDetail {
  constructor(public product: Product,
              public count: number) {
  }
}
