import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {md5} from "../utils/md5";

@Injectable()
export class AuthenticateService {
  private loginBuyerUrl = '/api/login_buyer';

  private loginSellerUrl = '/api/login_seller';

  private httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }
    )
  };

  constructor(private http: HttpClient) {
  }

  loginBuyer(username: string, password: string) {
    const md5Password: string = md5(password);
    return this.http.post(this.loginBuyerUrl, {
      username: username,
      password: md5Password
    }, this.httpOptions);
  }

  loginSeller(username: string, password: string) {
    const md5Password: string = md5(password);
    return this.http.post(this.loginSellerUrl, {
      username: username,
      password: md5Password
    }, this.httpOptions);
  }

  logOut() {
    if (localStorage.getItem('currentBuyer') != null) {
      localStorage.removeItem('currentBuyer');
    } else if (localStorage.getItem('currentSeller') != null) {
      localStorage.removeItem('currentSeller');
    }
  }
}
