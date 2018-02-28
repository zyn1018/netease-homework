export class Product {
  constructor(public productId: string,
              public title: string,
              public imgUrl: string,
              public price: number,
              public introduction: string,
              public detail: string,
              public bought: boolean,
              public soldNumber: number) {
  }
}
