import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { LodgeAvailabilityPeriod } from 'src/app/model/lodge/availability-period';
import { Lodge } from 'src/app/model/lodge/lodge';
import { PriceType } from 'src/app/model/lodge/price-type';
import { UserRole } from 'src/app/model/user/user-role';
import { AlertService } from 'src/app/services/alert.service';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { LodgingService } from 'src/app/services/lodging.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-lodging.edit',
  templateUrl: './lodging.edit.component.html',
  styleUrls: ['./lodging.edit.component.css']
})
export class LodgingEditComponent {
  amenities: string = '';

  photoUrlPrefix: string = environment.lodgePhotoUrl;
  lodge: Lodge = new Lodge();
  availabilityPeriods: LodgeAvailabilityPeriod[] = [];

  newPriceTypeLabel: string = 'Price type';
  newAvailabilityPeriod: LodgeAvailabilityPeriod = new LodgeAvailabilityPeriod();

  isLoggedIn: boolean = false;
  isHost: boolean = false;
  isGuest: boolean = false;
  isOwner: boolean = false;
  constructor(private currentUserService: CurrentUserService, 
    private lodgingService: LodgingService, 
    private route: ActivatedRoute, private router: Router,
    public alertService: AlertService) {

  }

  ngOnInit(): void {
    this.currentUserService.isLoggedIn.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      this.checkRoles();
    });
    this.checkRoles();

    let id = this.route.snapshot.paramMap.get('lodgeId');
    if (id == null) {
      this.router.navigateByUrl('/page404');
    } else {
      this.lodgingService.get(id).subscribe({
        error: (error: any) => {
          console.log(error.message);
          this.router.navigateByUrl('/page404');
        },
        next: (response) => {
          this.lodge = response;
          this.amenities = this.lodge.amenities.join(';');
          this.setIsOwner();
          if (this.isOwner === false) {
            this.router.navigateByUrl('/page404');
          }
        }
      });
      this.lodgingService.getAvalabilityPeriods(id).subscribe({
        next: (response) => {
          this.availabilityPeriods = response;
          this.availabilityPeriods.forEach(e => {
            e.dateFrom = e.dateFrom.slice(0, 10);
            e.dateTo = e.dateTo.slice(0, 10);
          });
        },
        error: (err) => {
          console.log(err);
          this.alertService.alertDanger(err.message);
        }
      });
    }
  }
  setIsOwner() {
    let token = this.currentUserService.getToken();
    let decoded: any = jwtDecode(token);
    if (decoded.userId === this.lodge.ownerId) {
      this.isOwner = true;
    }
  }
  checkRoles(){
    this.isGuest = this.currentUserService.checkUserRole(UserRole.GUEST);
    this.isHost = this.currentUserService.checkUserRole(UserRole.HOST)
  }

  setPriceType(label: string) {
    this.newPriceTypeLabel = label;
    if (label === 'Per guest') {
      this.newAvailabilityPeriod.priceType = PriceType.PER_GUEST
    } else {
      this.newAvailabilityPeriod.priceType = PriceType.PER_LODGE
    }
  }

  observerOrNext(message: string) {
    return {
      next: (response: any) => {
        this.alertService.alertSuccess(message);
        if (response) {
          this.availabilityPeriods.push(response);
        }
      },
      error: (err: any) => {
        console.log(err);
        this.alertService.alertDanger(message);
      }
    }
  }

  changePriceType(aPeriod: LodgeAvailabilityPeriod, perWhat: string) {
    if (perWhat === 'Per guest') {
      aPeriod.priceType = PriceType.PER_GUEST;
    } else {
      aPeriod.priceType = PriceType.PER_LODGE;
    }
  }

  addPeriod() {
    this.newAvailabilityPeriod.lodgeId = this.lodge.id;
    this.newAvailabilityPeriod.dateFrom += ' 00:00:00.0000000';
    this.newAvailabilityPeriod.dateTo   += ' 00:00:00.0000000';
    this.lodgingService.createAvailabilityPeriod(this.newAvailabilityPeriod).subscribe(
      this.observerOrNext('Period added successfuly!'));
  }

  deleteAPeriod(id: string) {
    this.lodgingService.deleteAvailabilityPeriod(id).subscribe(
      this.observerOrNext('Period deleted successfuly')
    );
  }
  saveAPeriod(aPeriod: LodgeAvailabilityPeriod) {
    aPeriod.dateFrom += ' 00:00:00.0000000';
    aPeriod.dateTo   += ' 00:00:00.0000000';
    this.lodgingService.updateAvailabilityPeriod(aPeriod.id, aPeriod).subscribe(
      this.observerOrNext('Period updated successfuly')
    )
  }
}
