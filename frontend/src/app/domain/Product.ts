export class Product {
  constructor(public productId: number,
              public title: string,
              public imgUrl: string,
              public price: number,
              public introduction: string,
              public detail: string,
              public isBought: boolean) {
  }
}
