import {Injectable} from '@angular/core';
import {Product} from '../domain/Product';
import {products} from '../utils/mock-products';

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
}
