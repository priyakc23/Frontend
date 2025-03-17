import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8088/api/orders';  // Ensure backend URL is correct

  constructor(private http: HttpClient) {}

  getOrders(orders: any[]): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  placeOrder(order: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, order);
  }
}
