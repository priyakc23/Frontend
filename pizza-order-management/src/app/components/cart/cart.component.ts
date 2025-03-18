import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CommonModule, DecimalPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider'; // Add this import

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DecimalPipe,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatDividerModule, // Add MatDividerModule here
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cartItems: any[] = [];
  totalPrice: number = 0;

  constructor(
    private cartService: CartService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
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
      this.snackBar.open('Item removed from cart', 'Close', { duration: 2000 });
    }
    this.calculateTotal();
  }

  checkout() {
    this.cartService.sendCartToBackend().subscribe({
      next: () => {
        this.snackBar.open('Cart successfully checked out!', 'Close', { duration: 3000 });
        this.router.navigate(['/checkout']);
      },
      error: () => {
        this.snackBar.open('Checkout failed. Please try again.', 'Close', { duration: 3000 });
      },
    });
  }
}