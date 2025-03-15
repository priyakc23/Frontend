import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPizzaDashboardComponent } from './admin-pizza-dashboard.component';

describe('AdminPizzaDashboardComponent', () => {
  let component: AdminPizzaDashboardComponent;
  let fixture: ComponentFixture<AdminPizzaDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPizzaDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPizzaDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
