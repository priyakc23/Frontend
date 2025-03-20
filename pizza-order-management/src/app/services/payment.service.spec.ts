import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PaymentService } from './payment.service';

describe('PaymentService', () => {
  let service: PaymentService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:8088/api/payments';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PaymentService]
    });

    service = TestBed.inject(PaymentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no unmatched requests remain
  });

  it('should process a payment via POST request', () => {
    const orderId = 1;
    const paymentDetails = { amount: 50.0, paymentMethod: 'Credit Card' };
    const expectedResponse = { success: true, message: 'Payment successful' };

    service.processPayment(orderId, paymentDetails).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}/pay/${orderId}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(paymentDetails);
    
    req.flush(expectedResponse); // Mock API response
  });
});
