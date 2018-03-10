import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../service/UserService';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticateService} from "../service/AuthenticateService";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  model: any = {};
  fb: FormBuilder = new FormBuilder();

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router,
              private authenticateService: AuthenticateService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      loginRole: ['', Validators.required]
    });
    this.authenticateService.logOut();
  }

  /**
   * 用户登录
   */
  login() {
    if (this.form.value.loginRole === 1) {
      this.authenticateService.loginBuyer(this.model.username, this.model.password).subscribe(
        data => {
          localStorage.setItem('currentBuyer', JSON.stringify(data));
          this.userService.setIsLoginSubject(true);
          this.userService.setIsBuyerSubject(true);
          this.router.navigateByUrl('/home');
        },
        err => {
          alert('输入的买家账号密码有误, 请核对后再输入');
        }
      );
    } else if (this.form.value.loginRole === 2) {
      this.authenticateService.loginSeller(this.model.username, this.model.password).subscribe(
        data => {
          localStorage.setItem('currentSeller', JSON.stringify(data));
          this.userService.setIsLoginSubject(true);
          this.userService.setIsBuyerSubject(false);
          this.router.navigateByUrl('/home');
        },
        err => {
          alert('输入的卖家账号密码有误, 请核对后再输入');
        }
      )
    }
  }
}
