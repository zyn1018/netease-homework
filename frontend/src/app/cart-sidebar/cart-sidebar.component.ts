import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {OrderService} from '../service/OrderService';
import {Order} from '../domain/Order';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-cart-sidebar',
  templateUrl: './cart-sidebar.component.html',
  styleUrls: ['./cart-sidebar.component.css']
})
export class CartSidebarComponent implements OnInit {
  public orderDetail = new Map<string, number[]>();
  public show = false;
  public totalPrice = 0;
  public order: Order;
  @Output() toggle = new EventEmitter<void>();

  constructor(private orderService: OrderService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.orderService.getOrderDetailSubject().subscribe(data => {
      this.orderDetail = data;
      this.checkShowParam();
      this.calTotalPrice();
      this.cdr.markForCheck();
      this.cdr.detectChanges();
    });
  }

  checkShowParam() {
    if (this.orderDetail.size === 0) {
      this.show = false;
    } else if (this.orderDetail.size > 0) {
      this.show = true;
    }
  }

  calTotalPrice() {
    this.totalPrice = 0;
    this.orderDetail.forEach((value, key) => {
      this.totalPrice += value[0] * value[1];
    });
  }

  submitOrder() {
    console.log(this.order);
  }

  toggleSidebar() {
    this.toggle.emit();
  }
}
