import { Component } from '@angular/core';

@Component({
  selector: 'app-lodging-list',
  templateUrl: './lodging-list.component.html',
  styleUrls: ['./lodging-list.component.css']
})
export class LodgingListComponent {

  randomSeed() {
    return Math.random() * 1000;
  }

}
