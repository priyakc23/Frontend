import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import HttpClientTestingModule to mock HTTP requests
      providers: [AuthService], // Provide AuthService here
    });

    service = TestBed.inject(AuthService); // Inject the AuthService
    httpMock = TestBed.inject(HttpTestingController); // Inject HttpTestingController to mock HTTP requests
  });

  afterEach(() => {
    httpMock.verify(); // Verify that there are no outstanding HTTP requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy(); // Test if the service is created successfully
  });

  it('should send a POST request to login', () => {
    const mockCredentials = { username: 'testuser', password: 'testpassword' };
    const mockResponse = { token: 'fake-token' };

    // Call the login method
    service.login(mockCredentials).subscribe((response) => {
      expect(response).toEqual(mockResponse); // Verify the response
    });

    // Expect a POST request to the login endpoint
    const req = httpMock.expectOne(`${service['baseUrl']}/login`);
    expect(req.request.method).toBe('POST'); // Verify the HTTP method
    expect(req.request.body).toEqual(mockCredentials); // Verify the request body

    // Respond with mock data
    req.flush(mockResponse);
  });

  it('should send a POST request to register', () => {
    const mockUser = { username: 'testuser', email: 'test@example.com', password: 'testpassword' };
    const mockResponse = { message: 'User registered successfully' };

    // Call the register method
    service.register(mockUser).subscribe((response) => {
      expect(response).toEqual(mockResponse); // Verify the response
    });

    // Expect a POST request to the register endpoint
    const req = httpMock.expectOne(`${service['baseUrl']}/register`);
    expect(req.request.method).toBe('POST'); // Verify the HTTP method
    expect(req.request.body).toEqual(mockUser); // Verify the request body

    // Respond with mock data
    req.flush(mockResponse);
  });

  it('should handle login errors', () => {
    const mockCredentials = { username: 'testuser', password: 'testpassword' };
    const mockError = { status: 401, statusText: 'Unauthorized' };

    // Call the login method
    service.login(mockCredentials).subscribe({
      next: () => fail('Expected an error, but got a successful response'),
      error: (error) => {
        expect(error.status).toBe(401); // Verify the error status
        expect(error.statusText).toBe('Unauthorized'); // Verify the error status text
      },
    });

    // Expect a POST request to the login endpoint
    const req = httpMock.expectOne(`${service['baseUrl']}/login`);
    expect(req.request.method).toBe('POST'); // Verify the HTTP method

    // Respond with an error
    req.flush(null, mockError);
  });

  it('should handle register errors', () => {
    const mockUser = { username: 'testuser', email: 'test@example.com', password: 'testpassword' };
    const mockError = { status: 400, statusText: 'Bad Request' };

    // Call the register method
    service.register(mockUser).subscribe({
      next: () => fail('Expected an error, but got a successful response'),
      error: (error) => {
        expect(error.status).toBe(400); // Verify the error status
        expect(error.statusText).toBe('Bad Request'); // Verify the error status text
      },
    });

    // Expect a POST request to the register endpoint
    const req = httpMock.expectOne(`${service['baseUrl']}/register`);
    expect(req.request.method).toBe('POST'); // Verify the HTTP method

    // Respond with an error
    req.flush(null, mockError);
  });
});