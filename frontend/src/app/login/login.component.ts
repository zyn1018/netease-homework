import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../service/UserService';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private isLogin = false;
  private isBuyer = false;
  returnUrl: string;

  form: FormGroup;
  model: any = {};
  fb: FormBuilder = new FormBuilder();

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      username: [''],
      password: [''],
      loginRole: ['', Validators.required]
    });
  }

  login() {
    this.isLogin = true;
    this.userService.setIsLoginSubject(true);
    if (this.form.value.loginRole === 1) {
      this.isBuyer = true;
      this.userService.setIsBuyerSubject(this.isBuyer);
    } else if (this.form.value.loginRole === 2) {
      this.isBuyer = false;
      this.userService.setIsBuyerSubject(this.isBuyer);
    }

    this.router.navigateByUrl('/home');
  }
}
