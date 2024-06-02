import { Component } from '@angular/core';
import {Location} from '@angular/common';
import { CurrentUserService } from 'src/app/services/current-user.service';

@Component({
  selector: 'app-guest-navbar',
  templateUrl: './guest-navbar.component.html',
  styleUrls: ['./guest-navbar.component.css']
})
export class GuestNavbarComponent {

  profileActive: boolean = false;
  myReservationsActive: boolean = false;

  constructor(private currentUserService: CurrentUserService, private location: Location) {

  }
  ngOnInit() {
    switch (this.location.path()) {
      case '/profile/'+this.username: {
        this.profileActive = true;
        break;
      }
      case '/myLodgings': {
        this.myReservationsActive = true;
        break;
      }
      default: {
        break;
      }
    }
  }

  logout(){
    this.currentUserService.logout();
  }
  
  get username() {
    return this.currentUserService.getUsername()
  }
}
