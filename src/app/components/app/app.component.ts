import {Component, OnInit} from '@angular/core';
import {CurrentUserService} from "../../services/current-user.service";
import {Router} from "@angular/router";
import {UserRole} from "../../model/user/user-role";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'DEVOPS';
  displayLogout: string = "none";
  isLoggedIn: boolean = false;
  isHost: boolean = false;
  isGuest: boolean = false;

  constructor(private router: Router, private currentUserService: CurrentUserService) {
  }

  ngOnInit(): void {
    this.currentUserService.isLoggedIn.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      this.checkRoles();
    });

    this.checkRoles();
  }

  logout(){
    this.currentUserService.logout();
  }

  checkRoles(){
    this.isGuest = this.currentUserService.checkUserRole(UserRole.GUEST);
    this.isHost = this.currentUserService.checkUserRole(UserRole.HOST)
  }
}
