import { Component, Input, OnDestroy, TemplateRef } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { AlertContainerComponent } from '../container/alert-container.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alert-info',
  templateUrl: './alert.info.component.html',
  styleUrls: ['./alert.info.component.css']
})
export class AlertInfoComponent implements OnDestroy {

  @Input() message: string = '';

  constructor(private alertService: AlertService) {

  }

  ngOnDestroy(): void {
		this.alertService.clear();
	}
}
