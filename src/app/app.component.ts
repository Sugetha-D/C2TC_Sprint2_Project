import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrderService } from './order.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'order-service';

  orderDetails: any[] = [];
  orderToUpdate: any = {
    orderId: null,
    customerId: '',
    productList: '',
    totalAmount: 0,
    paymentMode: '',
    status: ''
  };

  constructor(private orderService: OrderService) {
    this.getOrderDetails();
  }

  getOrderDetails() {
    this.orderService.getOrders().subscribe(
      (resp) => this.orderDetails = resp,
      (err) => console.error(err)
    );
  }

  register(registerForm: NgForm) {
    this.orderService.registerOrder(registerForm.value).subscribe(
      (resp) => {
        registerForm.reset();
        this.getOrderDetails();
      },
      (err) => console.error(err)
    );
  }

  edit(order: any) {
    this.orderToUpdate = { ...order };
  }

  updateOrderStatus(id: any, status: string) {
    this.orderService.updateOrderStatus(id, status).subscribe(
      () => this.getOrderDetails(),
      (err) => console.error(err)
    );
  }
  updateOrder() {
  this.orderService.updateOrder(this.orderToUpdate).subscribe(
    (resp) => {
      this.getOrderDetails(); // refresh table
      // Reset form
      this.orderToUpdate = { orderId: null, customerId: '', productList: '', totalAmount: 0, paymentMode: '', status: '' };
    },
    (err) => console.error(err)
  );
}


  deleteOrder(id: any) {
    this.orderService.deleteOrder(id).subscribe(
      () => this.getOrderDetails(),
      (err) => console.error(err)
    );
  }
}
