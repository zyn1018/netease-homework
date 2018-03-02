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

  public setCartSubject(cartItems: CartItem[]) {
    this.cartItemList = cartItems;
    this.cartItemsSubject.next(this.cartItemList);
  }

  public getCartSubject(): Observable<CartItem[]> {
    return this.cartItemsSubject.asObservable();
  }

  public addCartItem(cartItem: CartItem) {
    if (cartItem !== null) {
      return this.http.post(this.addCartItemUrl, cartItem, this.httpOptions);
    }
  }

  public getAllCartItem(): Observable<any> {
    return this.http.get(this.getAllCartItemsUrl, this.httpOptions);
  }

  public deleteCartItem(cartItem: CartItem) {
    return this.http.delete(this.deleteCartItemUrl + cartItem.cartItemId, this.httpOptions);
  }

  public getCartItemById(cartItemId: string): Observable<any> {
    return this.http.get(this.getOneCartItemUrl + cartItemId, this.httpOptions);
  }

  public deleteAllCartItems() {
    return this.http.delete(this.deleteAllCartItemsUrl, this.httpOptions);
  }
}
