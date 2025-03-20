import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuComponent } from './menu.component';
import { PizzaService } from '../../services/pizza.service';
import { CartService } from '../../services/cart.service';
import { of, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let pizzaService: jasmine.SpyObj<PizzaService>;
  let cartService: jasmine.SpyObj<CartService>;

  beforeEach(async () => {
    const pizzaServiceSpy = jasmine.createSpyObj('PizzaService', ['getPizzas']);
    const cartServiceSpy = jasmine.createSpyObj('CartService', ['addToCart']);

    await TestBed.configureTestingModule({
      imports: [MenuComponent, CommonModule, FormsModule], // ✅ Use imports instead of declarations
      providers: [
        { provide: PizzaService, useValue: pizzaServiceSpy },
        { provide: CartService, useValue: cartServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    pizzaService = TestBed.inject(PizzaService) as jasmine.SpyObj<PizzaService>;
    cartService = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load pizzas on init', () => {
    const mockPizzas = [
      { name: 'Pepperoni', category: 'Non-Veg', size: 'Large' },
      { name: 'Margherita', category: 'Veg', size: 'Medium' },
    ];
    pizzaService.getPizzas.and.returnValue(of(mockPizzas));

    component.ngOnInit();
    expect(component.pizzas).toEqual(mockPizzas);
    expect(component.filteredPizzas).toEqual(mockPizzas);
  });

  it('should handle error when fetching pizzas', () => {
    spyOn(console, 'error');
    pizzaService.getPizzas.and.returnValue(throwError(() => new Error('API Error')));

    component.ngOnInit();
    expect(console.error).toHaveBeenCalledWith('Error fetching pizzas:', jasmine.any(Error));
  });

  it('should filter pizzas by category', () => {
    component.pizzas = [
      { name: 'Veggie Delight', category: 'Veg', size: 'Medium' },
      { name: 'BBQ Chicken', category: 'Non-Veg', size: 'Large' },
    ];
    component.filterCategory = 'Veg';
    component.applyFilters();

    expect(component.filteredPizzas.length).toBe(1);
    expect(component.filteredPizzas[0].name).toBe('Veggie Delight');
  });

  it('should filter pizzas by size', () => {
    component.pizzas = [
      { name: 'Cheese Burst', category: 'Veg', size: 'Large' },
      { name: 'Farmhouse', category: 'Veg', size: 'Medium' },
    ];
    component.filterSize = 'Medium';
    component.applyFilters();

    expect(component.filteredPizzas.length).toBe(1);
    expect(component.filteredPizzas[0].name).toBe('Farmhouse');
  });

  it('should filter pizzas by search query', () => {
    component.pizzas = [
      { name: 'Hawaiian Pizza', category: 'Non-Veg', size: 'Large' },
      { name: 'Veg Supreme', category: 'Veg', size: 'Medium' },
    ];
    component.searchQuery = 'hawaiian';
    component.applyFilters();

    expect(component.filteredPizzas.length).toBe(1);
    expect(component.filteredPizzas[0].name).toBe('Hawaiian Pizza');
  });

  it('should add pizza to cart', () => {
    const pizza = { name: 'BBQ Chicken', category: 'Non-Veg', size: 'Large' };
    component.addToCart(pizza);

    expect(cartService.addToCart).toHaveBeenCalledWith(pizza);
  });
});
