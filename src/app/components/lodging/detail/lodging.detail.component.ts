import { Component } from '@angular/core';
import { CurrentUserService } from '../../../services/current-user.service';
import { UserRole } from 'src/app/model/user/user-role';
import { ActivatedRoute, Router } from '@angular/router';
import { LodgingService } from 'src/app/services/lodging.service';
import { Lodge } from 'src/app/model/lodge/lodge';
import { environment } from 'src/environments/environment';
import jwtDecode from 'jwt-decode';
import { LodgeAvailabilityPeriod } from 'src/app/model/lodge/availability-period';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-lodging-details',
  templateUrl: './lodging.detail.component.html',
  styleUrls: ['./lodging.detail.component.css']
})
export class LodgingDetailComponent {

  photoUrlPrefix: string = environment.lodgePhotoUrl;
  lodge: Lodge = new Lodge();
  availabilityPeriods: LodgeAvailabilityPeriod[] = [];
  
  isLoggedIn: boolean = false;
  isHost: boolean = false;
  isGuest: boolean = false;
  isOwner: boolean = false;
  constructor(private currentUserService: CurrentUserService, 
    private lodgingService: LodgingService, 
    private route: ActivatedRoute, private router: Router,
    private alertService: AlertService) {

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
          this.setIsOwner();
        }
      });
      this.lodgingService.getAvalabilityPeriods(id).subscribe({
        next: (response) => {
          this.availabilityPeriods = response;
          this.availabilityPeriods.forEach(e => {
            e.dateFrom = e.dateFrom.slice(0, 10);
            e.dateTo = e.dateTo.slice(0, 10);
          })
        },
        error: (err) => {
          console.log(err);
          this.alertService.alertWarning(err.message);
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

}
