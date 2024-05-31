import { Component } from '@angular/core';
import { CurrentUserService } from 'src/app/services/current-user.service';

@Component({
  selector: 'app-guest-navbar',
  templateUrl: './guest-navbar.component.html',
  styleUrls: ['./guest-navbar.component.css']
})
export class GuestNavbarComponent {


  constructor(private currentUserService: CurrentUserService) {

  }
  logout(){
    this.currentUserService.logout();
  }
  
  username() {
    this.currentUserService.getUsername()
  }
}
