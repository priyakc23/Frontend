import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToppingService {
  private apiUrl = 'http://localhost:8080/api/toppings'; // Update with your backend URL

  constructor(private http: HttpClient) {}

  // Define the Topping interface inline (no separate model file needed)
  getAllToppings(): Observable<{ id: number; name: string; price: number }[]> {
    return this.http.get<{ id: number; name: string; price: number }[]>(this.apiUrl);
  }
}
