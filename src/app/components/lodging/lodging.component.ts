import { Component } from '@angular/core';
import { CurrentUserService } from '../../services/current-user.service';
import { UserRole } from 'src/app/model/user/user-role';

@Component({
  selector: 'app-lodging',
  templateUrl: './lodging.component.html',
  styleUrls: ['./lodging.component.css']
})
export class LodgingComponent {
  lodgingType: any;
  title: any;
  description: any;
  numberOfBeds: any;
  available: any;
  
  isLoggedIn: boolean = false;
  isHost: boolean = false;
  isGuest: boolean = false;
  constructor(private currentUserService: CurrentUserService) {

  }

  ngOnInit(): void {
    this.currentUserService.isLoggedIn.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      this.checkRoles();
    });

    this.checkRoles();
  }

  checkRoles(){
    this.isGuest = this.currentUserService.checkUserRole(UserRole.GUEST);
    this.isHost = this.currentUserService.checkUserRole(UserRole.HOST)
  }

  reserve() {
    throw new Error('Method not implemented.');
  }

  randomSeed() {
    return Math.random() * 1000;
  }

}
