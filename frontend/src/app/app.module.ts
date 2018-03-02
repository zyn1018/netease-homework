import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {LoginComponent} from './login/login.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {CartSidebarComponent} from './cart-sidebar/cart-sidebar.component';
import {OrderHistoryComponent} from './order-history/order-history.component';
import {PublishProductComponent} from './publish-product/publish-product.component';
import {AddToCartDialogComponent} from './add-to-cart-dialog/add-to-cart-dialog.component';
import {DeleteProductDialogComponent} from './delete-product-dialog/delete-product-dialog.component';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductDetailComponent,
    CartSidebarComponent,
    OrderHistoryComponent,
    PublishProductComponent,
    AddToCartDialogComponent,
    DeleteProductDialogComponent
  ],
  imports: [
    CoreModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AddToCartDialogComponent, DeleteProductDialogComponent]
})
export class AppModule {
}
