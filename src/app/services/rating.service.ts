import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

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
  getAvgLodgeRating(lodgeId: string) {
    return this.httpClient.get<number>(this.apiUrl + '/lodge/average/' + lodgeId).pipe(catchError(err => {
      let message = 'Error: Getting average lodge rating failed';
      if(err.error){
        message = err.error.message;
      }
      return throwError(() => new Error(message));
    }));
  }
}
