import { Component } from '@angular/core';
import {Location} from '@angular/common';
import { CurrentUserService } from 'src/app/services/current-user.service';

@Component({
  selector: 'app-host-navbar',
  templateUrl: './host-navbar.component.html',
  styleUrls: ['./host-navbar.component.css']
})
export class HostNavbarComponent {

  profileActive: boolean = false;
  myLodgingsActive: boolean = false;
  newLodgingActive: boolean = false;
  reservations: boolean = false;

  constructor(private currentUserService: CurrentUserService, private location: Location) {

  }

  ngOnInit() {
    switch (this.location.path()) {
      case '/profile/'+this.username: {
        this.profileActive = true;
        break;
      }
      case '/myLodgings': {
        this.myLodgingsActive = true;
        break;
      }
      case '/newLodging': {
        this.newLodgingActive = true;
        break;
      }
      case ('/reservationRequests'): {
        this.reservations = true;
        break;
      }
      case ('/myReservations'): {
        this.reservations = true;
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
