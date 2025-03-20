import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationComponent } from './registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['register']);

    await TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, RouterTestingModule, RegistrationComponent], 
      providers: [{ provide: AuthService, useValue: authServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    expect(component.registerForm.value).toEqual({
      name: '',
      email: '',
      password: '',
      role: ''
    });
  });

  it('should require all fields to be valid', () => {
    const form = component.registerForm;
    form.setValue({
      name: '',
      email: '',
      password: '',
      role: ''
    });

    expect(form.valid).toBeFalse(); // Fixed missing value
  });

  it('should fail validation for invalid name', () => {
    const nameControl = component.registerForm.controls['name'];
    nameControl.setValue('12345'); // Invalid name (contains numbers)
    
    expect(nameControl.valid).toBeFalse(); // Fixed missing value
  });

  it('should fail validation for invalid email format', () => {
    const emailControl = component.registerForm.controls['email'];
    emailControl.setValue('invalid-email'); // Invalid email format

    expect(emailControl.valid).toBeFalse(); // Fixed missing value
  });

  it('should fail validation for short password', () => {
    const passwordControl = component.registerForm.controls['password'];
    passwordControl.setValue('123'); // Too short

    expect(passwordControl.valid).toBeFalse(); // Fixed missing value
  });

  it('should call register() and navigate to /login on successful registration', () => {
    spyOn(router, 'navigate');
    authService.register.and.returnValue(of({ success: true }));

    component.registerForm.setValue({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      role: 'user'
    });

    component.register();

    expect(authService.register).toHaveBeenCalledWith({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      role: 'user'
    }); // Fixed missing value
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should display error message on failed registration', () => {
    authService.register.and.returnValue(throwError(() => new Error('Registration failed')));

    component.registerForm.setValue({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      role: 'user'
    });

    component.register();

    expect(authService.register).toHaveBeenCalled();
    expect(component.errorMessage).toBe('Registration failed. Email may already be in use.'); // Fixed missing value
  });
});
