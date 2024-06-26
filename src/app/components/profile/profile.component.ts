import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user/user';
import { UserRole } from 'src/app/model/user/user-role';
import { AlertService } from 'src/app/services/alert.service';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { RatingService } from 'src/app/services/rating.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  userProfile: User | undefined = undefined;
  oldPassword: string = '';
  newPassword: string = '';
  repeatNewPassword: string = '';

  isHost: boolean = false;
  hostRating: number | null = null;
  constructor(private route: ActivatedRoute, private currentUserService: CurrentUserService, 
    private alertService: AlertService, private ratingService: RatingService) {

  }

  ngOnInit(): void {
    this.currentUserService.me().subscribe(
      {
        next: (user) => {
          this.userProfile = user;
          this.isHost = this.currentUserService.checkUserRole(UserRole.HOST);
          if (this.isHost) {
            this.ratingService.getAvgHostRating(user.id).subscribe({
              next: (response) =>{
                this.hostRating = response;
              },
              error: (err) => {
                this.alertService.alertWarning(err.message)
              }
            });
          }
        },
        error: (err) => {
          this.alertService.alertDanger(err.message);
        }
      });

  }

  usernameFromService() {
    return this.currentUserService.getUsername()
  }
  pathUsername() {
    return this.route.snapshot.paramMap.get('username')
  }
  get notificationsAllowed(): string {
    if (this.userProfile) {
      return this.userProfile.notificationsAllowed ? 'Notifications are enabled' : 'Notifications are disabled';
    }
    return 'Error: user not present';
  }

  get firstName(): string {
    return this.userProfile ? this.userProfile.firstName : 'Error: user not present';
  }
  set firstName(value: string) {
    if (this.userProfile) {
      this.userProfile.firstName = value;
    }
  }
  get lastName(): string {
    return this.userProfile ? this.userProfile.lastName : 'Error: user not present';
  }
  set lastName(value: string) {
    if (this.userProfile) {
      this.userProfile.lastName = value;
    }
  }
  get email(): string {
    return this.userProfile ? this.userProfile.email : 'Error: user not present';
  }
  set email(value: string) {
    if (this.userProfile) {
      this.userProfile.email = value;
    }
  }
  get username(): string {
    return this.userProfile ? this.userProfile.username : 'Error: user not present';
  }
  set username(value: string) {
    if (this.userProfile) {
      this.userProfile.username = value;
    }
  }

  updateProfile() {
    if (confirm('Warning: this action will log you out!')) {
      if (this.userProfile) {
        this.currentUserService.updateMe(this.userProfile).subscribe({
          complete: () => {

          },
          error: (error) => {
            this.alertService.alertDanger(error.message);
          },
          next: () => {
            this.alertService.alertSuccess('Profile successfully updated!');
            this.currentUserService.logout();
          }
        });
      }
    }

  }
  deleteProfile() {
    if (confirm('Warning: this action will log you out and you won\'t be able to access your account again!')) {
      if (this.userProfile) {
        this.currentUserService.deleteMe().subscribe({
          complete: () => {

          },
          error: (error) => {
            this.alertService.alertDanger(error.message);
          },
          next: () => {
            this.alertService.alertSuccess('Profile deleted successfully');
            this.currentUserService.logout();
          }
        });
      }
    }

  }
  changePassword() {
    if (confirm('Warning: this action will log you out!')) {
      if (this.userProfile) {
        this.currentUserService.changeMyPassword(this.oldPassword, this.newPassword, this.repeatNewPassword).subscribe({
          complete: () => { },
          error: (error) => {
            this.alertService.alertDanger(error.message);
          },
          next: () => {
            this.alertService.alertSuccess('Password updated successfully.');
            this.currentUserService.logout();
          }
        });
      }
    }
  }
  switchNotifications() {
    this.currentUserService.toggleMyNotifications().subscribe({
      error: (err) => {
        this.alertService.alertDanger(err.message);
      },
      next: () => {
        if (this.userProfile) {
          this.userProfile.notificationsAllowed = !this.userProfile.notificationsAllowed;
        }
      }
    })

  }

}
