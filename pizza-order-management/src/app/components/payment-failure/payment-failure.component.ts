import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-failure',
  imports: [],
  templateUrl: './payment-failure.component.html',
  styleUrl: './payment-failure.component.css'
})
export class PaymentFailureComponent {

  constructor(private router: Router) {}

  retryPayment() {
    this.router.navigate(['/checkout']);
  }
}


