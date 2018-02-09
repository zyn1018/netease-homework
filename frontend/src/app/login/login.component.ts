import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  model: any = {};
  fb: FormBuilder = new FormBuilder();

  constructor() {
  }

  ngOnInit() {
    this.form = this.fb.group({
      username: [''],
      password: ['']
    });
  }

}
