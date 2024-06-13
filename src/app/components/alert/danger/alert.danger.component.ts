import { Component, Input, OnDestroy, TemplateRef } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-alert-danger',
  templateUrl: './alert.danger.component.html',
  styleUrls: ['./alert.danger.component.css']
})
export class AlertDangerComponent implements OnDestroy {

  @Input() message: string = '';

  constructor(private alertService: AlertService) {

  }

  ngOnDestroy(): void {
		this.alertService.clear();
	}

}
