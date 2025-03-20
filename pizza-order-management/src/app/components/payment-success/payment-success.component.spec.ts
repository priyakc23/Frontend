import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PaymentSuccessComponent } from './payment-success.component';

describe('PaymentSuccessComponent', () => {
  let component: PaymentSuccessComponent;
  let fixture: ComponentFixture<PaymentSuccessComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
     
      imports: [PaymentSuccessComponent, RouterTestingModule.withRoutes([])], // Use RouterTestingModule to mock the router
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentSuccessComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router); // Inject the Router service
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /order-history when goToOrders is called', () => {
    const navigateSpy = spyOn(router, 'navigate'); // Spy on the router's navigate method

    component.goToOrders(); // Call the goToOrders method

    expect(navigateSpy).toHaveBeenCalledWith(['/order-history']); // Verify that navigate was called with the correct route
  });
});