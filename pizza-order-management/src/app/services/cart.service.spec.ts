import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartService], // Provide the CartService
    });
    service = TestBed.inject(CartService); // Inject the CartService
  });

  it('should be created', () => {
    expect(service).toBeTruthy(); // Test if the service is created successfully
  });

  it('should add a new item to the cart', () => {
    const item = { id: 1, name: 'Product 1', price: 10, quantity: 1 };
    service.addToCart(item);

    const cartItems = service.getCartItems();
    expect(cartItems.length).toBe(1); // Verify the item is added
    expect(cartItems[0]).toEqual(item); // Verify the item details
  });

  it('should update quantity if item already exists in the cart', () => {
    const item = { id: 1, name: 'Product 1', price: 10, quantity: 1 };
    service.addToCart(item); // Add item for the first time
    service.addToCart({ ...item, quantity: 2 }); // Add the same item again with a different quantity

    const cartItems = service.getCartItems();
    expect(cartItems.length).toBe(1); // Verify only one item exists
    expect(cartItems[0].quantity).toBe(3); // Verify the quantity is updated
  });

  it('should return all items in the cart', () => {
    const item1 = { id: 1, name: 'Product 1', price: 10, quantity: 1 };
    const item2 = { id: 2, name: 'Product 2', price: 20, quantity: 2 };
    service.addToCart(item1);
    service.addToCart(item2);

    const cartItems = service.getCartItems();
    expect(cartItems.length).toBe(2); // Verify all items are returned
    expect(cartItems).toContain(item1); // Verify item1 is in the cart
    expect(cartItems).toContain(item2); // Verify item2 is in the cart
  });

  it('should clear the cart', () => {
    const item = { id: 1, name: 'Product 1', price: 10, quantity: 1 };
    service.addToCart(item); // Add an item to the cart
    service.clearCart(); // Clear the cart

    const cartItems = service.getCartItems();
    expect(cartItems.length).toBe(0); // Verify the cart is empty
  });

  it('should throw an error for getTotalPrice (not implemented)', () => {
    expect(() => service.getTotalPrice()).toThrowError('Method not implemented.');
  });
});