import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

import { PaymentService } from '../../services/payment.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  cartItems: any[] = [];
  totalPrice = 0;
  customerName: string = '';
  address: string = '';

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private paymentService: PaymentService,
    private router: Router
  ) {}

  // ✅ Move cart initialization logic to ngOnInit
  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.totalPrice = this.cartService.getTotalPrice();
  }

  placeOrder() {
    const order = {
      customerName: this.customerName,
      address: this.address,
      items: this.cartItems,
      total: this.totalPrice,
      status: 'Pending'
    };

    this.orderService.placeOrder(order).subscribe({
      next: () => {
        console.log('✅ Order placed successfully!');
        this.cartService.clearCart();
        this.router.navigate(['/payment-success']); // Redirect to success page
      },
      error: (error: any) => {
        console.error('❌ Error placing order:', error);
        this.router.navigate(['/payment-failure']); // Redirect to failure page
      }
    });
  }
}
