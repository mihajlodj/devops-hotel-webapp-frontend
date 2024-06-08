import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Lodge } from 'src/app/model/lodge/lodge';
import { Reservation } from 'src/app/model/reservation/reservation';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-new-reservation',
  templateUrl: './reservation.new.component.html',
  styleUrls: ['./reservation.new.component.css']
})
export class NewReservationComponent {

  @Input() lodge: Lodge = new Lodge();

  newReservation: Reservation = new Reservation();

  constructor(private reservationService: ReservationService, private router: Router) { }

  createRequest() {
    this.newReservation.lodgeId = this.lodge.id;
    this.newReservation.dateFrom += ' 00:00:00.0000000';
    this.newReservation.dateTo   += ' 00:00:00.0000000';
    this.reservationService.create(this.newReservation).subscribe({
      next: () => {
        alert('Reservation request sent');
        this.router.navigate(['']);
      },
      error: (err) => {
        console.log(err);
        alert(err.message);
      }
    });
  }

}
