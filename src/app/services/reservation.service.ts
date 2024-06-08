import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Reservation } from '../model/reservation/reservation';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  apiUrl: string = environment.reservationApiUrl;

  constructor(private httpClient: HttpClient) { }

  create(reservation: Reservation): Observable<Reservation> {
    return this.httpClient.post<Reservation>(this.apiUrl + '/requestforreservation', reservation).pipe(catchError(err => {
      let message = 'Error: Sending reservation request failed';
      if(err.error){
        message = err.error.message;
      }
      return throwError(() => new Error(message));
    }));
  }

  delete(id: string) {
    return this.httpClient.delete(this.apiUrl + '/requestforreservation/' + id).pipe(catchError(err => {
      let message = 'Error: Deleting reservation request failed';
      if(err.error){
        message = err.error.message;
      }
      return throwError(() => new Error(message));
    }));
  }

}
