import { Component } from '@angular/core';
import { SearchService } from '../services/search.service';
import { LodgeSearchRequest } from '../model/lodge/lodge-search-request';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  
  dateFrom: string = '';
  dateTo: string = '';
  guestNumber: number | undefined;
  location: string = '';

  constructor(private router: Router) {

  }

  search() {
    let searchRequest: LodgeSearchRequest = new LodgeSearchRequest(this.dateFrom, this.dateTo, this.guestNumber, this.location);
    this.router.navigate([`/search`], {
      queryParams: searchRequest
    });
  }
}
