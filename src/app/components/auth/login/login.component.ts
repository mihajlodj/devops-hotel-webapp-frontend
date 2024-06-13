import {Component, ViewChild} from '@angular/core';
import {LoadingComponent} from "../../utils/loading/loading.component";
import {UserService} from "../../../services/user.service";
import {CurrentUserService} from "../../../services/current-user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  showPassword: boolean = false;

  errorText: string = '';

  @ViewChild(LoadingComponent)
  loadingComponent!: LoadingComponent;

  constructor(private userService: UserService, private currentUserService: CurrentUserService, private router: Router) {
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  login() {
    if(!this.validateInput()){
      return;
    }

    this.loadingComponent.start();
    this.userService.login(this.username, this.password).subscribe({
      complete: () => {
      },
      error: (error) => {
        this.loadingComponent.stop();
        this.errorText = error.message;
      },
      next: (loginRes) => {
        this.currentUserService.login(loginRes.accessToken);
        this.loadingComponent.stop();
        this.router.navigate(['/']);
      }
    });
  }

  private validateInput(): boolean {
    this.errorText = '';

    if(this.username == '' || this.password == ''){
      this.errorText = 'Please provide email and password.'
      return false;
    } else {
      return true;
    }
  }

  enter(event: KeyboardEvent) {
    if (event.key == 'Enter') {
      this.login()
    }
  }

}
