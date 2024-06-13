import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import { Observable, catchError, throwError} from "rxjs";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Lodge } from '../model/lodge/lodge';
import { LodgeAvailabilityPeriod } from '../model/lodge/availability-period';

@Injectable({
  providedIn: 'root'
})
export class LodgingService {


  private apiUrl: string = environment.lodgeApiUrl;

  constructor(private httpClient: HttpClient) { }

  create(formData: FormData): Observable<Lodge> {
    return this.httpClient.post<Lodge>(this.apiUrl + '/create', formData).pipe(catchError(err => {
      let message = 'Error: Lodge creation failed';
      if(err.error){
        message = err.error.message;
      }
      return throwError(() => new Error(message));
    }));
  }

  getAll(): Observable<Lodge[]> {
    return this.httpClient.get<Lodge[]>(this.apiUrl + '/all').pipe(catchError(err => {
      let message = 'Error: Getting lodges failed';
        if(err.error){
          message = err.error.message;
        }
        return throwError(() => new Error(message));
    }));
  }

  get(id: string): Observable<Lodge> {
    return this.httpClient.get<Lodge>(this.apiUrl + '/' + id).pipe(catchError(err => {
      let message = 'Error: Getting lodge failed';
        if(err.error){
          message = err.error.message;
        }
        return throwError(() => new Error(message));
    }));
  }

  getMineAll(): Observable<Lodge[]> {
    return this.httpClient.get<Lodge[]>(this.apiUrl + '/mine/all').pipe(catchError(err => {
      let message = 'Error: Getting lodges failed';
        if(err.error){
          message = err.error.message;
        }
        return throwError(() => new Error(message));
    }));
  }

  delete(id: string): Observable<Lodge> {
    return this.httpClient.delete<Lodge>(this.apiUrl + '/delete/' + id).pipe(catchError(err => {
      let message = 'Error: Deleting lodge failed';
        if(err.error){
          message = err.error.message;
        }
        return throwError(() => new Error(message));
    }));
  }

  getAvalabilityPeriods(id: string): Observable<LodgeAvailabilityPeriod[]> {
    return this.httpClient.get<LodgeAvailabilityPeriod[]>(this.apiUrl + '/availability/all/' + id).pipe(catchError(err => {
      let message = "Error: Getting lodge availability periods failed";
      if (err.error) {
        message = err.error.message;
      }
      return throwError(() => new Error(message));
    }));
  }
  createAvailabilityPeriod(aPeriod: LodgeAvailabilityPeriod): Observable<LodgeAvailabilityPeriod> {
    return this.httpClient.post<LodgeAvailabilityPeriod>(this.apiUrl + '/availability/create', aPeriod).pipe(catchError(err => {
      let message = "Error: Creating lodge availability period failed";
      if (err.error) {
        message = err.error.message;
      }
      return throwError(() => new Error(message));
    }));
  }
  deleteAvailabilityPeriod(id: string): Observable<LodgeAvailabilityPeriod> {
    return this.httpClient.delete<LodgeAvailabilityPeriod>(this.apiUrl + '/availability/' + id).pipe(catchError(err => {
      let message = "Error: Deleting lodge availability period failed";
      if (err.error) {
        message = err.error.message;
      }
      return throwError(() => new Error(message));
    }));
  }
  updateAvailabilityPeriod(id: string, aPeriod: LodgeAvailabilityPeriod): Observable<LodgeAvailabilityPeriod> {
    return this.httpClient.put<LodgeAvailabilityPeriod>(this.apiUrl + '/availability/' + id, aPeriod).pipe(catchError(err => {
      let message = "Error: Updating lodge availability period failed";
      if (err.error) {
        message = err.error.message;
      }
      return throwError(() => new Error(message));
    }));
  }
}
