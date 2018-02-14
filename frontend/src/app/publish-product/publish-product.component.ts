import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Location} from '@angular/common';

@Component({
  selector: 'app-publish-product',
  templateUrl: './publish-product.component.html',
  styleUrls: ['./publish-product.component.css']
})
export class PublishProductComponent implements OnInit {
  formModel: FormGroup;
  model: any = {};

  priceValidator(price: FormControl): any {
    const value = (price.value || '') + '';
    const myPrice = /^[1-9]+(\.[0-9]{1,2})*/;
    const valid = myPrice.test(value);
    return valid ? null : {price: true};
  }

  constructor(private location: Location) {
  }

  ngOnInit() {
    const fb = new FormBuilder();
    this.formModel = fb.group(
      {
        title: new FormControl('', [Validators.required, Validators.maxLength(80), Validators.minLength(2)]),
        introduction: new FormControl('', [Validators.required, Validators.maxLength(140), Validators.minLength(2)]),
        imageUrl: new FormControl(),
        detail: new FormControl('', [Validators.required, Validators.maxLength(1000), Validators.minLength(2)]),
        price: new FormControl('', [Validators.required, this.priceValidator])
      }
    );
  }

  goBack() {
    this.location.back();
  }
}
