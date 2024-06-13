import { Component } from '@angular/core';
import { CurrentUserService } from 'src/app/services/current-user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private currentUserService: CurrentUserService) {
    
  }

}
