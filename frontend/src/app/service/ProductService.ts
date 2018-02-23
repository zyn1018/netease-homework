import {products} from './../utils/mock-products';
import {Injectable} from '@angular/core';
import {Product} from '../domain/Product';

@Injectable()
export class ProductService {

  constructor() {
  }

  getProductList(): Product[] {
    return products;
  }

  updateProductList(product: Product) {
    if (product.productId === 0) {
      product.productId = products.length + 1;
      products.push(product);
      products.sort((p1, p2) => p1.productId - p2.productId);
    } else {
      products.splice(product.productId - 1, 1, product);
    }
  }


  deleteProduct(product: Product) {
    products.splice(product.productId - 1, 1);
    for (let i = product.productId - 1; i < products.length; i++) {
      products[i].productId -= 1;
    }
  }
}
