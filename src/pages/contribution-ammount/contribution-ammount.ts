import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { TripServiceProvider } from './../../providers/trip-service/trip-service';
import { Observable } from 'rxjs/Observable';
import { TripCalculationProvider } from './../../providers/trip-calculation/trip-calculation';
import { DashboardPage } from './../dashboard/dashboard';

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
  navToDashboard(){
    // console.log("sending Id from Trips",typeof(tripid));
    this.navCtrl.push(DashboardPage,{id:this.tripid});
  }

  loadContributors() {
    // console.log("Id getting from last page", this.tripid);
    this.trips = this.tripService.getTrip(this.tripid);
    this.trips.subscribe((val) => {
      // console.log(val);
      this.temp = val;
      this.users = this.temp[0].users;
      this.contribution = this.calculations.contributionCal(this.users);
      this.perHead = this.calculations.perHeadCal(this.users, this.contribution);
      // console.log("conti amt page, users:", this.users);
    });
  };

  updateContri(oldContri, userId) {
    let prompt = this.alertCtrl.create({
      title: "Add Contribution",
      inputs: [
        {
          name: 'contributorsAmount',
          placeholder: 'Add Contribution'
        },
      ],
      buttons:
        [
          {
            text: 'Cancle'
          },
          {
            text: 'Save',
            handler: data => {
              this.tripService.updateContri(
                this.tripid,
                this.calculations.totalContriAddtion(this.contribution, data.contributorsAmount),
                this.calculations.perHeadCal(this.users, this.calculations.totalContriAddtion(this.contribution, data.contributorsAmount)),
                userId,
                this.calculations.contriAddtionOfUser(oldContri, data.contributorsAmount))
                .subscribe(data => {
                  this.loadContributors();
                });
            }
          }
        ]
    });
    prompt.present();
  }
}
