import {DeleteProductDialogComponent} from '../../delete-product-dialog/delete-product-dialog.component';
import {MatDialog, MatDialogRef} from '@angular/material';
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Product} from '../../domain/Product';
import {Router} from '@angular/router';
import {UserService} from '../../service/UserService';
import {ProductService} from '../../service/ProductService';

@Component({
  selector: 'app-center',
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.css']
})
export class CenterComponent implements OnInit {
  products: Product[];
  notBoughtProducts: Product[];
  isLogin = false;
  isBuyer = false;
  deleteProductDialogRef: MatDialogRef<DeleteProductDialogComponent>;
  showCenterSpinner = false;

  constructor(private router: Router,
              private userService: UserService,
              private cdr: ChangeDetectorRef,
              private productService: ProductService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.showCenterSpinner = true;
    setTimeout(() => {
      this.showCenterSpinner = false;
    }, 500);
    this.productService.getProductList().subscribe(data => {
      this.products = data;
    });

    if (localStorage.getItem('currentBuyer') != null) {
      this.productService.getUnboughtProductList().subscribe(data => {
        this.notBoughtProducts = data;
      });
    }
    this.userService.getIsLoginSubject().subscribe(data => {
      this.isLogin = data;
    });
    this.userService.getIsBuyerSubject().subscribe(data => {
      this.isBuyer = data;
    });
  }

  goToProductDetail(product: Product) {
    this.router.navigateByUrl('/products/' + product.productId);
  }

  openDeleteProductDialog(product: Product) {
    this.deleteProductDialogRef = this.dialog.open(DeleteProductDialogComponent);
    this.deleteProductDialogRef.afterClosed().subscribe(result => {
        if (true === result) {
          this.productService.deleteProduct(product).subscribe(data =>
            this.productService.getProductList().subscribe(data => {
              this.products = data;
            }));
        }
      }
    );
  }
}
