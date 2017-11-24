import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { TripServiceProvider } from './../../providers/trip-service/trip-service';
import { Observable } from 'rxjs/Observable';
import { TripCalculationProvider } from './../../providers/trip-calculation/trip-calculation';
import { DashboardPage } from './../dashboard/dashboard'


@IonicPage()
@Component({
  selector: 'page-trip-log',
  templateUrl: 'trip-log.html',
})
export class TripLogPage {

  trips: Observable<any>;
  temp;
  tripid: string;
  tripName: string;
  expence: number;
  contri: number;
  perHead: number;
  logs;
  checkContri: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public tripService: TripServiceProvider, public alertCtrl: AlertController, public calculations: TripCalculationProvider) {
    this.tripid = this.navParams.get("id");
    this.loadContributors();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TripLogPage');
  }

  navToDashboard() {
    // console.log("sending Id from Trips",typeof(tripid));
    this.navCtrl.push(DashboardPage, { id: this.tripid });
  }

  loadContributors() {
    console.log("Id getting from last page", this.tripid);
    this.trips = this.tripService.getTrip(this.tripid);
    this.trips.subscribe((val) => {
      // console.log(val);
      this.temp = val;
      this.tripName = this.temp[0].tripName;
      this.expence = this.temp[0].fund.expence;
      this.contri = this.temp[0].fund.contribution;
      this.perHead = this.temp[0].fund.perHead;
      if (this.contri <= 0) {
        this.checkContri = true;
      };
      this.logs = this.temp[0].log;
      console.log("conti amt page, users:", this.temp);
    });
  };

  removeLog(logId, logAmount) {
    let logToDeleteData = {
      logId: logId,
      logAmount: this.calculations.expenceAfterDeletingLog(this.expence, logAmount),
      contriAfterDeletingLog: this.calculations.contriAfterDeletingLog(this.contri, logAmount)
    };
    this.tripService.deletelog(this.tripid, logToDeleteData).subscribe(data => {
      this.loadContributors();
    })
  };

}
