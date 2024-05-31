import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrentUserService } from 'src/app/services/current-user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  constructor(private router: ActivatedRoute, private currentUserService: CurrentUserService) {

  }
  username() {
    return this.currentUserService.getUsername()
  }
  pathUsername() {
    return this.router.snapshot.paramMap.get('username')
  }
}
