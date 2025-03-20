import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminPizzaDashboardComponent } from './admin-pizza-dashboard.component';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PizzaService } from '../../services/pizza.service';
import { of, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';

describe('AdminPizzaDashboardComponent', () => {
  let component: AdminPizzaDashboardComponent;
  let fixture: ComponentFixture<AdminPizzaDashboardComponent>;
  let pizzaServiceMock: any;

  beforeEach(async () => {
    pizzaServiceMock = {
      getPizzas: jasmine.createSpy('getPizzas').and.returnValue(of([])),
      addPizza: jasmine.createSpy('addPizza').and.returnValue(of({})),
      deletePizza: jasmine.createSpy('deletePizza').and.returnValue(of({}))
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, CommonModule,AdminPizzaDashboardComponent],
      providers: [
        FormBuilder,
        { provide: PizzaService, useValue: pizzaServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminPizzaDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load pizzas on init', () => {
    const mockPizzas = [{ id: 1, name: 'Margherita', category: 'Veg', price: 10, size: 'Small', imageUrl: 'url' }];
    pizzaServiceMock.getPizzas.and.returnValue(of(mockPizzas));

    component.ngOnInit();

    expect(pizzaServiceMock.getPizzas).toHaveBeenCalled();
    expect(component.pizzas).toEqual(mockPizzas);
    expect(component.filteredPizzas).toEqual(mockPizzas);
  });

  it('should handle error when loading pizzas fails', () => {
    pizzaServiceMock.getPizzas.and.returnValue(throwError('Error'));
    spyOn(console, 'error');

    component.ngOnInit();

    expect(pizzaServiceMock.getPizzas).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('Error fetching pizzas:', 'Error');
  });

  it('should add a new pizza', () => {
    const newPizza = { name: 'Pepperoni', category: 'Non-Veg', price: 12, size: 'Medium', imageUrl: 'url' };
    component.pizzaForm.setValue(newPizza);
    pizzaServiceMock.addPizza.and.returnValue(of(newPizza));

    component.addPizza();

    expect(pizzaServiceMock.addPizza).toHaveBeenCalledWith(newPizza);
    expect(component.pizzas).toContain(newPizza);
    expect(component.filteredPizzas).toContain(newPizza);
    expect(component.pizzaForm.value).toEqual({ name: null, category: null, price: null, size: null, imageUrl: null });
  });

  it('should handle error when adding pizza fails', () => {
    const newPizza = { name: 'Pepperoni', category: 'Non-Veg', price: 12, size: 'Medium', imageUrl: 'url' };
    component.pizzaForm.setValue(newPizza);
    pizzaServiceMock.addPizza.and.returnValue(throwError('Error'));
    spyOn(console, 'error');

    component.addPizza();

    expect(pizzaServiceMock.addPizza).toHaveBeenCalledWith(newPizza);
    expect(console.error).toHaveBeenCalledWith('Error adding pizza:', 'Error');
  });

  it('should delete a pizza', () => {
    const pizzaToDelete = { id: 1, name: 'Margherita', category: 'Veg', price: 10, size: 'Small', imageUrl: 'url' };
    component.pizzas = [pizzaToDelete];
    component.filteredPizzas = [pizzaToDelete];
    pizzaServiceMock.deletePizza.and.returnValue(of({}));

    component.deletePizza(pizzaToDelete.id);

    expect(pizzaServiceMock.deletePizza).toHaveBeenCalledWith(pizzaToDelete.id);
    expect(component.pizzas).not.toContain(pizzaToDelete);
    expect(component.filteredPizzas).not.toContain(pizzaToDelete);
  });

  it('should handle error when deleting pizza fails', () => {
    const pizzaToDelete = { id: 1, name: 'Margherita', category: 'Veg', price: 10, size: 'Small', imageUrl: 'url' };
    component.pizzas = [pizzaToDelete];
    component.filteredPizzas = [pizzaToDelete];
    pizzaServiceMock.deletePizza.and.returnValue(throwError('Error'));
    spyOn(console, 'error');

    component.deletePizza(pizzaToDelete.id);

    expect(pizzaServiceMock.deletePizza).toHaveBeenCalledWith(pizzaToDelete.id);
    expect(console.error).toHaveBeenCalledWith('Error deleting pizza:', 'Error');
  });

  it('should apply filters and search', () => {
    const mockPizzas = [
      { id: 1, name: 'Margherita', category: 'Veg', price: 10, size: 'Small', imageUrl: 'url' },
      { id: 2, name: 'Pepperoni', category: 'Non-Veg', price: 12, size: 'Medium', imageUrl: 'url' }
    ];
    component.pizzas = mockPizzas;

    component.filterCategory = 'Veg';
    component.filterSize = 'Small';
    component.searchQuery = 'Margherita';
    component.applyFilters();

    expect(component.filteredPizzas).toEqual([mockPizzas[0]]);
  });
});