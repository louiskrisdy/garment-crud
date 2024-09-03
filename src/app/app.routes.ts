import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
    {path:'', component: LoginComponent, pathMatch: 'full'},
    {path: 'home', component: HomeComponent, canActivate: [authGuard]},
    {path: 'login', redirectTo:'/'},
    {path: 'password-reset', component: PasswordResetComponent},
    {path: '**', component: PageNotFoundComponent}
];
