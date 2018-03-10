import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserService} from "../../service/UserService";
import {Router} from "@angular/router";
import {AuthenticateService} from "../../service/AuthenticateService";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogin: boolean;
  isBuyer: boolean;
  @Output() toggle = new EventEmitter<void>();
  nickname: string;

  constructor(private userService: UserService,
              private router: Router,
              private authenticateService: AuthenticateService,
              private http: HttpClient) {
  }

  ngOnInit() {
    if (localStorage.getItem('currentBuyer') != null) {
      this.isLogin = true;
      this.userService.setIsLoginSubject(this.isLogin);
      this.isBuyer = true;
      this.userService.setIsBuyerSubject(this.isBuyer);
    } else if (localStorage.getItem('currentSeller') != null) {
      this.isLogin = true;
      this.userService.setIsLoginSubject(this.isLogin);
      this.isBuyer = false;
      this.userService.setIsBuyerSubject(this.isBuyer);
    } else {
      this.isLogin = false;
      this.userService.setIsLoginSubject(this.isLogin);
      this.isBuyer = false;
      this.userService.setIsBuyerSubject(this.isBuyer);
    }

    this.userService.getIsLoginSubject().subscribe(data => {
      this.isLogin = data;
      if (localStorage.getItem('currentBuyer') != null) {
        this.nickname = JSON.parse(localStorage.getItem('currentBuyer')).username;
      } else if (localStorage.getItem('currentSeller') != null) {
        this.nickname = JSON.parse(localStorage.getItem('currentSeller')).username;
      } else {
        this.nickname = '';
      }
    });
    this.userService.getIsBuyerSubject().subscribe(data => {
      this.isBuyer = data;
    });
  }

  /**
   * 用户登出
   */
  logout() {
    this.authenticateService.logOut();
    this.isLogin = false;
    this.userService.setIsLoginSubject(this.isLogin);
    this.isBuyer = false;
    this.userService.setIsBuyerSubject(this.isBuyer);

    this.router.navigateByUrl('/login');
  }

  /**
   * 控制是否打开购物车侧边栏
   */
  openSidebar() {
    this.toggle.emit();
  }
}
