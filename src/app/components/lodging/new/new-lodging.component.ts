import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Lodge } from 'src/app/model/lodge/lodge';
import { RequestForReservationApprovalType } from 'src/app/model/lodge/request-for-approval';
import { AlertService } from 'src/app/services/alert.service';
import { LodgingService } from 'src/app/services/lodging.service';

@Component({
  selector: 'app-new-lodging',
  templateUrl: './new-lodging.component.html',
  styleUrls: ['./new-lodging.component.css']
})
export class NewLodgingComponent {

  urls: string[] = [];
  files: File[] = [];
  show: boolean[] = [];

  location: string = '';
  name: string = '';
  amenities: string = '';
  minimalGuestNumber: number = 1;
  maximalGuestNumber: number = 1;
  approvalType: RequestForReservationApprovalType = RequestForReservationApprovalType.AUTOMATIC;
  constructor(private lodgingService: LodgingService, private router: Router, private alertService: AlertService) {
    this.urls = [];
  }
  uploadImage(event: any) {
    let photos = event.target.files;
    this.files.push(photos[0]);
    const mimeType = photos[0].type;
    if (mimeType.match(/image\/*/) == null) {
        this.alertService.alertInfo("Only images are supported.");
        return;
    }

    const reader = new FileReader();
    this.show.push(this.show.length === 0);

    reader.readAsDataURL(photos[0]);
    reader.onload = (_event) => {
      this.urls.push(reader.result ? reader.result.toString() : 'None');
      let newArr: string[] = [];
      this.urls.forEach((element: string) => {
        newArr.push(element);
      });
      this.urls = newArr;
    }
  }

  showNext() {
    for (let i = 0; i < this.show.length; i++) {
      if (this.show[i] === true) {
        if (i < this.show.length - 1) { // not last photo
          this.show[i+1] = true;
          this.show[i] = false;
        }
      }
    }
  }

  showPrevious() {
    for (let i = 0; i < this.show.length; i++) {
      if (this.show[i] === true) {
        if (i > 0) { // not first photo
          this.show[i] = false;
          this.show[i-1] = true;
        }
      }
    }
  }

  updateGuestNumber() {
    if (this.minimalGuestNumber < 1) {
      this.minimalGuestNumber = 1;
    }
    if (this.maximalGuestNumber < 1) {
      this.maximalGuestNumber = 1;
      this.minimalGuestNumber = 1;
    }
    if (this.minimalGuestNumber > this.maximalGuestNumber) {
      this.maximalGuestNumber = this.minimalGuestNumber;
    }
  }

  switchApprovalType() {
    if (this.approvalType === RequestForReservationApprovalType.AUTOMATIC) {
      this.approvalType = RequestForReservationApprovalType.MANUAL;
    } else {
      this.approvalType = RequestForReservationApprovalType.AUTOMATIC;
    }
  }
  approvalToString() {
    return this.approvalType === RequestForReservationApprovalType.MANUAL ? 'Reservation requries your manual approval' : 'Reservation approval is granted automatically by the system';
  }
  approvalTypeIsAutomatic() {
    return this.approvalType === RequestForReservationApprovalType.AUTOMATIC;
  }

  create() {
    if (this.minimalGuestNumber > this.maximalGuestNumber) {
      this.alertService.alertInfo('Lowest number of guests can\'t be higher than highest');
      return;
    }
    let newLodge = {
      name: this.name,
      location: this.location,
      amenities: this.amenities.split(';'),
      minimalGuestNumber: this.minimalGuestNumber,
      maximalGuestNumber: this.maximalGuestNumber,
      approvalType: this.approvalType,
    }
    
    let formData = new FormData();
    formData.append('lodgeCreateRequest', new Blob([JSON.stringify(newLodge)], {type: 'application/json'}));
    for (let i = 0; i < this.files.length; i++) {
      formData.append('photos', this.files[i], this.files[i].name);
    }
    this.lodgingService.create(formData).subscribe({
      next: () => {
        this.alertService.alertSuccess("Lodge created successfully.");
        this.router.navigate(['']);
      },
      error: (err) => {
        this.alertService.alertDanger(err.message);
      }
    })
  }
}
