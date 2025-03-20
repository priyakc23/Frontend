import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PizzaService } from './pizza.service';
import { HttpHeaders } from '@angular/common/http';

describe('PizzaService', () => {
  let service: PizzaService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:8088/admin/pizzas';
  const mockToken = 'mocked-jwt-token';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PizzaService],
    });

    service = TestBed.inject(PizzaService);
    httpMock = TestBed.inject(HttpTestingController);

    // Mock localStorage getItem
    spyOn(localStorage, 'getItem').and.returnValue(mockToken);
  });

  afterEach(() => {
    httpMock.verify(); // Ensures no unmatched HTTP requests
  });

  it('should fetch all pizzas', () => {
    const mockPizzas = [{ id: 1, name: 'Margherita' }, { id: 2, name: 'Pepperoni' }];

    service.getPizzas().subscribe((pizzas) => {
      expect(pizzas.length).toBe(2);
      expect(pizzas).toEqual(mockPizzas);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${mockToken}`);
    req.flush(mockPizzas);
  });

  it('should add a new pizza via POST request', () => {
    const newPizza = { name: 'BBQ Chicken', price: 12.99 };

    service.addPizza(newPizza).subscribe((response) => {
      expect(response).toEqual(newPizza);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newPizza);
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${mockToken}`);
    req.flush(newPizza);
  });

  it('should delete a pizza via DELETE request', () => {
    const pizzaId = 3;
  
    service.deletePizza(pizzaId).subscribe((response) => {
      expect(response).toBeFalsy(); // This will pass for both null and undefined
    });
  
    const req = httpMock.expectOne(`${apiUrl}/${pizzaId}`);
    expect(req.request.method).toBe('DELETE');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${mockToken}`);
    req.flush(null); // The backend might return null or no content (204 No Content)
  });
  
  it('should fetch pizzas by category and size', () => {
    const category = 'Veg';
    const size = 'Large';
    const mockPizzas = [{ id: 1, name: 'Veggie Deluxe' }];

    service.getPizzasByCategoryAndSize(category, size).subscribe((pizzas) => {
      expect(pizzas).toEqual(mockPizzas);
    });

    const req = httpMock.expectOne(`${apiUrl}?category=${category}&size=${size}`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${mockToken}`);
    req.flush(mockPizzas);
  });

  it('should fetch pizzas by category', () => {
    const category = 'Non-Veg';
    const mockPizzas = [{ id: 1, name: 'Chicken Supreme' }];

    service.getPizzasByCategory(category).subscribe((pizzas) => {
      expect(pizzas).toEqual(mockPizzas);
    });

    const req = httpMock.expectOne(`${apiUrl}?category=${category}`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${mockToken}`);
    req.flush(mockPizzas);
  });

  it('should fetch pizzas by size', () => {
    const size = 'Medium';
    const mockPizzas = [{ id: 1, name: 'Pepperoni Feast' }];

    service.getPizzasBySize(size).subscribe((pizzas) => {
      expect(pizzas).toEqual(mockPizzas);
    });

    const req = httpMock.expectOne(`${apiUrl}?size=${size}`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${mockToken}`);
    req.flush(mockPizzas);
  });
  it('should delete a pizza via DELETE request', () => {
    const pizzaId = 3;
  
    service.deletePizza(pizzaId).subscribe((response) => {
      expect(response).toBeFalsy(); // This allows both null and undefined to pass
    });
  
    const req = httpMock.expectOne(`${apiUrl}/${pizzaId}`);
    expect(req.request.method).toBe('DELETE');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${mockToken}`);
  
    req.flush(null); // Keeping null to match backend behavior
  });
  
});
