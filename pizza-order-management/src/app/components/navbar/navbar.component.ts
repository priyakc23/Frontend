import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule], // Added required modules
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'] // Fixed 'styleUrl' -> 'styleUrls'
})
export class NavbarComponent {
  constructor(private router: Router) {}

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
  
  
}
