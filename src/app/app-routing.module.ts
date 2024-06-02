import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/auth/login/login.component";
import {RegisterComponent} from "./components/auth/register/register.component";
import {loginRoleGuard} from "./guards/login-role.guard";
import { LodgingListComponent } from './components/lodging/list/lodging-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { Page404Component } from './components/page404/page404.component';
import { userGuard } from './guards/user.guard';
import { NewLodgingComponent } from './components/lodging/new/new-lodging.component';

const routes: Routes = [
  {
    path: '',
    component: LodgingListComponent,
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
  {
    path: 'profile/:username',
    component: ProfileComponent,
    data: {roles: ['HOST','GUEST']},
    canActivate: [loginRoleGuard]
  },
  {
    path: 'myReservations',
    component: ProfileComponent,
    canActivate: [userGuard]
  },
  {
    path: 'myLodgings',
    component: ProfileComponent,
    canActivate: [userGuard]
  },
  {
    path: 'newLodging',
    component: NewLodgingComponent,
    data: { roles: ['HOST'] },
    canActivate: [loginRoleGuard]
  },
  {
    path: '**',
    component: Page404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
