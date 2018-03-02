import {NgModule} from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {SharedModule} from '../shared/shared.module';
import {CenterComponent} from './center/center.component';
import {RouterModule} from '@angular/router';
import {UserService} from '../service/UserService';
import {OrderService} from '../service/OrderService';
import {ProductService} from '../service/ProductService';
import {AuthenticateService} from "../service/AuthenticateService";
import {CartService} from "../service/CartService";

@NgModule({
  imports: [
    SharedModule,
    RouterModule
  ],
  declarations: [CenterComponent, HeaderComponent, FooterComponent, CenterComponent],
  exports: [
    HeaderComponent,
    CenterComponent,
    FooterComponent,
    SharedModule,
  ],
  providers: [UserService, OrderService, ProductService, AuthenticateService, CartService]
})
export class CoreModule {
}
