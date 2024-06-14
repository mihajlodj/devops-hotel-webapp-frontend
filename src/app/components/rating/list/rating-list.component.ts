import { Component, OnInit } from '@angular/core';
import { Lodge } from 'src/app/model/lodge/lodge';
import { HostRating } from 'src/app/model/rating/host-rating';
import { LodgeRating } from 'src/app/model/rating/lodge-rating';
import { User } from 'src/app/model/user/user';
import { AlertService } from 'src/app/services/alert.service';
import { LodgingService } from 'src/app/services/lodging.service';
import { RatingService } from 'src/app/services/rating.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-rating-list',
  templateUrl: './rating-list.component.html',
  styleUrls: ['./rating-list.component.css']
})
export class RatingListComponent implements OnInit{

  hostsRatings: HostRating[] = [];
  lodgesRatings: LodgeRating[] = [];

  ratedHosts: { [ratingId: string]: User } = {};

  object: Object = new Object();
  lodges: { [ratingId: string]: Lodge } = {};

  constructor(private ratingService: RatingService, private alertService: AlertService,
    private lodgingService: LodgingService, private userService: UserService) {}

  ngOnInit(): void {
    this.ratingService.getHostRatingsByMe(null).subscribe({
      next: (response) => {
        this.hostsRatings = response;
        this.hostsRatings.forEach(el => {
          this.userService.getById(el.hostId).subscribe({
            next: (response) => {
              this.ratedHosts[el.id] = response;
            },
            error: (err) => {
              this.alertService.alertDanger(err.message);
            }
          })
        })
      }
    });
    this.ratingService.getLodgeRatingsByMe(null).subscribe({
      next: (response) => {
        this.lodgesRatings = response;
        this.lodgesRatings.forEach(el => {
          this.lodgingService.get(el.lodgeId).subscribe({
            next: (lodge) => {
              this.lodges[el.id] = lodge;
            },
            error: (err) => {
              this.alertService.alertDanger(err.message);
            }
          })
        })
      },
      error: (err) => {
        this.alertService.alertDanger(err.message);
      }
    }); 
  }

  averageLodgeRatingGiven() {
    let length = this.lodgesRatings.length;
    if (length === 0) {
      return 'No ratings yet'
    }
    let score = 0;
    this.lodgesRatings.forEach(e => {
      score += e.rating;
    });
    return score / length;
  }
  averageHostRatingGiven() {
    let length = this.hostsRatings.length;
    if (length === 0) {
      return 'No ratings yet'
    }
    let score = 0;
    this.hostsRatings.forEach(e => {
      score += e.rating;
    });
    return score / length;
  }


  removeLodgeRating(ratingId: string) {
    this.ratingService.deleteLodgeRating(ratingId).subscribe({
      next: (_) => {
        this.lodgesRatings = this.lodgesRatings.filter(e => e.id !== ratingId);
        this.alertService.alertSuccess('Rating removed');
      },
      error: (err) => {
        this.alertService.alertWarning(err.message);
      }
    });
  }
  removeHostRating(ratingId: string) {
    this.ratingService.deleteHostRating(ratingId).subscribe({
      next: (_) => {
        this.hostsRatings = this.hostsRatings.filter(e => e.id !== ratingId);
        this.alertService.alertSuccess('Rating removed');
      },
      error: (err) => {
        this.alertService.alertWarning(err.message);
      }
    });
  }

}
