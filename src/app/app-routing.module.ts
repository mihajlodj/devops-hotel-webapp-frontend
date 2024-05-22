import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/auth/login/login.component";
import {RegisterComponent} from "./components/auth/register/register.component";
import {loginRoleGuard} from "./guards/login-role.guard";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [loginRoleGuard]
    //data: { role: 'OWNER' }
    // ^ example for passing needed role for guard
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
