import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderHistoryComponent } from './order-history.component';

import { of, throwError } from 'rxjs';
import { OrderService } from '../../services/order.service';

describe('OrderHistoryComponent', () => {
  let component: OrderHistoryComponent;
  let fixture: ComponentFixture<OrderHistoryComponent>;
  let orderServiceSpy: jasmine.SpyObj<OrderService>;

  beforeEach(async () => {
    orderServiceSpy = jasmine.createSpyObj('OrderService', ['getOrders']);

    await TestBed.configureTestingModule({
      imports: [OrderHistoryComponent],
      providers: [
        { provide: OrderService, useValue: orderServiceSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderHistoryComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch orders on init', () => {
    const mockOrders = [
      { id: 1, product: 'Pizza', price: 20 },
      { id: 2, product: 'Burger', price: 10 }
    ];

    orderServiceSpy.getOrders.and.returnValue(of(mockOrders)); 

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.orders.length).toBe(2);
    expect(component.orders).toEqual(mockOrders);
  });

  it('should handle errors when fetching orders', () => {
    spyOn(console, 'error');
    orderServiceSpy.getOrders.and.returnValue(throwError(() => new Error('API error')));

    component.ngOnInit();
    fixture.detectChanges();

    expect(console.error).toHaveBeenCalledWith('Error fetching orders:', jasmine.any(Error));
    expect(component.orders.length).toBe(0); // No data should be loaded on error
  });
});
