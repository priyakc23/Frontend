import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CheckoutComponent } from './checkout.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CartService } from '../../services/cart.service';

import { PaymentService } from '../../services/payment.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { OrderService } from '../../services/order.service';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let cartService: jasmine.SpyObj<CartService>;
  let orderService: jasmine.SpyObj<OrderService>;
  let router: Router;

  beforeEach(async () => {
    const cartServiceSpy = jasmine.createSpyObj('CartService', ['getCartItems', 'getTotalPrice', 'clearCart']);
    const orderServiceSpy = jasmine.createSpyObj('OrderService', ['placeOrder']);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, CheckoutComponent],
      providers: [
        { provide: CartService, useValue: cartServiceSpy },
        { provide: OrderService, useValue: orderServiceSpy },
        PaymentService, // Not directly used in test, so providing real instance
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
    orderService = TestBed.inject(OrderService) as jasmine.SpyObj<OrderService>;
    router = TestBed.inject(Router);

    // ✅ Mock return values BEFORE calling ngOnInit()
    cartService.getCartItems.and.returnValue([{ name: 'Pizza', price: 10, quantity: 1 }]);
    cartService.getTotalPrice.and.returnValue(10);

    // ✅ Call ngOnInit to ensure proper initialization
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize cart items and total price', () => {
    expect(component.cartItems).toEqual([{ name: 'Pizza', price: 10, quantity: 1 }]);
    expect(component.totalPrice).toBe(10);
  });

  it('should call placeOrder() and handle success', () => {
    spyOn(router, 'navigate');
    orderService.placeOrder.and.returnValue(of({ success: true }));

    component.placeOrder();

    expect(orderService.placeOrder).toHaveBeenCalled();
    expect(cartService.clearCart).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/payment-success']);
  });

  it('should handle order failure and navigate to failure page', () => {
    spyOn(router, 'navigate');
    spyOn(console, 'error'); // ✅ Suppress expected error logs
    orderService.placeOrder.and.returnValue(throwError(() => new Error('Order failed')));

    component.placeOrder();

    expect(orderService.placeOrder).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/payment-failure']);
    expect(console.error).toHaveBeenCalledWith('❌ Error placing order:', jasmine.any(Error)); // Validate error log
  });
});
