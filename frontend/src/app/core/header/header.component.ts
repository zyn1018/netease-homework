import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserService} from "../../service/UserService";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogin: boolean = false;
  isBuyer: boolean = false;
  @Output() toggle = new EventEmitter<void>();

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.userService.getIsLoginSubject().subscribe(data => {
      this.isLogin = data;
    });
    this.userService.getIsBuyerSubject().subscribe(data => {
      this.isBuyer = data;
    });
  }

  logout() {
    this.isLogin = false;
    this.userService.setIsLoginSubject(this.isLogin);
    this.isBuyer = false;
    this.userService.setIsBuyerSubject(this.isBuyer);
    this.router.navigateByUrl("/login");
  }

  openSidebar() {
    this.toggle.emit();
  }
}
