import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Lodge } from 'src/app/model/lodge/lodge';
import { LodgingService } from 'src/app/services/lodging.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-lodging-list',
  templateUrl: './lodging-list.component.html',
  styleUrls: ['./lodging-list.component.css']
})
export class LodgingListComponent {
  photoUrlPrefix: string = environment.lodgePhotoUrl;
  lodges: Lodge[] = []
  constructor(private lodgingService: LodgingService, public router: Router) {

  }

  ngOnInit() {
    let url = this.router.url;
    let setLodges = {
      error: (error: any) => {
        alert(error.message);
      },
      next: (responseLodges: Lodge[]) => {
        this.lodges = responseLodges;
        console.log(this.lodges);
      }
    };
    if (url === '/' ) {
      this.lodgingService.getAll().subscribe(setLodges);
    } else if (url === '/myLodgings') {
      this.lodgingService.getMineAll().subscribe(setLodges);
    }
  }

  randomSeed() {
    return Math.random() * 1000;
  }

}
