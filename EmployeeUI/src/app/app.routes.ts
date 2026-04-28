import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'employees', component: EmployeeListComponent, canActivate: [authGuard] },
  { path: 'employees/new', component: EmployeeFormComponent, canActivate: [authGuard] },
  { path: 'employees/edit/:id', component: EmployeeFormComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '/employees' }
];
