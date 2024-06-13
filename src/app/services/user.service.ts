import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CurrentUserService} from "./current-user.service";
import {environment} from "../../environments/environment";
import {catchError, Observable, throwError} from "rxjs";
import {LoginResponse} from "../model/login/login-response";
import {ExceptionMessages} from "../model/exception-messages";
import {UserRole} from "../model/user/user-role";
import { User } from '../model/user/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private authUrl: string = environment.userService + '/auth';
  private userApiUrl: string = environment.userApiUrl;

  private headers = new HttpHeaders({
    'Authorization': 'Bearer ' + sessionStorage.getItem("jwt")
  });

  constructor(private httpClient: HttpClient, private currentUserService: CurrentUserService) {
    this.currentUserService.isLoggedIn.subscribe((loggedIn) => {
      if (loggedIn) {
        this.headers = new HttpHeaders({
          'Authorization': 'Bearer ' + sessionStorage.getItem("jwt")
        });
      }
    });
  }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(this.authUrl + '/login',
      {
        username: username,
        password: password
      })
      .pipe(
        catchError(err => {
          let message = ExceptionMessages.LOGIN_ERROR;
          if (err.error) {
            message = err.error.message;
          }
          return throwError(() => new Error(message));
        })
      );
  }

  register(username: string, email: string, password: string, repeatPassword: string, firstName: string, lastName: string, role: UserRole):Observable<any> {
    return this.httpClient.post<any>(this.authUrl + '/register',
      {
        username: username,
        email: email,
        password: password,
        repeatPassword: repeatPassword,
        firstName: firstName,
        lastName: lastName,
        role: role
      })
      .pipe(
        catchError(err => {
          let message = ExceptionMessages.REGISTER_ERROR;
          if(err.error){
            message = err.error.message;
          }
          return throwError(() => new Error(message));
        })
      );
  }

  getById(id: string): Observable<User> {
    return this.httpClient.get<User>(this.userApiUrl + '/' + id).pipe(catchError((err) => {
      let message = 'Error: Getting user failed';
      if (err.error) {
        message = err.error.message;
      }
      return throwError(() => new Error(message));
    }));
  }

}
