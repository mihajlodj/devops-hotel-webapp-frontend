import { Component, OnInit } from '@angular/core';
import { Observer } from 'rxjs';
import { Lodge } from 'src/app/model/lodge/lodge';
import { Reservation } from 'src/app/model/reservation/reservation';
import { ReservationStatus } from 'src/app/model/reservation/reservation-status';
import { User } from 'src/app/model/user/user';
import { AlertService } from 'src/app/services/alert.service';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { LodgingService } from 'src/app/services/lodging.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reservations-list',
  templateUrl: './reservations-list.component.html',
  styleUrls: ['./reservations-list.component.css']
})
export class ReservationsListComponent implements OnInit {

  reservations: Reservation[] = [];
  reservationsLodge: { [reservationId: string]: Lodge; } = {};
  reservationsHost: { [reservationId: string]: User; } = {};
  reservationsGuest: { [reservationId: string]: User; } = {};
  cancellableReservations: string[] = [];
  isHost: boolean = false;

  reservationToRate: Reservation = new Reservation();

  constructor(private reservationService: ReservationService, private userService: UserService, 
    private lodgeService: LodgingService, private alertService: AlertService, 
    private currentUserService: CurrentUserService) {}

  
  ngOnInit() {
    this.isHost = this.currentUserService.checkUserRole('HOST') === true;
    let observableOrNext: Partial<Observer<Reservation[]>> = {
      next: (response) => {
        this.reservations = response;
        this.setLodges();
        this.setGuests();
        this.setHosts();
      },
      error: (err) => {
        this.alertService.alertDanger(err.message);
      }
    };
    if (this.isHost) {
      this.reservationService.getHostReservations().subscribe(observableOrNext);
    } else {
      this.reservationService.getGuestReservations().subscribe(observableOrNext);
      this.reservationService.getAllReservationsForCancelation().subscribe({
        next: (response) => {
          response.map(e => this.cancellableReservations.push(e.id));
        },
        error: (err) => {
          this.alertService.alertDanger(err.message);
        }
      })
    }
  }

  setLodges() {
    this.reservations.forEach((el) => {
      this.lodgeService.get(el.lodgeId).subscribe({
        next: (response) => {
          this.reservationsLodge[el.id] = response;
        },
        error: (err) => {
          this.alertService.alertWarning(err.message);
        }
      });
    });
  }
  setHosts() {
    this.reservations.forEach((el) => {
      this.userService.getById(el.ownerId).subscribe({
        next: (response) => {
          this.reservationsHost[el.id] = response;
        },
        error: (err) => {
          this.alertService.alertWarning(err.message);
        }
      });
    });
  }
  setGuests() {
    this.reservations.forEach((el) => {
      this.userService.getById(el.guestId).subscribe({
        next: (response) => {
          this.reservationsGuest[el.id] = response;
        },
        error: (err) => {
          this.alertService.alertWarning(err.message);
        }
      });
    });
  }

  getLodgeName(reservation: Reservation) {
    return this.reservationsLodge[reservation.id]?.name;
  }
  getLodgeLocation(reservation: Reservation) {
    return this.reservationsLodge[reservation.id]?.location;
  }
  getHostFullName(reservation: Reservation) {
    return this.reservationsHost[reservation.id]?.firstName + ' ' + this.reservationsHost[reservation.id]?.lastName;
  }
  getGuestFullName(reservation: Reservation) {
    return this.reservationsGuest[reservation.id]?.firstName + ' ' + this.reservationsGuest[reservation.id]?.lastName; 
  }

  cancelReservation(reservation: Reservation) {
    this.reservationService.cancelReservation(reservation.id).subscribe({
      next: () => {
        this.alertService.alertSuccess('Reservation canceled');
        this.reservations.map((el) => {
          if (el.id === reservation.id) {
            el.status = ReservationStatus.CANCELED;
          }
        });
      },
      error: (err) => {
        this.alertService.alertDanger(err.message);
      }
    })
  }
  isReservationActive(reservation: Reservation) {
    return reservation.status === ReservationStatus.ACTIVE;
  }
  isReservationCancelable(reservation: Reservation) {
    return this.isReservationActive(reservation) && this.cancellableReservations.includes(reservation.id);
  }
  isReservationRateable(reservation: Reservation) {
    return !this.isReservationCancelable(reservation) && this.hasDatePassed(reservation.dateTo)
  }
  hasDatePassed(dateString: string) {
    // Convert the date string (yyyy-mm-dd) to a Date object
    const date = new Date(dateString);

    // Get the current date
    const today = new Date();

    // Set the time of today to midnight (00:00:00)
    today.setHours(0, 0, 0, 0);

    // Compare the dates
    return date < today;
  }
}
