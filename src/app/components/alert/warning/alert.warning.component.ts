import { Component, Input, OnDestroy } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-alert-warning',
  templateUrl: './alert.warning.component.html',
  styleUrls: ['./alert.warning.component.css']
})
export class AlertWarningComponent implements OnDestroy {

  @Input() message: string = '';

  constructor(private alertService: AlertService) {

  }

  ngOnDestroy(): void {
		this.alertService.clear();
	}
}
