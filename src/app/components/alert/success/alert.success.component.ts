import { Component, Input, OnDestroy, TemplateRef } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-alert-success',
  templateUrl: './alert.success.component.html',
  styleUrls: ['./alert.success.component.css']
})
export class AlertSuccessComponent implements OnDestroy {

  @Input() message: string = '';

  constructor(public alertService: AlertService) {

  }

  ngOnDestroy(): void {
		this.alertService.clear();
	}
}
