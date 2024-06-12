import { Injectable, TemplateRef, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Alert {
	template: TemplateRef<any>;
	classname?: string,
	delay?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {
	private alertMessageSubject = new BehaviorSubject<string>('');
	alertMessage$ = this.alertMessageSubject.asObservable();

	successAlertTemplate?: TemplateRef<any>;
	dangerAlertTemplate?: TemplateRef<any>;
	warningAlertTemplate?: TemplateRef<any>;
	infoAlertTemplate?: TemplateRef<any>;
  
	setAlertMessage(message: string) {
		this.alertMessageSubject.next(message);
	}
  
	setTemplates(success: TemplateRef<any>, danger: TemplateRef<any>, warning: TemplateRef<any>, info: TemplateRef<any>) {
		this.successAlertTemplate = success;
		this.dangerAlertTemplate = danger;
		this.warningAlertTemplate = warning;
		this.infoAlertTemplate = info;
	}

	constructor() { }

	alerts: Alert[] = [];

	public show(alert: Alert) {
		this.alerts.push(alert);
	}

	remove(alert: Alert) {
		this.alerts = this.alerts.filter((t) => t !== alert);
	}

	clear() {
		this.alerts.splice(0, this.alerts.length);
	}

	public alertSuccess(message: string) {
		this.setAlertMessage(message);
		let template = this.successAlertTemplate as TemplateRef<any>;
		this.show({ template, classname: 'bg-transparent', delay: 5000 });
	}
	public alertDanger(message: string) {
		if (message === '') {
			message = 'Unknown error occured.';
		}
		this.setAlertMessage(message);
		let template = this.dangerAlertTemplate as TemplateRef<any>;
		this.show({ template, classname: 'bg-transparent', delay: 5000 });
	}
	public alertInfo(message: string) {
		this.setAlertMessage(message);
		let template = this.infoAlertTemplate as TemplateRef<any>;
		this.show({ template, classname: 'bg-transparent', delay: 5000 });
	}
	public alertWarning(message: string) {
		this.setAlertMessage(message);
		let template = this.warningAlertTemplate as TemplateRef<any>;
		this.show({ template, classname: 'bg-transparent', delay: 5000 });
	}

}
