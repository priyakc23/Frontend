import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PizzaService } from '../../services/pizza.service';

@Component({
  selector: 'app-admin-pizza-dashboard',
  standalone: true,
  templateUrl: './admin-pizza-dashboard.component.html',
  styleUrls: ['./admin-pizza-dashboard.component.css'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export class AdminPizzaDashboardComponent implements OnInit {
  pizzaForm: FormGroup;
  pizzas: any[] = [];
  filteredPizzas: any[] = [];
  filterCategory: string = '';
  filterSize: string = '';
  searchQuery: string = ''; // Add search query property

  constructor(private fb: FormBuilder, private pizzaService: PizzaService) {
    // Initialize the form group
    this.pizzaForm = this.fb.group({
      name: ['', Validators.required],
      category: ['Veg', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      size: ['Small', Validators.required],
      imageUrl: ['', Validators.required],
    });
  }

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

  // Add a new pizza
  addPizza(): void {
    if (this.pizzaForm.valid) {
      this.pizzaService.addPizza(this.pizzaForm.value).subscribe(
        (response) => {
          this.pizzas.push(response);
          this.filteredPizzas = this.pizzas;
          this.pizzaForm.reset();
        },
        (error) => {
          console.error('Error adding pizza:', error);
        }
      );
    }
  }

  // Delete a pizza
  deletePizza(id: number): void {
    this.pizzaService.deletePizza(id).subscribe(
      () => {
        this.pizzas = this.pizzas.filter((pizza) => pizza.id !== id);
        this.filteredPizzas = this.pizzas;
      },
      (error) => {
        console.error('Error deleting pizza:', error);
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
}