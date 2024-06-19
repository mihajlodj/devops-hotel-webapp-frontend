import { Component, OnInit, inject } from '@angular/core';
import { LodgeSearchRequest } from 'src/app/model/lodge/lodge-search-request';
import { Router } from '@angular/router';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  calendar = inject(NgbCalendar);
	formatter = inject(NgbDateParserFormatter);

  guestNumber: number | undefined;
  location: string | null = null;

  hoveredDate: NgbDate | null = null;
	dateFrom: NgbDate | null = this.calendar.getToday();
	dateTo: NgbDate | null = this.calendar.getNext(this.calendar.getToday(), 'd', 10);

	onDateSelection(date: NgbDate) {
		if (!this.dateFrom && !this.dateTo) {
			this.dateFrom = date;
		} else if (this.dateFrom && !this.dateTo && date && date.after(this.dateFrom)) {
			this.dateTo = date;
		} else {
			this.dateTo = null;
			this.dateFrom = date;
		}
	}

	isHovered(date: NgbDate) {
		return (
			this.dateFrom && !this.dateTo && this.hoveredDate && date.after(this.dateFrom) && date.before(this.hoveredDate)
		);
	}

	isInside(date: NgbDate) {
		return this.dateTo && date.after(this.dateFrom) && date.before(this.dateTo);
	}

	isRange(date: NgbDate) {
		return (
			date.equals(this.dateFrom) ||
			(this.dateTo && date.equals(this.dateTo)) ||
			this.isInside(date) ||
			this.isHovered(date)
		);
	}

	validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
		const parsed = this.formatter.parse(input);
		return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
	}

  constructor(private router: Router) {

  }
	ngOnInit(): void {
		this.dateFrom = null;
		this.dateTo = null;
	}

  search() {
    let searchRequest: LodgeSearchRequest = new LodgeSearchRequest(
      this.dateFrom ? this.dateToString(this.dateFrom) : null, 
      this.dateTo ? this.dateToString(this.dateTo) : null, 
      this.guestNumber, 
      this.location ? this.location : null);
    this.router.navigate([`/search`], {
      queryParams: searchRequest
    }).then(() => {
		window.location.reload();
	});
  }

  dateToString(date: NgbDate) {
	let month = `${date.month}`;
	if (date.month < 10) {
		month = '0' + month;
	}
	let day = `${date.day}`;
	if (date.day < 10) {
		day = '0' + day;
	}
    return `${date.year}-${month}-${day}T00:00:00.000000`
}
}
