import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TripServiceProvider } from './../../providers/trip-service/trip-service';
import { Observable } from 'rxjs/Observable';



@IonicPage()
@Component({
  selector: 'page-add-contributors',
  templateUrl: 'add-contributors.html',
})
export class AddContributorsPage {

  trips: Observable<any>;
  temp;
  constructor(public navCtrl: NavController, public navParams: NavParams, public tripService: TripServiceProvider) {
    this.loadTrips();
  }
  // Views
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddContributorsPage');
  };

  loadTrips() {
    this.trips = this.tripService.getTrips();
    this.trips.subscribe((val) => {
      console.log(val);
      this.temp = val;
      console.log("Trips in temp inside subscribe", this.temp);
    });
  };

  createTrip(){
    
  }
}
