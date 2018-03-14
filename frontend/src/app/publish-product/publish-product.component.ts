import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../domain/Product';
import {ProductService} from '../service/ProductService';
import {ObjectID} from 'bson';

@Component({
  selector: 'app-publish-product',
  templateUrl: './publish-product.component.html',
  styleUrls: ['./publish-product.component.css']
})
export class PublishProductComponent implements OnInit {
  formModel: FormGroup;
  productEdited: Product;
  isPublish: boolean;
  imgUrl: string;
  imageToUpload: File;
  image: string;
  newProductId: string;
  private imageCachePath = 'assets/image_cache/';
  private imageExtension = '.jpg';
  private imagePath: string;

  @ViewChild('fileInput')
  fileInputVariable: any;

  priceValidator(price: FormControl): any {
    const value = (price.value || '') + '';
    const myPrice = /^[1-9]+(\.[0-9]{1,2})*/;
    const valid = myPrice.test(value);
    return valid ? null : {price: true};
  }

  constructor(private location: Location,
              private router: Router,
              private routeInfo: ActivatedRoute,
              private productService: ProductService,
              private ngZone: NgZone) {
  }

  ngOnInit() {
    const productId = this.router.url.split('/')[2];
    if (productId !== '0') {
      this.isPublish = false;
      this.productService.getProductById(productId).subscribe(data => {
        this.productEdited = data;
        this.imagePath = this.imageCachePath + this.productEdited.productId + this.imageExtension;
        const fb = new FormBuilder();
        this.formModel = fb.group(
          {
            title: [this.productEdited.title, [Validators.required, Validators.maxLength(80), Validators.minLength(2)]],
            introduction: [this.productEdited.introduction,
              [Validators.required,
                Validators.maxLength(140),
                Validators.minLength(2)]],
            imageOption: [1],
            imageUrl: [this.productEdited.imgUrl],
            imageFile: [''],
            detail: [this.productEdited.detail, [Validators.required, Validators.maxLength(1000), Validators.minLength(2)]],
            price: [this.productEdited.price, [Validators.required, this.priceValidator]]
          }
        );
      })
    } else if (productId === '0') {
      this.imagePath = '';
      this.newProductId = new ObjectID();
      this.isPublish = true;
      this.productEdited = new Product('0', '', '', '', null, '', '', false, 0);
      const fb = new FormBuilder();
      this.formModel = fb.group(
        {
          title: [this.productEdited.title, [Validators.required, Validators.maxLength(80), Validators.minLength(2)]],
          introduction: [this.productEdited.introduction,
            [Validators.required,
              Validators.maxLength(140),
              Validators.minLength(2)]],
          imageOption: [1],
          imageUrl: [this.productEdited.imgUrl],
          imageFile: [''],
          detail: [this.productEdited.detail, [Validators.required, Validators.maxLength(1000), Validators.minLength(2)]],
          price: [this.productEdited.price, [Validators.required, this.priceValidator]]
        });
    }
  }


  goBack() {
    this.location.back();
  }

  /**
   * 对修改后的商品进行保存
   */
  saveProduct() {
    this.productEdited.title = this.formModel.get('title').value;
    this.productEdited.introduction = this.formModel.get('introduction').value;
    this.productEdited.imgUrl = this.formModel.get('imageUrl').value;
    this.productEdited.detail = this.formModel.get('detail').value;
    this.productEdited.price = this.formModel.get('price').value;
    if (this.productEdited.productId === '0') {
      this.productEdited.productId = this.newProductId;
      this.productService.updateProductList(this.productEdited).subscribe(
        response => {
          this.productService.getAllImages().subscribe();
          this.router.navigateByUrl('/products/' + response.productId);
        }
      );
    } else {
      this.productService.updateProductList(this.productEdited).subscribe(
        response => {
          this.productService.getAllImages().subscribe();
          this.router.navigateByUrl('/products/' + this.productEdited.productId);
        });
    }
  }

  /**
   * 对上传图片文件的大小进行验证，不能超过1Mb
   * @param event
   */
  selectFile(event) {
    if (event.target.files.item(0).size > 1000000) {
      alert("上传图片大小不能超过1Mb, 请重新选择!");
      this.fileInputVariable.nativeElement.value = '';
    } else {
      this.imageToUpload = event.target.files.item(0);
    }
  }

  /**
   * 上传商品的图片文件
   */
  upload() {
    const productId = this.router.url.split('/')[2];
    if (this.imageToUpload != null) {
      if (productId === '0') {
        this.productService.imageUpload(this.imageToUpload, this.newProductId).subscribe(res => {
          this.imagePath = this.imageCachePath + this.newProductId + this.imageExtension;
          this.productService.getImageByProductId(this.newProductId).subscribe();
          alert('图片上传成功');

        });
      } else {
        this.productService.imageUpload(this.imageToUpload, this.productEdited.productId).subscribe(res => {
          this.productService.getProductById(this.productEdited.productId).subscribe(res => {
              res.imgUrl = '';
              this.productService.updateProductList(res).subscribe(res => {
                this.productService.getImageByProductId(this.productEdited.productId).subscribe();
                alert('图片上传成功');
              });
            }
          )
        });
      }
    } else {
      alert('未选中图片文件, 请选中文件后重试!')
    }
  }
}
