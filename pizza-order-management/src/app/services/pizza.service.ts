// src/app/services/pizza.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PizzaService {
  private apiUrl = 'http://localhost:8088/admin/pizzas'; // Update with your backend URL

  constructor(private http: HttpClient) {}

  // Fetch all pizzas
  getPizzas(): Observable<any[]> {
    const token = localStorage.getItem('token'); // Get the token from localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Add the token to headers
    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  // Add a new pizza
  addPizza(pizza: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(this.apiUrl, pizza, { headers });
  }

  // Update a pizza
  updatePizza(id: number, pizza: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(`${this.apiUrl}/${id}`, pizza, { headers });
  }

  // Delete a pizza
  deletePizza(id: number): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }

  // Fetch pizzas by category and size
  getPizzasByCategoryAndSize(category: string, size: string): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${this.apiUrl}?category=${category}&size=${size}`, { headers });
  }

  // Fetch pizzas by category
  getPizzasByCategory(category: string): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${this.apiUrl}?category=${category}`, { headers });
  }

  // Fetch pizzas by size
  getPizzasBySize(size: string): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${this.apiUrl}?size=${size}`, { headers });
  }
}