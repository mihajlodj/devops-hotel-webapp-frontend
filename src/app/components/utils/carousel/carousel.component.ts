import { Component, Input } from '@angular/core';
import { throwError } from 'rxjs';
import { Photo } from 'src/app/model/photo/photo';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {

  @Input() photos: Photo[] = [];
  @Input() urls: string[] = [];

  photoUrlPrefix: string = environment.lodgePhotoUrl;
  show: boolean[] = [];

  constructor() {
    
  }

  ngOnChanges() {
    this.setShowPhotoCarouselBooleans();
  } 

  setShowPhotoCarouselBooleans() {
    if (this.photos.length !== 0 && this.urls.length !== 0) {
      throw new Error("Having both: photos and image data not supported!");
      return;
    }
    for (let i = 0; i < this.photos.length; i++) {
      this.show.push(i === 0);
    }
    for (let i = 0; i < this.urls.length; i++) {
      this.show.push(i === 0);
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
}
