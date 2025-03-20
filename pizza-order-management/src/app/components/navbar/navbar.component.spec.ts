import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({

      imports: [CommonModule, RouterTestingModule,NavbarComponent], // Use RouterTestingModule to mock Router
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router); // Get the instance of the Router
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to the specified path', () => {
    const navigateSpy = spyOn(router, 'navigate'); // Spy on the Router's navigate method

    const testPath = '/home';
    component.navigateTo(testPath);

    expect(navigateSpy).toHaveBeenCalledWith([testPath]); // Verify that navigate was called with the correct path
  });

  it('should navigate to a different path', () => {
    const navigateSpy = spyOn(router, 'navigate'); // Spy on the Router's navigate method

    const testPath = '/about';
    component.navigateTo(testPath);

    expect(navigateSpy).toHaveBeenCalledWith([testPath]); // Verify that navigate was called with the correct path
  });
});