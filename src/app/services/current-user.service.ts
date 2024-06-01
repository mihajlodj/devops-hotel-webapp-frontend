import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {BehaviorSubject, Observable, catchError, throwError} from "rxjs";
import {JwtPayload} from "../model/login/jwt-payload";
import jwtDecode from "jwt-decode";
import { HttpClient } from '@angular/common/http';
import { ExceptionMessages } from '../model/exception-messages';
import { User } from '../model/user/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {


  private apiUrl: string = environment.apiUrl + '/users';

  private loggedInBehavior = new BehaviorSubject(this.getLoginStatus());
  isLoggedIn = this.loggedInBehavior.asObservable();

  constructor(private router: Router, private httpClient: HttpClient) { }

  getToken(): string{
    return sessionStorage.getItem("jwt") || "";
  }

  setLoggedInBehavior(loggedIn: boolean){
    this.loggedInBehavior.next(loggedIn);
  }

  private getLoginStatus(): boolean{
    return !!sessionStorage.getItem("jwt");
  }

  login(jwt: string){
    sessionStorage.setItem("jwt", jwt);
    this.loggedInBehavior.next(true);
  }

  getUserId(): number{
    let token = sessionStorage.getItem("jwt");
    if(token == null){
      return -1;
    }

    let decoded = jwtDecode<JwtPayload>(token);
    return decoded.userId;
  }

  getUsername(): string {
    let token = sessionStorage.getItem("jwt");
    if(token == null){
      return "";
    }

    let decoded = jwtDecode<JwtPayload>(token);
    return decoded.sub;
  }

  getFirstUserLetter(): string {
    let token = sessionStorage.getItem("jwt");
    if(token == null){
      return "";
    }

    let decoded = jwtDecode<JwtPayload>(token);
    return decoded.sub.substring(0,1).toUpperCase();
  }

  checkUserRole(role: string): boolean{
    let token = sessionStorage.getItem("jwt");
    if(token == null){
      return false;
    }

    let decoded = jwtDecode<JwtPayload>(token);
    return decoded.role == role;
  }

  logout(){
    sessionStorage.removeItem("jwt");
    this.setLoggedInBehavior(false);
    this.router.navigate(['/']);
  }

  me(): Observable<User> {
    return this.httpClient.get<User>(this.apiUrl + '/me').pipe(catchError(err => {
      let message = ExceptionMessages.GET_PROFILE_ERROR;
          if(err.error){
            message = err.error.message;
          }
          return throwError(() => new Error(message));
    }));
  }

  deleteMe(): Observable<any> {
    return this.httpClient.delete<any>(this.apiUrl).pipe(catchError(err => {
      let message = ExceptionMessages.DELETE_PROFILE_ERROR;
          if(err.error){
            message = err.error.message;
          }
          return throwError(() => new Error(message));
    }));
  }

  updateMe(user: User): Observable<any> {
    return this.httpClient.put<any>(this.apiUrl, user).pipe(catchError(err => {
      let message = ExceptionMessages.PUT_PROFILE_ERROR;
          if(err.error){
            message = err.error.message;
          }
          return throwError(() => new Error(message));
    }));
  }

  changeMyPassword(oldPassword: string, newPassword: string, repeatNewPassword: string) {
    return this.httpClient.put(this.apiUrl + '/change-password', {
      'oldPassword': oldPassword,
      'newPassword': newPassword,
      'repeatNewPassword': repeatNewPassword
    }).pipe(catchError(err => {
      let message = ExceptionMessages.PASSWORD_CHANGE_ERROR;
          if(err.error){
            message = err.error.message;
          }
          return throwError(() => new Error(message));
    }))
  }
  toggleMyNotifications() {
    return this.httpClient.put(this.apiUrl + '/update-notifications', {}).pipe(catchError(err => {
      let message = ExceptionMessages.PASSWORD_CHANGE_ERROR;
          if(err.error){
            message = err.error.message;
          }
          return throwError(() => new Error(message));
    }))
  }

}
