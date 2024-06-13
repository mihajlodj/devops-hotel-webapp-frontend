import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Lodge } from 'src/app/model/lodge/lodge';
import { AlertService } from 'src/app/services/alert.service';
import { LodgingService } from 'src/app/services/lodging.service';
import { SearchService } from 'src/app/services/search.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-lodging-list',
  templateUrl: './lodging-list.component.html',
  styleUrls: ['./lodging-list.component.css']
})
export class LodgingListComponent {
  photoUrlPrefix: string = environment.lodgePhotoUrl;
  lodges: Lodge[] = []
  constructor(private lodgingService: LodgingService, 
    public router: Router, private searchService: SearchService, private alertService: AlertService) {

  }

  ngOnInit() {
    let url = this.router.url;
    let setLodges = {
      error: (error: any) => {
        this.alertService.alertDanger(error.message);
      },
      next: (responseLodges: Lodge[]) => {
        this.lodges = responseLodges;
      }
    };
    if (url === '/' ) {
      this.lodgingService.getAll().subscribe(setLodges);
    } else if (url === '/myLodgings') {
      this.lodgingService.getMineAll().subscribe(setLodges);
    } else if (url.startsWith('/search')) {
      this.searchService.get(url).subscribe(setLodges);
    }
  }

}
