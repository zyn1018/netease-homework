import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CartItem} from "../domain/CartItem";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";

@Injectable()
export class CartService {

  private addCartItemUrl = '/api/add_cart_item';

  private getAllCartItemsUrl = '/api/get_all_cart_items';

  private deleteCartItemUrl = '/api/delete_cart_item/';

  private getOneCartItemUrl = '/api/get_cart_item/';

  private deleteAllCartItemsUrl = '/api/delete_all_cart_items';

  private httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }
    )
  };

  private cartItemsSubject = new Subject<CartItem[]>();

  private cartItemList: CartItem[];

  constructor(private http: HttpClient) {
    this.getAllCartItem().subscribe(data => {
      this.cartItemList = data;
      this.setCartSubject(data);
    })
  }

  /**
   * 动态显示购物车内的商品
   * @param {CartItem[]} cartItems
   */
  public setCartSubject(cartItems: CartItem[]) {
    this.cartItemList = cartItems;
    this.cartItemsSubject.next(this.cartItemList);
  }

  public getCartSubject(): Observable<CartItem[]> {
    return this.cartItemsSubject.asObservable();
  }

  /**
   * 添加商品至购物车
   * @param {CartItem} cartItem
   * @returns {Observable<Object>}
   */
  public addCartItem(cartItem: CartItem) {
    if (cartItem !== null) {
      return this.http.post(this.addCartItemUrl, cartItem, this.httpOptions);
    }
  }

  /**
   * 获取购物车内所有商品的信息
   * @returns {Observable<any>}
   */
  public getAllCartItem(): Observable<any> {
    return this.http.get<CartItem[]>(this.getAllCartItemsUrl, this.httpOptions);
  }

  /**
   * 删除购物车内单件商品
   * @param {CartItem} cartItem
   * @returns {Observable<Object>}
   */
  public deleteCartItem(cartItem: CartItem) {
    return this.http.delete(this.deleteCartItemUrl + cartItem.cartItemId, this.httpOptions);
  }

  /**
   * 根据购物车商品id，获取购物车内的单件商品
   * @param {string} cartItemId
   * @returns {Observable<any>}
   */
  public getCartItemById(cartItemId: string): Observable<any> {
    return this.http.get<CartItem>(this.getOneCartItemUrl + cartItemId, this.httpOptions);
  }

  /**
   * 清空购物车
   * @returns {Observable<Object>}
   */
  public deleteAllCartItems() {
    return this.http.delete(this.deleteAllCartItemsUrl, this.httpOptions);
  }
}
