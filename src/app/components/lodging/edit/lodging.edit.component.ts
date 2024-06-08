import { Component } from '@angular/core';
import { AsyncValidator } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { LodgeAvailabilityPeriod } from 'src/app/model/lodge/availability-period';
import { Lodge } from 'src/app/model/lodge/lodge';
import { PriceType } from 'src/app/model/lodge/price-type';
import { UserRole } from 'src/app/model/user/user-role';
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
    private route: ActivatedRoute, private router: Router) {

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
        },
        error: (err) => {
          console.log(err);
          alert(err.message);
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

  observerOrNext(alertMessage: string) {
    return {
      next: (_: any) => {
        alert(alertMessage);
        location.reload();
      },
      error: (err: any) => {
        console.log(err);
        alert(err.message);
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
    this.lodgingService.createAvailabilityPeriod(this.newAvailabilityPeriod).subscribe(
      this.observerOrNext('Availability period added'));
  }

  deleteAPeriod(id: string) {
    this.lodgingService.deleteAvailabilityPeriod(id).subscribe(
      this.observerOrNext('Availability period deleted')
    );
  }
  saveAPeriod(aPeriod: LodgeAvailabilityPeriod) {
    this.lodgingService.updateAvailabilityPeriod(aPeriod.id, aPeriod).subscribe(
      this.observerOrNext('Availability period updated')
    )
  }
}
