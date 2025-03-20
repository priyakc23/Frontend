import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrdersComponent } from './admin-orders.component';
import { AdminPizzaDashboardComponent } from '../admin-pizza-dashboard/admin-pizza-dashboard.component';

describe('AdminOrdersComponent', () => {
  let component: AdminOrdersComponent;
  let fixture: ComponentFixture<AdminOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPizzaDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
