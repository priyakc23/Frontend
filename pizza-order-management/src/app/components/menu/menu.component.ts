import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PizzaService } from '../../services/pizza.service';
import { CartService } from '../../services/cart.service';
import { ToppingService } from '../../services/topping.service'; // Import ToppingService

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
  searchQuery: string = '';
  toppings: { id: number; name: string; price: number }[] = []; // Store toppings
  selectedToppings: { [pizzaId: number]: number[] } = {}; // Store selected toppings for each pizza

  constructor(
    private pizzaService: PizzaService,
    private cartService: CartService,
    private toppingService: ToppingService // Inject ToppingService
  ) {}

  ngOnInit(): void {
    this.loadPizzas();
    this.loadToppings(); // Fetch toppings
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

  // Fetch all toppings
  loadToppings(): void {
    this.toppingService.getAllToppings().subscribe(
      (data) => {
        this.toppings = data;
      },
      (error) => {
        console.error('Error fetching toppings:', error);
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

  // Handle topping selection
  onToppingChange(pizzaId: number, toppingId: number, event: any): void {
    if (!this.selectedToppings[pizzaId]) {
      this.selectedToppings[pizzaId] = [];
    }

    if (event.target.checked) {
      this.selectedToppings[pizzaId].push(toppingId);
    } else {
      this.selectedToppings[pizzaId] = this.selectedToppings[pizzaId].filter(
        (id) => id !== toppingId
      );
    }
  }

  // Add pizza to cart with selected toppings
  addToCart(pizza: any): void {
    const selectedToppingIds = this.selectedToppings[pizza.id] || [];
    const selectedToppings = this.toppings.filter((topping) =>
      selectedToppingIds.includes(topping.id)
    );

    const pizzaWithToppings = {
      ...pizza,
      toppings: selectedToppings,
    };

    this.cartService.addToCart(pizzaWithToppings);
    alert(`${pizza.name} added to cart!`);
  }
}