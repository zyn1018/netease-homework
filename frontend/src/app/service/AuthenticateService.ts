import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {md5} from "../utils/md5";

@Injectable()
export class AuthenticateService {
  private loginBuyerUrl = '/api/login_buyer';

  private loginSellerUrl = '/api/login_seller';

  private logoutBuyerUrl = '/api/logout_buyer';

  private logoutSellerUrl = '/api/logout_seller';

  private httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }
    )
  };

  constructor(private http: HttpClient) {
  }

  /**
   * Buyer登录
   * @param {string} username
   * @param {string} password
   * @returns {Observable<Object>}
   */
  loginBuyer(username: string, password: string) {
    const md5Password: string = md5(password);
    return this.http.post(this.loginBuyerUrl, {
      username: username,
      password: md5Password
    }, this.httpOptions);
  }

  /**
   * Seller登录
   * @param {string} username
   * @param {string} password
   * @returns {Observable<Object>}
   */
  loginSeller(username: string, password: string) {
    const md5Password: string = md5(password);
    return this.http.post(this.loginSellerUrl, {
      username: username,
      password: md5Password
    }, this.httpOptions);
  }

  /**
   * 用户登出
   */
  logOut() {
    if (localStorage.getItem('currentBuyer') != null) {
      this.http.post(this.logoutBuyerUrl, this.httpOptions);
      localStorage.removeItem('currentBuyer');
    } else if (localStorage.getItem('currentSeller') != null) {
      this.http.post(this.logoutSellerUrl, this.httpOptions);
      localStorage.removeItem('currentSeller');
    }
  }
}
