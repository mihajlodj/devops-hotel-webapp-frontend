import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { Lodge } from 'src/app/model/lodge/lodge';
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
