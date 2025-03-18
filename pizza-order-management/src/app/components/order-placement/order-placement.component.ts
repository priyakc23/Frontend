import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service'; // Import OrderService
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Import AuthService for dynamic userId
import { HttpClient, HttpErrorResponse } from '@angular/common/http'; // Import HttpClient for HTTP requests
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-placement',
  imports:[CommonModule, RouterModule, ReactiveFormsModule],
  standalone:true,
  templateUrl: './order-placement.component.html',
  styleUrls: ['./order-placement.component.css']
})
export class OrderPlacementComponent implements OnInit {
  cartItems: any[] = []; // Array to store cart items
  totalPrice: number = 0; // Total price of the order
  userId: string = ''; // User ID of the logged-in user
  isLoading: boolean = false; // Loading state for the order placement process

  constructor(
    private orderService: OrderService, // Inject OrderService
    private router: Router, // Inject Router for navigation
    private authService: AuthService // Inject AuthService for dynamic userId
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId(); // Get userId dynamically
    this.loadCart(); // Load cart items on component initialization
  }

  // Load cart items from localStorage
  loadCart() {
    const cart = localStorage.getItem('cart');
    if (cart) {
      this.cartItems = JSON.parse(cart);
      this.totalPrice = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }
  }

  // Place order and handle response
  placeOrder() {
    if (this.cartItems.length === 0) {
      alert('Your cart is empty. Add items to place an order.');
      return;
    }

    this.isLoading = true; // Set loading state to true

    const order = {
      userId: this.userId,
      items: this.cartItems,
      totalAmount: this.totalPrice,
      orderDate: new Date().toISOString()
    };

    // Call the OrderService to place the order
    this.orderService.placeOrder(order).subscribe({
      next: (response) => {
        this.isLoading = false; // Reset loading state
        alert('Order placed successfully!');
        localStorage.removeItem('cart'); // Clear cart after successful order
        this.router.navigate(['/order-history']); // Redirect to order history page
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false; // Reset loading state
        console.error('Order placement failed:', error);
        alert(`Failed to place order. ${error.message || 'Please try again.'}`);
      }
    });
  }
}

