import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ReservationRequestCreateRequest } from '../model/reservation/request-for-reservation-request';
import { Observable, catchError, throwError } from 'rxjs';
import { RequestForReservation } from '../model/reservation/request-for-reservation';
import { Reservation } from '../model/reservation/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  apiUrl: string = environment.reservationApiUrl;

  constructor(private httpClient: HttpClient) { }

  create(reservation: ReservationRequestCreateRequest): Observable<ReservationRequestCreateRequest> {
    return this.httpClient.post<ReservationRequestCreateRequest>(this.apiUrl + '/requestforreservation', reservation).pipe(catchError(err => {
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
  getGuestCancelCount(id: string): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + '/canceled/count/' + id).pipe(catchError(err => {
      let message = 'Error: Getting guest cancelation count failed.';
      if(err.error){
        message = err.error.message;
      }
      return throwError(() => new Error(message));
    }));
  }
  getHostReservations(): Observable<Reservation[]> {
    return this.httpClient.get<Reservation[]>(this.apiUrl + '/all/host').pipe(catchError(err => {
      let message = 'Error: Getting host reservation failed.';
      if(err.error){
        message = err.error.message;
      }
      return throwError(() => new Error(message));
    }));
  }
  getGuestReservations(): Observable<Reservation[]> {
    return this.httpClient.get<Reservation[]>(this.apiUrl + '/all/guest').pipe(catchError(err => {
      let message = 'Error: Getting guest reservation failed.';
      if(err.error){
        message = err.error.message;
      }
      return throwError(() => new Error(message));
    }));
  }
  getLodgeReservations(lodgeId: string): Observable<Reservation[]> {
    return this.httpClient.get<Reservation[]>(this.apiUrl + '/all/' + lodgeId).pipe(catchError(err => {
      let message = 'Error: Getting lodge reservation failed.';
      if(err.error){
        message = err.error.message;
      }
      return throwError(() => new Error(message));
    }));
  }
  cancelReservation(reservationId: string) {
    return this.httpClient.put(this.apiUrl + '/cancellation/' + reservationId, {}).pipe(catchError(err => {
      let message = 'Error: Canceling reservation failed.';
      if(err.error){
        message = err.error.message;
      }
      return throwError(() => new Error(message));
    }));
  }
  getAllReservationsForCancelation(): Observable<Reservation[]> {
    return this.httpClient.get<Reservation[]>(this.apiUrl + '/all/cancelation').pipe(catchError(err => {
      let message = 'Error: Getting reservations for cancellation failed.';
      if(err.error){
        message = err.error.message;
      }
      return throwError(() => new Error(message));
    }));
  }
}
