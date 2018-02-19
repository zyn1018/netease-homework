import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class UserService {
  isLogin = false;
  isBuyer = false;

  private isLoginSubject = new BehaviorSubject<boolean>(this.isLogin);
  private isBuyerSubject = new BehaviorSubject<boolean>(this.isBuyer);

  constructor() {
    this.isLoginSubject.next(false);
    this.isBuyerSubject.next(false);
  }


  public setIsLoginSubject(isLogin: boolean) {
    this.isLogin = isLogin;
    this.isLoginSubject.next(isLogin);
  }

  public getIsLoginSubject(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }

  public setIsBuyerSubject(isBuyer: boolean) {
    this.isBuyer = isBuyer;
    this.isBuyerSubject.next(isBuyer);
  }

  public getIsBuyerSubject(): Observable<boolean> {
    return this.isBuyerSubject.asObservable();
  }
}
