import {NgModule} from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {SharedModule} from '../shared/shared.module';
import {CenterComponent} from './center/center.component';
import {RouterModule} from '@angular/router';
import {UserService} from '../service/UserService';
import {OrderService} from '../service/OrderService';

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
  providers: [UserService, OrderService]
})
export class CoreModule {
}
