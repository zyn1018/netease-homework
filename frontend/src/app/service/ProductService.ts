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

  private saveImageUrl = '/api/save_image';

  private httpOptionsJson = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }
    )
  };

  private httpOptionsFormData = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data',
      }
    )
  };
  constructor(private http: HttpClient) {
  }

  getProductList(): Observable<any> {
    return this.http.get<Product[]>(this.getAllProductsUrl, this.httpOptionsJson);
  }

  getUnboughtProductList(): Observable<any> {
    return this.http.get<Product[]>(this.getUnboughtProductListUrl, this.httpOptionsJson);
  }

  updateProductList(product: Product): Observable<any> {
    if (product.productId === "0") {
      return this.http.post(this.addProductUrl, product, this.httpOptionsJson);
    } else {
      return this.http.post(this.updateProductUrl, product, this.httpOptionsJson);
    }
  }


  getProductById(productId: string): Observable<any> {
    return this.http.get<Product>(this.getProductByIdUrl + productId, this.httpOptionsJson);
  }

  deleteProduct(product: Product) {
    return this.http.delete(this.deleteProductByIdUrl + product.productId, this.httpOptionsJson);
  }

  getProductByTitle(title: string): Observable<any> {
    return this.http.get<Product>(this.getProductByTitleUrl + title, this.httpOptionsJson);
  }

  imageUpload(imageToUpload: File) {
    const formData: FormData = new FormData();
    formData.append('image', imageToUpload, imageToUpload.name);
    console.log(formData.get('image'));
    return this.http.post(this.saveImageUrl, formData);
  }
}
