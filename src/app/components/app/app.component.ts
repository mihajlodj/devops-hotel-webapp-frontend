import {Component, OnInit, TemplateRef, ViewChild, AfterViewInit} from '@angular/core';
import {CurrentUserService} from "../../services/current-user.service";
import {UserRole} from "../../model/user/user-role";
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('successAlert') successAlert!: TemplateRef<any>;
  @ViewChild('dangerAlert') dangerAlert!: TemplateRef<any>;
  @ViewChild('warningAlert') warningAlert!: TemplateRef<any>;
  @ViewChild('infoAlert') infoAlert!: TemplateRef<any>;
  public alertMessage: string = '';

  displayLogout: string = "none";
  isLoggedIn: boolean = false;
  isHost: boolean = false;
  isGuest: boolean = false;

  constructor(private currentUserService: CurrentUserService,
    private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.alertService.alertMessage$.subscribe(message => {
      this.alertMessage = message;
    });
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

  ngAfterViewInit() {
    this.alertService.setTemplates(this.successAlert, this.dangerAlert, this.warningAlert, this.infoAlert);
  }
}
