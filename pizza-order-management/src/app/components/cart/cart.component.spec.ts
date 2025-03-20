import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CartComponent } from './cart.component';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartServiceSpy: jasmine.SpyObj<CartService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    cartServiceSpy = jasmine.createSpyObj('CartService', ['getCartItems']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    cartServiceSpy.getCartItems.and.returnValue([
      { id: 1, name: 'Pizza', price: 10, quantity: 2 },
      { id: 2, name: 'Burger', price: 5, quantity: 1 }
    ]);

    await TestBed.configureTestingModule({
      imports: [CartComponent, RouterTestingModule],
      providers: [
        { provide: CartService, useValue: cartServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load cart items on init', () => {
    expect(component.cartItems.length).toBe(2);
    expect(component.totalPrice).toBe(25); // 10*2 + 5*1 = 25
  });

  it('should calculate total price correctly', () => {
    component.cartItems = [
      { id: 1, name: 'Pizza', price: 10, quantity: 2 },
      { id: 2, name: 'Burger', price: 5, quantity: 1 }
    ];
    component.calculateTotal();
    expect(component.totalPrice).toBe(25);
  });

  it('should update quantity and remove item if quantity is less than 1', () => {
    component.updateQuantity(1, -1); // Decreasing quantity of Burger (index 1)
    expect(component.cartItems.length).toBe(1); // Burger should be removed
    expect(component.cartItems[0].name).toBe('Pizza');
  });

  it('should navigate to checkout page when checkout is called', () => {
    component.checkout();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/checkout']);
  });
});
