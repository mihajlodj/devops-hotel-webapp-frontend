import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Lodge } from 'src/app/model/lodge/lodge';
import { ReservationRequestCreateRequest } from 'src/app/model/reservation/request-for-reservation-request';
import { AlertService } from 'src/app/services/alert.service';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-new-reservation',
  templateUrl: './reservation.new.component.html',
  styleUrls: ['./reservation.new.component.css']
})
export class NewReservationComponent {

  @Input() lodge: Lodge = new Lodge();

  newReservation: ReservationRequestCreateRequest = new ReservationRequestCreateRequest();

  constructor(private reservationService: ReservationService, private router: Router, private alertService: AlertService) { }

  createRequest() {
    this.newReservation.lodgeId = this.lodge.id;
    this.reservationService.create(this.newReservation).subscribe({
      next: () => {
        this.alertService.alertInfo('Reservation request sent');
        this.router.navigate(['']);
      },
      error: (err) => {
        this.alertService.alertDanger(err.message);
      }
    });
  }

}
