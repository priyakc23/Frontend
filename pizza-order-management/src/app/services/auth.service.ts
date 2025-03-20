import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:8088/users';

  constructor(private http: HttpClient) {}

  // Login method
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  // Register method
  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  // Method to get the logged-in user's ID
  getUserId(): string {
    // Retrieve userId from localStorage (or sessionStorage) after login
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      return user.id; // Assuming the backend returns the user object with an `id` field
    }
    return ''; // Return empty string if no user is logged in
  }

  // Method to check if the user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('user'); // Returns true if user data exists in localStorage
  }

  // Method to log out the user
  logout(): void {
    localStorage.removeItem('user'); // Clear user data from localStorage
    
  }
  
}