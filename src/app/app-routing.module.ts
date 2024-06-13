import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/auth/login/login.component";
import {RegisterComponent} from "./components/auth/register/register.component";
import {loginRoleGuard} from "./guards/login-role.guard";
import { LodgingListComponent } from './components/lodging/list/lodging-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { Page404Component } from './components/page404/page404.component';
import { userGuard } from './guards/user.guard';
import { NewLodgingComponent } from './components/lodging/new/new-lodging.component';
import { LodgingDetailComponent } from './components/lodging/detail/lodging.detail.component';
import { LodgingEditComponent } from './components/lodging/edit/lodging.edit.component';
import { ReservationRequestsComponent } from './components/reservation/list-requests/requests-list.component';
import { ReservationsListComponent } from './components/reservation/list/reservations-list.component';

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
    path: 'newLodging',
    component: NewLodgingComponent,
    data: { roles: ['HOST'] },
    canActivate: [loginRoleGuard]
  },
  {
    path: 'lodge/:lodgeId',
    component: LodgingDetailComponent,
  },
  {
    path: 'lodge/:lodgeId/edit',
    component: LodgingEditComponent,
    data: { roles: ['HOST'] },
    canActivate: [loginRoleGuard]
  },
  {
    path: 'myLodgings',
    component: LodgingListComponent,
    data: { roles: ['HOST'] },
    canActivate: [loginRoleGuard]
  },
  {
    path: 'search',
    component: LodgingListComponent
  },
  {
    path: 'reservationRequests',
    component: ReservationRequestsComponent,
    data: { roles: ['HOST', 'GUEST'] },
    canActivate: [loginRoleGuard]
  },
  {
    path: 'myReservations',
    component: ReservationsListComponent,
    data: { roles: ['HOST', 'GUEST'] },
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
