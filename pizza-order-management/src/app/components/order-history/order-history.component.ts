import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-history',
  standalone:true,
  imports:[CommonModule,ReactiveFormsModule],
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  orders: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orderService.getOrders(this.orders).subscribe({
      next: (orders: any[]) => {
        this.orders = orders;
      },
      error: (error: any) => console.error('Error fetching orders:', error)
    });
  }
}
