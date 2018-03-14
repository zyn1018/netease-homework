import {Injectable} from '@angular/core';
import {Product} from '../domain/Product';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {ObjectId} from 'bson';

@Injectable()
export class ProductService {

  private getAllProductsUrl = '/api/all_products';

  private getProductByIdUrl = '/api/product/';

  private deleteProductByIdUrl = '/api/delete_product/';

  private addProductUrl = '/api/add_product';

  private getUnboughtProductListUrl = '/api/unbought_products';

  private updateProductUrl = '/api/update_product';

  private getProductByTitleUrl = '/api/get_product_by_title/';

  private saveImageUrl = '/api/save_image/';

  private getAllImageUrl = '/api/get_all_images';

  private getImageByProductIdUrl = '/api/get_image/';

  private deleteImageByProductIdUrl = '/api/delete_image/';

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

  /**
   * 获取所有的商品列表
   * @returns {Observable<any>}
   */
  getProductList(): Observable<any> {
    return this.http.get<Product[]>(this.getAllProductsUrl, this.httpOptionsJson);
  }

  /**
   * 获取所有未购买的商品列表
   * @returns {Observable<any>}
   */
  getUnboughtProductList(): Observable<any> {
    return this.http.get<Product[]>(this.getUnboughtProductListUrl, this.httpOptionsJson);
  }

  /**
   * 更新修改后的商品信息
   * @param {Product} product
   * @returns {Observable<any>}
   */
  updateProductList(product: Product): Observable<any> {
    return this.http.post(this.updateProductUrl, product, this.httpOptionsJson);
  }

  /**
   * 根据productId，获取单件商品信息
   * @param {string} productId
   * @returns {Observable<any>}
   */
  getProductById(productId: string): Observable<any> {
    return this.http.get<Product>(this.getProductByIdUrl + productId, this.httpOptionsJson);
  }

  /**
   * 删除单件商品
   * @param {Product} product
   * @returns {Observable<Object>}
   */
  deleteProduct(product: Product) {
    return this.http.delete(this.deleteProductByIdUrl + product.productId, this.httpOptionsJson);
  }

  /**
   * 根据商品标题，获取单件商品
   * @param {string} title
   * @returns {Observable<any>}
   */
  getProductByTitle(title: string): Observable<any> {
    return this.http.get<Product>(this.getProductByTitleUrl + title, this.httpOptionsJson);
  }

  /**
   * 图片文件上传至后端
   * @param {File} imageToUpload
   * @param {string} productId
   * @returns {Observable<Object>}
   */
  imageUpload(imageToUpload: File, productId: string) {
    const formData: FormData = new FormData();
    formData.append('image', imageToUpload, imageToUpload.name);
    return this.http.post(this.saveImageUrl + productId, formData);
  }

  /**
   * 获取所有的图片文件
   * @returns {Observable<Object>}
   */
  getAllImages() {
    return this.http.get(this.getAllImageUrl);
  }

  /**
   * 根据productId，获取对应的商品图片文件
   * @param {string} productId
   * @returns {Observable<Object>}
   */
  getImageByProductId(productId: string): Observable<any> {
    return this.http.get(this.getImageByProductIdUrl + productId);
  }

  /**
   * 根据productId，删除对应的商品图片文件
   * @param {string} productId
   * @returns {Observable<Object>}
   */
  deleteImageByProductId(productId: string) {
    return this.http.delete(this.deleteImageByProductIdUrl + productId);
  }
}
