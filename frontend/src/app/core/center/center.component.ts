import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Product} from "../../domain/Product";
import {products} from "../../utils/mock-products";
import {Router} from "@angular/router";
import {UserService} from "../../service/UserService";

@Component({
  selector: 'app-center',
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.css']
})
export class CenterComponent implements OnInit {
  products: Product[];
  notBoughtproducts: Product[];
  isLogin: boolean;
  isBuyer: boolean;

  constructor(private router: Router,
              private userService: UserService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.products = products;
    this.notBoughtproducts = products.filter(product => product.isBought == false);
    this.userService.getIsLoginSubject().subscribe(data => {
      this.isLogin = data;
    });
    this.userService.getIsBuyerSubject().subscribe(data => {
      this.isBuyer = data;
    });
    this.cdr.markForCheck();
    this.cdr.detectChanges();
  }

  goToProductDetail(product: Product) {
    this.router.navigateByUrl('/products/' + product.productId);
  }
}
