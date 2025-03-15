import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegistrationComponent } from './components/auth/registration/registration.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdminPizzaDashboardComponent } from './components/admin-pizza-dashboard/admin-pizza-dashboard.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    {path:'registration',component:RegistrationComponent},
    { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'menu', component: MenuComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'orders', component: OrderHistoryComponent }, 
  {path: 'footer', component:FooterComponent},
  { path: 'admin/pizzas', component: AdminPizzaDashboardComponent }
  
];

