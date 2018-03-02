import {Injectable} from '@angular/core';
import {Product} from '../domain/Product';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ProductService {

  private getAllProductsUrl = '/api/all_products';

  private getProductByIdUrl = '/api/product/';

  private deleteProductByIdUrl = '/api/delete_product/';

  private addProductUrl = '/api/add_product';

  private getUnboughtProductListUrl = '/api/unbought_products';

  private updateProductUrl = '/api/update_product';

  private getProductByTitleUrl = '/api/get_product_by_title/';

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

  getUnboughtProductList(): Observable<any> {
    return this.http.get(this.getUnboughtProductListUrl, this.httpOptions);
  }

  updateProductList(product: Product) {
    if (product.productId === "0") {
      return this.http.post(this.addProductUrl, product, this.httpOptions);
    } else {
      return this.http.post(this.updateProductUrl, product, this.httpOptions);
    }
  }


  getProductById(productId: string): Observable<any> {
    return this.http.get(this.getProductByIdUrl + productId, this.httpOptions);
  }

  deleteProduct(product: Product) {
    return this.http.delete(this.deleteProductByIdUrl + product.productId, this.httpOptions);
  }

  getProductByTitle(title: string): Observable<any> {
    return this.http.get(this.getProductByTitleUrl + title, this.httpOptions);
  }
}
