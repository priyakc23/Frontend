import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);

    await TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, RouterTestingModule, LoginComponent], 
      providers: [{ provide: AuthService, useValue: authServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    expect(component.loginForm.value).toEqual({
      email: '',
      password: '',
      role: ''
    });
  });

  it('should require all fields to be valid', () => {
    const form = component.loginForm;
    form.controls['email'].setValue('');
    form.controls['password'].setValue('');
    form.controls['role'].setValue('');

    expect(form.valid).toBeFalse();

    form.controls['email'].setValue('test@example.com');
    form.controls['password'].setValue('123456');
    form.controls['role'].setValue('admin');

    expect(form.valid).toBeTrue();
  });

  it('should fail validation for incorrect email format', () => {
    const emailControl = component.loginForm.controls['email'];
    emailControl.setValue('invalid-email');

    expect(emailControl.valid).toBeFalse();
    expect(emailControl.errors?.['email']).toBeTruthy();
  });

  it('should fail validation for short password', () => {
    const passwordControl = component.loginForm.controls['password'];
    passwordControl.setValue('123'); // Less than 6 chars

    expect(passwordControl.valid).toBeFalse();
    expect(passwordControl.errors?.['minlength']).toBeTruthy();
  });

  it('should call login() and navigate to /menu on successful login', () => {
    spyOn(router, 'navigate');
    authService.login.and.returnValue(of({ success: true }));

    component.loginForm.setValue({ email: 'test@example.com', password: 'password123', role: 'admin' });
    component.login();

    expect(authService.login).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password123', role: 'admin' });
    expect(router.navigate).toHaveBeenCalledWith(['/menu']);
  });

  it('should display error message on failed login', () => {
    authService.login.and.returnValue(throwError(() => new Error('Invalid email or password')));

    component.loginForm.setValue({ email: 'wrong@example.com', password: 'wrongpass', role: 'user' });
    component.login();

    expect(authService.login).toHaveBeenCalled();
    expect(component.errorMessage).toBe('Invalid email or password');
  });

  it('should navigate to register page when navigateToRegister() is called', () => {
    spyOn(router, 'navigate');
    
    component.navigateToRegister();

    expect(router.navigate).toHaveBeenCalledWith(['/register']);
  });
});
