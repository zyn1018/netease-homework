import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CenterComponent} from './core/center/center.component';
import {LoginComponent} from './login/login.component';
import {ProductDetailComponent} from "./product-detail/product-detail.component";

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: CenterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'products/:productId', component: ProductDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
