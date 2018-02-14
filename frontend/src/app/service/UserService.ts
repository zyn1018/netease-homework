import {ChangeDetectorRef, Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UserService {

  isLogin = false;
  isBuyer = false;

  constructor() {
  }

  // For communication among different components
  private isLoginSubject = new Subject<boolean>();
  private isBuyerSubject = new Subject<boolean>();

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
