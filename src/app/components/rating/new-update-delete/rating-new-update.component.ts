import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observer } from 'rxjs';
import { Lodge } from 'src/app/model/lodge/lodge';
import { HostRating } from 'src/app/model/rating/host-rating';
import { HostRatingCreateRequest } from 'src/app/model/rating/host-rating-create-request';
import { HostRatingUpdateRequest } from 'src/app/model/rating/host-rating-update-request';
import { LodgeRating } from 'src/app/model/rating/lodge-rating';
import { LodgeRatingUpdateRequest } from 'src/app/model/rating/lodge-rating-update-request';
import { LodgeRatingCreateRequest } from 'src/app/model/rating/lodge_rating-create.request';
import { AlertService } from 'src/app/services/alert.service';
import { LodgingService } from 'src/app/services/lodging.service';
import { RatingService } from 'src/app/services/rating.service';

@Component({
  selector: 'app-rating-new-update',
  templateUrl: './rating-new-update.component.html',
  styleUrls: ['./rating-new-update.component.css']
})
export class RatingNewUpdateComponent implements OnInit {
  hostId: string = '';
  lodgeId: string = '';

  myHostRating: HostRating = new HostRating();
  myLodgeRating: LodgeRating = new LodgeRating();

  constructor(private ratingService: RatingService, private alertService: AlertService,
    private lodgingService: LodgingService, private route: ActivatedRoute) {}

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('lodgeId');
    if (id !== null)
      this.lodgingService.get(id).subscribe({
      error: (error) => {
        this.alertService.alertDanger(error.message);
      },
      next: (response) => {
        this.hostId = response.ownerId;
        this.lodgeId = response.id;
        this.ratingService.getHostRatingsByMe(this.hostId).subscribe({
          next: (response) => {
            this.myHostRating = response.length === 0 ? new HostRating() : response[0];
          }
        });
        this.ratingService.getLodgeRatingsByMe(this.lodgeId).subscribe({
          next: (response) => {
            this.myLodgeRating = response.length === 0 ?new LodgeRating() : response[0];
          }
        });
      }
    });
  }
  saveNewHostRating() {
    if (this.myHostRating.id === '') {
      if (this.myHostRating.rating === 0) {
        this.alertService.alertInfo('You must pick a rating before saving');
        return;
      }
      let crRequest: HostRatingCreateRequest = {
        rating: this.myHostRating.rating,
        comment: '',
        hostId: this.hostId
      }
      this.ratingService.createHostRating(crRequest).subscribe({
        next: (response) => {
          this.myHostRating = response;
          this.alertService.alertSuccess('Rating saved');
        },
        error: (_) => {
          this.alertService.alertWarning('You can\'t rate a host with whom you didn\'t have a reservation');
        }
      });
    } else {
      if (this.myHostRating.rating === 0) {
        this.ratingService.deleteHostRating(this.myHostRating.id).subscribe({
          next: (_) => {
            this.myHostRating = new HostRating();
            this.alertService.alertSuccess('Rating removed');
          },
          error: (err) => {
            this.alertService.alertWarning(err.message);
          }
        });
      } else {
        let hostReq: HostRatingUpdateRequest = {
          rating: this.myHostRating.rating,
          comment: ''
        }
        this.ratingService.updateHostRating(this.myHostRating.id, hostReq).subscribe({
          next: (response) => {
            this.myHostRating = response;
            this.alertService.alertSuccess('Rating updated');
          },
          error: (err) => {
            this.alertService.alertWarning(err.message);
          }
        });
      }
    }
  }
  saveNewLodgeRating() {
    if (this.myLodgeRating.id === '') {
      if (this.myLodgeRating.rating === 0) {
        this.alertService.alertInfo('You must pick a rating before saving');
        return;
      }
      let crRequest: LodgeRatingCreateRequest = {
        rating: this.myLodgeRating.rating,
        comment: '',
        hostId: this.hostId,
        lodgeId: this.lodgeId
      }
      this.ratingService.createLodgeRating(crRequest).subscribe({
        next: (response) => {
          this.myLodgeRating = response;
          this.alertService.alertSuccess('Rating saved');
        },
        error: (err) => {
          this.alertService.alertWarning('You cannot rate a lodge in which you didn\'t have a reservation');
        }
      });
    } else {
      if (this.myLodgeRating.rating === 0) {
        this.ratingService.deleteLodgeRating(this.myLodgeRating.id).subscribe({
          next: (_) => {
            this.myLodgeRating = new LodgeRating();
            this.alertService.alertSuccess('Rating removed');
          },
          error: (err) => {
            this.alertService.alertWarning(err.message);
          }
        });
      } else {
        let lodgeReq: LodgeRatingUpdateRequest = {
          rating: this.myLodgeRating.rating,
          comment: ''
        }
        this.ratingService.updateLodgeRating(this.myLodgeRating.id, lodgeReq).subscribe({
          next: (response) => {
            this.myLodgeRating = response;
            this.alertService.alertSuccess('Rating updated');
          },
          error: (err) => {
            this.alertService.alertWarning(err.message);
          }
        });
      }
    }
  }

}
