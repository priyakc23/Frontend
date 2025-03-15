// src/app/components/cart/cart.component.ts
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CommonModule, DecimalPipe, NgFor, NgIf } from '@angular/common';


@Component({
  selector: 'app-cart',
  standalone:true,
  imports:[CommonModule,RouterModule,NgFor,NgIf,DecimalPipe],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cartItems: any[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService, private router: Router) {
    this.loadCart();
  }

  loadCart() {
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotal();
  }

  calculateTotal() {
    this.totalPrice = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  updateQuantity(index: number, change: number) {
    this.cartItems[index].quantity += change;
    if (this.cartItems[index].quantity < 1) {
      this.cartItems.splice(index, 1);
    }
    this.calculateTotal();
  }

  checkout() {
    this.router.navigate(['/checkout']);
  }
}