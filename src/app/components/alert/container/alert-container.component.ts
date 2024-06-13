import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { NgTemplateOutlet } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/services/alert.service';

@Component({
	selector: 'app-alert-container',
	standalone: true,
	imports: [NgbToastModule, NgTemplateOutlet, NgFor],
	templateUrl: './alert-container.component.html',
	host: { class: 'toast-container position-fixed bottom-0 end-0 p-3', style: 'z-index: 1200' },
})
export class AlertContainerComponent {
	constructor(public alertService: AlertService) {
		
	}
}