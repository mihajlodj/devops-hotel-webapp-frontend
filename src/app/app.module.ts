import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgxSpinnerModule} from "ngx-spinner";
import {AppComponent} from "./components/app/app.component";
import {HomeComponent} from "./components/home/home.component";
import {LoadingComponent} from "./components/utils/loading/loading.component";
import {LoginComponent} from "./components/auth/login/login.component";
import {RegisterComponent} from "./components/auth/register/register.component";
import { UnloggedNavbarComponent } from './components/navbar/unlogged-navbar/unlogged-navbar.component';
import { GuestNavbarComponent } from './components/navbar/guest-navbar/guest-navbar.component';
import { HostNavbarComponent } from './components/navbar/host-navbar/host-navbar.component';
import { LodgingComponent } from './components/lodging/lodging.component';
import { LodgingListComponent } from './components/lodging/lodging-list/lodging-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { Page404Component } from './components/page404/page404.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { ReservationListComponent } from './components/reservation/reservation-list/reservation-list.component';
import { JwtInterceptor } from './interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoadingComponent,
    LoginComponent,
    RegisterComponent,
    UnloggedNavbarComponent,
    GuestNavbarComponent,
    HostNavbarComponent,
    LodgingComponent,
    LodgingListComponent,
    ProfileComponent,
    Page404Component,
    ReservationComponent,
    ReservationListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
