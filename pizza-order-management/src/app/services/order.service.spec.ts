import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OrderService } from './order.service';

describe('OrderService', () => {
  let service: OrderService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:8088/api/orders';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrderService]
    });

    service = TestBed.inject(OrderService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();  // Ensures no unmatched requests remain
  });

  it('should fetch orders from API', () => {
    const mockOrders = [
      { id: 1, customerName: 'John Doe', totalAmount: 25.5 },
      { id: 2, customerName: 'Jane Doe', totalAmount: 30.0 }
    ];

    service.getOrders([]).subscribe((orders) => {
      expect(orders.length).toBe(2);
      expect(orders).toEqual(mockOrders);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockOrders);  // Mock API response
  });

  it('should place an order via POST request', () => {
    const newOrder = { customerName: 'Alice', totalAmount: 40.0 };

    service.placeOrder(newOrder).subscribe((response) => {
      expect(response).toEqual(newOrder);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newOrder);
    req.flush(newOrder);  // Mock API response
  });
});
