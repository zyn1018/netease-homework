import {DeleteProductDialogComponent} from '../../delete-product-dialog/delete-product-dialog.component';
import {MatDialog, MatDialogRef} from '@angular/material';
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Product} from '../../domain/Product';
import {products} from '../../utils/mock-products';
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

  constructor(private router: Router,
              private userService: UserService,
              private cdr: ChangeDetectorRef,
              private productService: ProductService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.products = products;
    this.notBoughtProducts = products.filter(product => product.isBought === false);
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

  delete(product: Product) {
    this.productService.deleteProduct(product);
  }

  openDeleteProductDialog(product: Product) {
    this.deleteProductDialogRef = this.dialog.open(DeleteProductDialogComponent);
    this.deleteProductDialogRef.afterClosed().subscribe(result => {
        if (true === result) {
          this.productService.deleteProduct(product);
        }
      }
    );
  }
}
