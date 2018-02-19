import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CenterComponent} from './core/center/center.component';
import {LoginComponent} from './login/login.component';
import {ProductDetailComponent} from "./product-detail/product-detail.component";
import {OrderHistoryComponent} from "./order-history/order-history.component";
import {PublishProductComponent} from "./publish-product/publish-product.component";

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: CenterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'products/:productId', component: ProductDetailComponent},
  {path: 'order_history', component: OrderHistoryComponent},
  {path: 'publish/:productId', component: PublishProductComponent},
  // {path: 'publish/0', component: PublishProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
