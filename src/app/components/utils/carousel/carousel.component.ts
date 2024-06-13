import { Component, Input } from '@angular/core';
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
      throw new Error("Having both: photos and image data is not supported!");
    }
    for (let i = 0; i < this.photos.length; i++) {
      this.show.push(i === 0);
    }
    for (let i = 0; i < this.urls.length; i++) {
      this.show.push(i === 0);
    }
  }
}
