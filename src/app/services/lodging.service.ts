import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {BehaviorSubject, Observable, catchError, throwError} from "rxjs";
import {JwtPayload} from "../model/login/jwt-payload";
import jwtDecode from "jwt-decode";
import { HttpClient } from '@angular/common/http';
import { ExceptionMessages } from '../model/exception-messages';
import { User } from '../model/user/user';
import { environment } from 'src/environments/environment';
import { Lodge } from '../model/lodge/lodge';

@Injectable({
  providedIn: 'root'
})
export class LodgingService {


  private apiUrl: string = environment.lodgeApiUrl;

  constructor(private router: Router, private httpClient: HttpClient) { }

  create(formData: FormData): Observable<Lodge> {
    return this.httpClient.post<Lodge>(this.apiUrl + '/create', formData).pipe(catchError(err => {
      let message = 'Error: Lodge creation failed';
      if(err.error){
        message = err.error.message;
      }
      return throwError(() => new Error(message));
    }));
  }
  get(id: number): Observable<Lodge> {
    return this.httpClient.get<Lodge>(this.apiUrl + '/get/' + id, {
    }).pipe(catchError(err => {
      let message = 'Error: Getting lodge failed';
        if(err.error){
          message = err.error.message;
        }
        return throwError(() => new Error(message));
    }));
  }
  delete(id: number): Observable<Lodge> {
    return this.httpClient.delete<Lodge>(this.apiUrl + '/delete/' + id, {
    }).pipe(catchError(err => {
      let message = 'Error: Deleting lodge failed';
        if(err.error){
          message = err.error.message;
        }
        return throwError(() => new Error(message));
    }));
  }

}
