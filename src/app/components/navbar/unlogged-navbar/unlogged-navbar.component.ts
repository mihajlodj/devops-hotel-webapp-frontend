import { Component } from '@angular/core';

@Component({
  selector: 'app-unlogged-navbar',
  templateUrl: './unlogged-navbar.component.html',
  styleUrls: ['./unlogged-navbar.component.css']
})
export class UnloggedNavbarComponent {

  loginActive: boolean = false;
  registerActive: boolean = false;

  constructor() {

  }
  loginClicked() {
    this.loginActive = true;
    this.registerActive = false;
  }
  registerClicked() {
    this.registerActive = true;
    this.loginActive = false;
  }
}
