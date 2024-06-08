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
import { LodgingDetailComponent } from './components/lodging/detail/lodging.detail.component';
import { LodgingListComponent } from './components/lodging/list/lodging-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { Page404Component } from './components/page404/page404.component';
import { NewReservationComponent } from './components/reservation/new/reservation.new.component';
import { ReservationListComponent } from './components/reservation/list/reservation-list.component';
import { JwtInterceptor } from './interceptor';
import { NewLodgingComponent } from './components/lodging/new/new-lodging.component';
import { SearchComponent } from './search/search.component';
import { LodgingEditComponent } from './components/lodging/edit/lodging.edit.component';
import { CarouselComponent } from './components/utils/carousel/carousel.component';
import { NgbModule, NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { AlertContainerComponent } from './components/alert/container/alert-container.component';
import { AlertDangerComponent } from './components/alert/danger/alert.danger.component';
import { AlertInfoComponent } from './components/alert/info/alert.info.component';
import { AlertSuccessComponent } from './components/alert/success/alert.success.component';
import { AlertWarningComponent } from './components/alert/warning/alert.warning.component';

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
    LodgingDetailComponent,
    LodgingListComponent,
    ProfileComponent,
    Page404Component,
    NewReservationComponent,
    ReservationListComponent,
    NewLodgingComponent,
    SearchComponent,
    LodgingEditComponent,
    CarouselComponent,
    AlertInfoComponent,
    AlertSuccessComponent,
    AlertDangerComponent,
    AlertWarningComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgbToast,
    AlertContainerComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
