
// src/app/services/cart.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: any[] = [];

  constructor() {}

  // Add a pizza to the cart
  // addToCart(pizza: any): void {
  //   this.cartItems.push(pizza);
  //   console.log('Added to cart:', pizza);
  // }
  addToCart(item: any) {
    let existingItem = this.cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.cartItems.push(item);
    }
  }


  // Get all items in the cart
  getCartItems(): any[] {
    return this.cartItems;
  }

  // Clear the cart
  clearCart(): void {
    this.cartItems = [];
  }
}