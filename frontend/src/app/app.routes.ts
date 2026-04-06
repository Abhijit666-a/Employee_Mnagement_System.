import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Home } from './home/home';
import { Employee } from './employee/employee';
import { EmployeeAdded } from './employee-added/employee-added';
import { Register } from './register/register';
import { Welcome } from './welcome/welcome';
import { Features } from './features/features';
import { UpdatePassword } from './update-password/update-password';
import { Profile } from './profile/profile';
import { Dashboard } from './dashboard/dashboard';

export const routes: Routes = [
    {
        path : '',
        component : Welcome
    },
    {
        path: 'home',
        component: Home

    },
    {
        path: 'login',
        component: Login

    },
    {
        path: 'reset',
        component : UpdatePassword
    },
    {
        path : 'employee',
        component: Employee
        
    },
    {
        path : 'register',
        component : Register
    },
    {
        path : 'features',
        component : Features
    },
    {
        path : 'profile',
        component : Profile
    },
    {
        path : 'dashboard',
        component : Dashboard
    }
];
