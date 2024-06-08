import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Lodge } from '../model/lodge/lodge';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private apiUrl: string = environment.lodgeApiUrl;

  constructor(private httpClient: HttpClient) { }

  get(queryUrl: string): Observable<Lodge[]> {
    return this.httpClient.get<Lodge[]>(this.apiUrl + queryUrl).pipe(catchError(err => {
      let message = 'Error: Lodge search failed';
      if(err.error){
        message = err.error.message;
      }
      return throwError(() => new Error(message));
    }));
  }
}
