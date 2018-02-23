import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {products} from '../utils/mock-products';
import {Product} from '../domain/Product';
import {ProductService} from '../service/ProductService';

@Component({
  selector: 'app-publish-product',
  templateUrl: './publish-product.component.html',
  styleUrls: ['./publish-product.component.css']
})
export class PublishProductComponent implements OnInit {
  formModel: FormGroup;
  model: any = {};
  productEdited: Product;
  isPublish: boolean;

  priceValidator(price: FormControl): any {
    const value = (price.value || '') + '';
    const myPrice = /^[1-9]+(\.[0-9]{1,2})*/;
    const valid = myPrice.test(value);
    return valid ? null : {price: true};
  }

  constructor(private location: Location,
              private router: Router,
              private routeInfo: ActivatedRoute,
              private productService: ProductService) {
  }

  ngOnInit() {
    const productId = parseInt(this.router.url.split('/')[2]);
    if (productId !== 0) {
      this.isPublish = false;
      this.productEdited = products.find(product => product.productId === productId);
    } else if (productId === 0) {
      this.isPublish = true;
      this.productEdited = new Product(0, '', '', null, '', '', false, 0);
    }
    const fb = new FormBuilder();
    this.formModel = fb.group(
      {
        title: [this.productEdited.title, [Validators.required, Validators.maxLength(80), Validators.minLength(2)]],
        introduction: [this.productEdited.introduction,
          [Validators.required,
            Validators.maxLength(140),
            Validators.minLength(2)]],
        imageUrl: [this.productEdited.imgUrl],
        detail: [this.productEdited.detail, [Validators.required, Validators.maxLength(1000), Validators.minLength(2)]],
        price: [this.productEdited.price, [Validators.required, this.priceValidator]]
      }
    );
  }

  goBack() {
    this.location.back();
  }

  saveProduct() {
    this.productEdited.title = this.formModel.get('title').value;
    this.productEdited.introduction = this.formModel.get('introduction').value;
    this.productEdited.imgUrl = this.formModel.get('imageUrl').value;
    this.productEdited.detail = this.formModel.get('detail').value;
    this.productEdited.price = this.formModel.get('price').value;
    this.productService.updateProductList(this.productEdited);
    this.location.back();
  }
}
