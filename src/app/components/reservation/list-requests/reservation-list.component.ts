import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observer } from 'rxjs';
import { RequestForReservation } from 'src/app/model/reservation/request-for-reservation';
import { AlertService } from 'src/app/services/alert.service';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { RatingService } from 'src/app/services/rating.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationRequestsComponent {

  photoUrlPrefix: string = environment.lodgePhotoUrl;

  isHost: boolean = false;
  reservationsRequests: RequestForReservation[] = [];

  constructor(private reservationService: ReservationService, private router: Router,
    private currentUserService: CurrentUserService, private alertService: AlertService,
    private userService: UserService, private ratingService: RatingService) { }

  ngOnInit() {
    this.isHost = this.currentUserService.checkUserRole('HOST') === true;
    this.setReservationRequests();
  }

  setReservationRequests() {
    let observableOrNext: Partial<Observer<RequestForReservation[]>> = {
      next: (response) => {
        this.reservationsRequests = response;
        this.setGuests();
        this.setHosts();
      },
      error: (err) => {
        this.alertService.alertDanger(err.message);
      }
    };
    if (this.isHost) {
      this.reservationService.getHostReservationRequests().subscribe(observableOrNext);
    } else {
      this.reservationService.getGuestReservationRequests().subscribe(observableOrNext);
    }
  }

  setGuests() {
    if (this.isHost) {
      this.reservationsRequests.forEach((req) => {
        this.userService.getById(req.guestId).subscribe({
          next: (response) => {
            req.guest = response;
          },
          error: (err) => {
            this.alertService.alertWarning(err.message);
          }
        });
        this.reservationService.getGuestCancelCount(req.guestId).subscribe({
          next: (response) => {
            req.guestCancelCount = response;
          },
          error: (err) => {
            this.alertService.alertWarning(err.message);
          }
        });
      });
      
    }
  }
  setHosts() {
    if (!this.isHost) {
      this.reservationsRequests.forEach((req) => {
        this.userService.getById(req.ownerId).subscribe({
          next: (response) => {
            req.owner = response;
          }
        });
        this.ratingService.getAvgHostRating(req.ownerId).subscribe({
          next: (response) => {
            req.hostAvgRating = response;
          }
        })
      });
    }
  }
  accept(request: RequestForReservation) {
    this.reservationService.acceptRequest(request.id).subscribe({
      next: () => {
        this.alertService.alertSuccess('Request accepted');
        this.setReservationRequests();
      }
    });
  }
  decline(request: RequestForReservation) {
    this.reservationService.declineRequest(request.id).subscribe({
      next: () => {
        this.alertService.alertSuccess('Request declined');
        this.setReservationRequests();
      }
    });
  }
}
