import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: any[] = [];
  private apiUrl = 'http://localhost:8080/api/cart'; // Update with your backend URL

  constructor(private http: HttpClient) {}

  // Add item to cart
  addToCart(item: any) {
    let existingItem = this.cartItems.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.cartItems.push(item);
    }
  }

  // Get all cart items
  getCartItems(): any[] {
    return this.cartItems;
  }

  // Clear the cart
  clearCart(): void {
    this.cartItems = [];
  }

  // Calculate the total price of the cart
  getTotalPrice(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  // Send cart data to the backend
  sendCartToBackend(): Observable<any> {
    const payload = {
      items: this.cartItems,
      total: this.getTotalPrice(), // Use getTotalPrice() here
    };
    return this.http.post(`${this.apiUrl}/checkout`, payload);
  }
}