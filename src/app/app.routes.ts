import { Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {LogInComponent} from './pages/auth/log-in/log-in.component';
import {RegisterComponent} from './pages/auth/register/register.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'logIn',
    component: LogInComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];
