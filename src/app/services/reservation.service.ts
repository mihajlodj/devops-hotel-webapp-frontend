import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Reservation } from '../model/reservation/reservation';
import { Observable, catchError, throwError } from 'rxjs';
import { RequestForReservation } from '../model/reservation/request-for-reservation';

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

  getHostReservationRequests(): Observable<RequestForReservation[]> {
    return this.httpClient.get<RequestForReservation[]>(this.apiUrl + '/requestforreservation/all/host').pipe(catchError(err => {
      let message = 'Error: Getting host reservation requests failed.';
      if(err.error){
        message = err.error.message;
      }
      return throwError(() => new Error(message));
    }));
  }

  getGuestReservationRequests(): Observable<RequestForReservation[]> {
    return this.httpClient.get<RequestForReservation[]>(this.apiUrl + '/requestforreservation/all/guest').pipe(catchError(err => {
      let message = 'Error: Getting guest reservation requests failed.';
      if(err.error){
        message = err.error.message;
      }
      return throwError(() => new Error(message));
    }));
  }

  getHostReservationRequestById(id: string): Observable<RequestForReservation> {
    return this.httpClient.get<RequestForReservation>(this.apiUrl + '/requestforreservation/host/' + id).pipe(catchError(err => {
      let message = 'Error: Getting host reservation requests failed.';
      if(err.error){
        message = err.error.message;
      }
      return throwError(() => new Error(message));
    }));
  }

  getGuestReservationRequestById(id: string): Observable<RequestForReservation> {
    return this.httpClient.get<RequestForReservation>(this.apiUrl + '/requestforreservation/guest/' + id).pipe(catchError(err => {
      let message = 'Error: Getting guest reservation requests failed.';
      if(err.error){
        message = err.error.message;
      }
      return throwError(() => new Error(message));
    }));
  }

  acceptRequest(id: string) {
    return this.httpClient.put(this.apiUrl + '/requestforreservation/' + id, {
      status: 'APPROVED'
    }).pipe(catchError(err => {
      let message = 'Error: Accepting request failed.';
      if(err.error){
        message = err.error.message;
      }
      return throwError(() => new Error(message));
    }));
  }
  declineRequest(id: string) {
    return this.httpClient.put(this.apiUrl + '/requestforreservation/' + id, {
      status: 'DENIED'
    }).pipe(catchError(err => {
      let message = 'Error: Declining request failed.';
      if(err.error){
        message = err.error.message;
      }
      return throwError(() => new Error(message));
    }));
  }
  getGuestCancelCount(id: string): Observable<number> {
    return this.httpClient.get<number>(this.apiUrl + '/canceled/count/' + id).pipe(catchError(err => {
      let message = 'Error: Getting guest cancelation count failed.';
      if(err.error){
        message = err.error.message;
      }
      return throwError(() => new Error(message));
    }));
  }
}
