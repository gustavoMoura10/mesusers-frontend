import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './dashboard/users/users.component';
import { AddressesComponent } from './dashboard/addresses/addresses.component';
import { authGuard } from './shared/guards/auth.guards';


export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard], },
    { path: 'users', component: UsersComponent, canActivate: [authGuard], },
    { path: 'addresses', component: AddressesComponent, canActivate: [authGuard], },
    { path: '**', redirectTo: 'login' }
];