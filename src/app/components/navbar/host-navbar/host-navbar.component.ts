import { Component } from '@angular/core';
import { CurrentUserService } from 'src/app/services/current-user.service';

@Component({
  selector: 'app-host-navbar',
  templateUrl: './host-navbar.component.html',
  styleUrls: ['./host-navbar.component.css']
})
export class HostNavbarComponent {

  constructor(private currentUserService: CurrentUserService) {

  }
  logout(){
    this.currentUserService.logout();
  }
  username() {
    this.currentUserService.getUsername()
  }
}
