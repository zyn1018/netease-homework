import {products} from './../utils/mock-products';
import {Injectable} from '@angular/core';
import {Product} from '../domain/Product';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ProductService {

  private getAllProductsUrl = '/api/all_products';

  private getProductByIdUrl = '/api/product/';

  private deleteProductByIdUrl = '/api/delete_product/';

  private httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }
    )
  };

  constructor(private http: HttpClient) {
  }

  getProductList(): Observable<any> {
    return this.http.get(this.getAllProductsUrl, this.httpOptions);
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


  getProductById(productId: number): Observable<any> {
    return this.http.get(this.getProductByIdUrl + productId, this.httpOptions);
  }

  deleteProduct(product: Product) {
    return this.http.delete(this.deleteProductByIdUrl + product.productId, this.httpOptions);
  }
}
