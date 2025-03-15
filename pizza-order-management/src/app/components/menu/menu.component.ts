import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PizzaService } from '../../services/pizza.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  imports: [CommonModule, FormsModule],
})
export class MenuComponent implements OnInit {
  pizzas: any[] = [];
  filteredPizzas: any[] = [];
  filterCategory: string = '';
  filterSize: string = '';
  searchQuery: string = ''; // Add search query property

  constructor(private pizzaService: PizzaService, private cartService: CartService) {}

  ngOnInit(): void {
    this.loadPizzas();
  }

  // Fetch all pizzas
  loadPizzas(): void {
    this.pizzaService.getPizzas().subscribe(
      (data) => {
        this.pizzas = data;
        this.filteredPizzas = data;
      },
      (error) => {
        console.error('Error fetching pizzas:', error);
      }
    );
  }

  // Apply filters and search
  applyFilters(): void {
    this.filteredPizzas = this.pizzas.filter((pizza) => {
      const matchesCategory = this.filterCategory ? pizza.category === this.filterCategory : true;
      const matchesSize = this.filterSize ? pizza.size === this.filterSize : true;
      const matchesSearch = this.searchQuery
        ? pizza.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        : true;
      return matchesCategory && matchesSize && matchesSearch;
    });
  }

  // Add pizza to cart
  addToCart(pizza: any): void {
    this.cartService.addToCart(pizza);
  }
}