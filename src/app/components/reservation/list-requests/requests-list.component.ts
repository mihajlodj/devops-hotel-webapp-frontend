import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observer } from 'rxjs';
import { Lodge } from 'src/app/model/lodge/lodge';
import { RequestForReservation } from 'src/app/model/reservation/request-for-reservation';
import { User } from 'src/app/model/user/user';
import { UserRole } from 'src/app/model/user/user-role';
import { AlertService } from 'src/app/services/alert.service';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { LodgingService } from 'src/app/services/lodging.service';
import { RatingService } from 'src/app/services/rating.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.css']
})
export class ReservationRequestsComponent {

  photoUrlPrefix: string = environment.lodgePhotoUrl;

  isHost: boolean = false;

  reservationsRequests: RequestForReservation[] = [];
  reservationsLodge: { [reservationId: string]: Lodge } = {};
  reservationsHost: { [reservationId: string]: User } = {};
  reservationsGuest: { [reservationId: string]: User } = {};

  guestCancelCount: { [guestId: string]: number } = {};
  hostAvgRating: { [hostId: string]: number } = {};
  lodgeAvgRating: { [lodgeId: string]: number} = {};

  constructor(private reservationService: ReservationService, private router: Router,
    private currentUserService: CurrentUserService, private alertService: AlertService,
    private userService: UserService, private ratingService: RatingService, private lodgeService: LodgingService) { }

  ngOnInit() {
    this.isHost = this.currentUserService.checkUserRole(UserRole.HOST);
    this.setReservationRequests();
  }

  setReservationRequests() {
    let observableOrNext: Partial<Observer<RequestForReservation[]>> = {
      next: (response) => {
        this.reservationsRequests = response;
        this.isHost ? this.setGuests() : null;
        this.isHost ? null : this.setHosts();
        this.setLodges();
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
  
  observableOrNextLodgeRating(lodgeId: string): Partial<Observer<number>> {
    return {
      next: (response) => {
        this.lodgeAvgRating[lodgeId] = response;
      },
      error: (err) => {
        this.alertService.alertWarning(err.message);
      }
    }
  }
  observableOrNextLodge(request: RequestForReservation): Partial<Observer<Lodge>> {
    return {
      next: (response) => {
        this.reservationsLodge[request.id] = response;
      },
      error: (err) => {
        this.alertService.alertWarning(err.message);
      }
    }
  }
  setLodges() {
    this.reservationsRequests.forEach((el) => {
      this.lodgeService.get(el.lodgeId).subscribe(this.observableOrNextLodge(el));
      this.ratingService.getAvgLodgeRating(el.lodgeId).subscribe(this.observableOrNextLodgeRating(el.lodgeId));
    });
  }
  observableOrNextRating(hostId: string): Partial<Observer<number>> {
    return {
      next: (rating) => {
        this.hostAvgRating[hostId] = rating;
      },
      error: (err) => {
        this.alertService.alertWarning(err.message);
      }
    };
  }
  observableOrNextHost(reservationRequest: RequestForReservation): Partial<Observer<User>> {
    return {
      next: (response) => {
        this.reservationsHost[reservationRequest.id] = response;
      },
      error: (err) => {
        this.alertService.alertWarning(err.message);
      }
    };
  }
  setHosts() {
    this.reservationsRequests.forEach((el) => {
      this.userService.getById(el.ownerId).subscribe(this.observableOrNextHost(el));
      this.ratingService.getAvgHostRating(el.ownerId).subscribe(this.observableOrNextRating(el.ownerId));
    });
  }
  observableOrNextCancelCount(guestId: string): Partial<Observer<any>> {
    return {
      next: (response) => {
        this.guestCancelCount[guestId] = response.count;
      },
      error: (err) => {
        this.alertService.alertWarning(err.message);
      }
    }
  }
  observableOrNextGuest(reservationRequest: RequestForReservation): Partial<Observer<User>> {
    return {
      next: (response) => {
        this.reservationsGuest[reservationRequest.id] = response;
      },
      error: (err) => {
        this.alertService.alertWarning(err.message);
      }
    }
  }
  setGuests() {
    this.reservationsRequests.forEach((el) => {
      this.userService.getById(el.guestId).subscribe(this.observableOrNextGuest(el));
      this.reservationService.getGuestCancelCount(el.guestId).subscribe(this.observableOrNextCancelCount(el.guestId));
    });
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

  getFirstLodgePhoto(request: RequestForReservation): string {
    return this.reservationsLodge[request.id]?.photos[0].url;
  }
  getLodgeName(request: RequestForReservation): string {
    return this.reservationsLodge[request.id]?.name;
  }
  getLodgeLocation(request: RequestForReservation): string {
    return this.reservationsLodge[request.id]?.location;
  }
  getGuestFullName(request: RequestForReservation): string {
    if (this.reservationsGuest[request.id]  !== undefined) {
      return this.reservationsGuest[request.id].firstName + ' ' + this.reservationsGuest[request.id].lastName; 
    } else {
      return '';
    }
  }
  getHostFullName(request: RequestForReservation): string {
    if (this.reservationsHost[request.id] !== undefined) {
      return this.reservationsHost[request.id].firstName + ' ' + this.reservationsHost[request.id].lastName; 
    } else {
      return '';
    }
  }
  getGuestCancelCount(request: RequestForReservation): number {
    return this.guestCancelCount[request.guestId] ? this.guestCancelCount[request.guestId] : 0;
  }
  getHostRating(request: RequestForReservation): any {
    return this.hostAvgRating[request.ownerId] ? this.hostAvgRating[request.ownerId] : 'None';
  }
  getLodgeRating(request: RequestForReservation): any {
    return this.lodgeAvgRating[request.lodgeId] ? this.lodgeAvgRating[request.lodgeId] : 'None';
  }
}
