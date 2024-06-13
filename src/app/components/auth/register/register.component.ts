import {Component, ViewChild} from '@angular/core';
import {LoadingComponent} from "../../utils/loading/loading.component";
import {UserService} from "../../../services/user.service";
import {UserRole} from "../../../model/user/user-role";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  username: string = '';
  email: string = '';
  role: UserRole = UserRole.GUEST;
  password: string = '';
  passwordRepeat: string = '';
  firstName: string = '';
  lastName: string = '';

  userRoles = [UserRole.GUEST, UserRole.HOST];

  showRegister: boolean = true;
  showPassword: boolean = false;

  emailExpression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  errorText: string = '';

  @ViewChild(LoadingComponent)
  loadingComponent!: LoadingComponent;


  constructor(private userService: UserService) {
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  register() {
    if(!this.validateInput()){
      return;
    }

    this.loadingComponent.start();
    this.userService.register(this.username, this.email, this.password, this.passwordRepeat, this.firstName, this.lastName, this.role).subscribe({
      complete: () => {

      },
      error: (error) => {
        this.loadingComponent.stop();
        this.errorText = error.message;
      },
      next: () => {
        this.loadingComponent.stop();
        this.showRegister = false;
      }
    });
  }

  private validateInput(): boolean {
    this.errorText = '';

    if (this.email == '' || this.password == '' || this.passwordRepeat == '' || this.firstName == '' || this.lastName == '' || this.username == '') {
      this.errorText = 'Please fill in the form.'
      return false;
    } else if(this.passwordRepeat != this.password) {
      this.errorText = 'Passwords don\'t match.'
      return false;
    } else if(!this.emailExpression.test(this.email)) {
      this.errorText = 'Invalid email format.'
      return false;
    } else {
      return true;
    }
  }

}
