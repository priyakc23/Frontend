// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class PaymentService {

//   constructor() { }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'http://localhost:8088/api/payments'; // Backend payment API

  constructor(private http: HttpClient) {}

  processPayment(orderId: number, paymentDetails: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/pay/${orderId}`, paymentDetails);
  }
}
