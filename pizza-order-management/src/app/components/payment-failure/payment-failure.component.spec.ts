import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PaymentFailureComponent } from './payment-failure.component';

describe('PaymentFailureComponent', () => {
  let component: PaymentFailureComponent;
  let fixture: ComponentFixture<PaymentFailureComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentFailureComponent, RouterTestingModule.withRoutes([])], // Use RouterTestingModule to mock the router
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentFailureComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router); // Inject the Router service
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /checkout when retryPayment is called', () => {
    const navigateSpy = spyOn(router, 'navigate'); // Spy on the router's navigate method

    component.retryPayment(); // Call the retryPayment method

    expect(navigateSpy).toHaveBeenCalledWith(['/checkout']); // Verify that navigate was called with the correct route
  });
});