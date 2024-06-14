import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LodgeRating } from '../model/rating/lodge-rating';
import { HostRating } from '../model/rating/host-rating';
import { HostRatingCreateRequest } from '../model/rating/host-rating-create-request';
import { LodgeRatingCreateRequest } from '../model/rating/lodge_rating-create.request';
import { HostRatingUpdateRequest } from '../model/rating/host-rating-update-request';
import { LodgeRatingUpdateRequest } from '../model/rating/lodge-rating-update-request';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  apiUrl: string = environment.ratingApiUrl;

  constructor(private httpClient: HttpClient) { }

  getAvgHostRating(hostId: string): Observable<number> {
    return this.httpClient.get<number>(this.apiUrl + '/host/average/' + hostId).pipe(catchError(err => {
      let message = 'Error: Getting average host rating failed';
      if(err.error){
        message = err.error.message;
      }
      return throwError(() => new Error(message));
    }));
  }
  getAvgLodgeRating(lodgeId: string): Observable<number> {
    return this.httpClient.get<number>(this.apiUrl + '/lodge/average/' + lodgeId).pipe(catchError(err => {
      let message = 'Error: Getting average lodge rating failed';
      if(err.error){
        message = err.error.message;
      }
      return throwError(() => new Error(message));
    }));
  }
  getLodgeRatingsByMe(lodgeId: string | null): Observable<LodgeRating[]> {
    let path = this.apiUrl + '/lodge/me';
    path = lodgeId === null ? path : path + '?lodgeId=' + lodgeId;
    return this.httpClient.get<LodgeRating[]>(path).pipe(catchError(err => {
      let message = 'Error: Getting lodges you rated failed';
      if(err.error){
        message = err.error.message;
      }
      return throwError(() => new Error(message));
    }));
  }
  getHostRatingsByMe(hostId: string | null): Observable<HostRating[]> {
    let path = this.apiUrl + '/host/me';
    path = hostId === null ? path : path + '?hostId=' + hostId;
    return this.httpClient.get<HostRating[]>(path).pipe(catchError(err => {
      let message = 'Error: Getting hosts you rated failed';
      if(err.error){
        message = err.error.message;
      }
      return throwError(() => new Error(message));
    }));
  }

  createHostRating(request: HostRatingCreateRequest): Observable<HostRating>  {
    return this.httpClient.post<HostRating>(this.apiUrl + '/host', request).pipe(catchError(err => {
      let message = 'Error: Saving rating failed';
      if(err.error){
        message = err.error.message;
      }
      return throwError(() => new Error(message));
    }));
  }
  createLodgeRating(request: LodgeRatingCreateRequest): Observable<LodgeRating> {
    return this.httpClient.post<LodgeRating>(this.apiUrl + '/lodge', request).pipe(catchError(err => {
      let message = 'Error: Saving rating failed';
      if(err.error){
        message = err.error.message;
      }
      return throwError(() => new Error(message));
    }));
  }
  deleteHostRating(hostId: string) {
    return this.httpClient.delete(this.apiUrl + '/host/' + hostId).pipe(catchError(err => {
      let message = 'Error: Removing rating failed';
      if(err.error){
        message = err.error.message;
      }
      return throwError(() => new Error(message));
    }));
  }
  deleteLodgeRating(lodgeId: string) {
    return this.httpClient.delete(this.apiUrl + '/lodge/' + lodgeId).pipe(catchError(err => {
      let message = 'Error: Removing rating failed';
      if(err.error){
        message = err.error.message;
      }
      return throwError(() => new Error(message));
    }));
  }
  updateHostRating(hostId: string, request: HostRatingUpdateRequest): Observable<HostRating> {
    return this.httpClient.put<HostRating>(this.apiUrl + '/host/' + hostId, request).pipe(catchError(err => {
      let message = 'Error: Rating update failed';
      if(err.error){
        message = err.error.message;
      }
      return throwError(() => new Error(message));
    }));
  }
  updateLodgeRating(lodgeId: string, request: LodgeRatingUpdateRequest): Observable<LodgeRating> {
    return this.httpClient.put<LodgeRating>(this.apiUrl + '/lodge/' + lodgeId, request).pipe(catchError(err => {
      let message = 'Error: Rating update failed';
      if(err.error){
        message = err.error.message;
      }
      return throwError(() => new Error(message));
    }));
  }
}
