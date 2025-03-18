import { Routes } from "@angular/router";
import { AdminPizzaDashboardComponent } from "./components/admin-pizza-dashboard/admin-pizza-dashboard.component";
import { LoginComponent } from "./components/auth/login/login.component";
import { RegistrationComponent } from "./components/auth/registration/registration.component";
import { CartComponent } from "./components/cart/cart.component";
import { CheckoutComponent } from "./components/checkout/checkout.component";
import { HomeComponent } from "./components/home/home.component";
import { MenuComponent } from "./components/menu/menu.component";
import { OrderHistoryComponent } from "./components/order-history/order-history.component";
import { AdminOrdersComponent } from "./components/admin-orders/admin-orders.component";
import { PaymentFailureComponent } from "./components/payment-failure/payment-failure.component";
import { PaymentSuccessComponent } from "./components/payment-success/payment-success.component";
import { OrderPlacementComponent } from "./components/order-placement/order-placement.component";


  export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: 'menu', component: MenuComponent },
    { path: 'cart', component: CartComponent },
    {path: 'order-placement',component: OrderPlacementComponent},
    { path: 'checkout', component: CheckoutComponent },
    { path: 'order-history', component: OrderHistoryComponent },
    { path: 'payment-success', component: PaymentSuccessComponent },
    { path: 'payment-failure', component: PaymentFailureComponent },
    { path: 'admin/pizzas', component: AdminPizzaDashboardComponent },
    { path: 'admin/orders', component: AdminOrdersComponent },
  ];
  
