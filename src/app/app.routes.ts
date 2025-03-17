import {Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {LogInComponent} from './pages/auth/log-in/log-in.component';
import {RegisterComponent} from './pages/auth/register/register.component';
import {NoAuthGuard} from './guard/noAuth.guard';
import {AuthGuard} from './guard/auth.guard';
import {NewPostComponent} from './pages/new-post/new-post.component';
import {PostComponent} from './pages/post/post.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'newPost',
    component: NewPostComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'post/:id',
    component: PostComponent
  },
  {
    path: 'logIn',
    component: LogInComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: '**',
    redirectTo: '',
  }
];
