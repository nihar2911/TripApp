import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { TripServiceProvider } from './../../providers/trip-service/trip-service';
import { Observable } from 'rxjs/Observable';
import { TripCalculationProvider } from './../../providers/trip-calculation/trip-calculation';

@IonicPage()
@Component({
  selector: 'page-contribution-ammount',
  templateUrl: 'contribution-ammount.html',
})
export class ContributionAmmountPage {
  trips: Observable<any>;
  temp;
  tripid;
  users;
  contribution;
  perHead;
  constructor(public navCtrl: NavController, public navParams: NavParams, public tripService: TripServiceProvider, public alertCtrl: AlertController, public calculations: TripCalculationProvider) {
    this.tripid = this.navParams.get("id");
    this.loadContributors();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContributionAmmountPage');
  }

  loadContributors() {
    console.log("Id getting from last page", this.tripid);
    this.trips = this.tripService.getTrip(this.tripid);
    this.trips.subscribe((val) => {
      // console.log(val);
      this.temp = val;
      this.users = this.temp[0].users;
      this.contribution = this.calculations.contributionCal(this.users);
      this.perHead = this.calculations.perHeadCal(this.users, this.contribution);      
      console.log("conti amt page, users:", this.users);
    });
  };

  updateContri() {
    this.tripService.updateContri(this.tripid, this.contribution, this.perHead).subscribe(data => {
      this.loadContributors();
    });
  }
}
