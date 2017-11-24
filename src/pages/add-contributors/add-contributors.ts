import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { TripServiceProvider } from './../../providers/trip-service/trip-service';
import { Observable } from 'rxjs/Observable';
import { ContributionAmmountPage } from "../contribution-ammount/contribution-ammount";
import { TripCalculationProvider } from './../../providers/trip-calculation/trip-calculation';




@IonicPage()
@Component({
  selector: 'page-add-contributors',
  templateUrl: 'add-contributors.html',
})
export class AddContributorsPage {

  trips: Observable<any>;
  temp;
  tripid;
  users;
  userAmount;
  contribution;
  constructor(public navCtrl: NavController, public navParams: NavParams, public tripService: TripServiceProvider, public alertCtrl: AlertController, public calculations: TripCalculationProvider) {
    this.tripid = this.navParams.get("id");
    this.loadContributors();
  }
  // Views
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddContributorsPage');
  };
  contiInfo() {
    // console.log("sending Id from Trips",typeof(tripid));
    this.navCtrl.push(ContributionAmmountPage, { id: this.tripid });
  }

  loadContributors() {
    console.log("Id getting from last page", this.tripid);
    this.trips = this.tripService.getTrip(this.tripid);
    this.trips.subscribe((val) => {
      console.log(val);
      this.temp = val;
      this.users = this.temp[0].users;
      this.contribution = this.temp[0].fund.contribution;
      console.log("Trips in temp inside subscribe", typeof (this.temp), this.contribution);
    });
  };

  addTripContributor(id) {
    let prompt = this.alertCtrl.create({
      title: "Add Contributor",
      inputs: [
        {
          name: 'contributor',
          placeholder: 'Add New Contributor'
        },
        // {
        //   name: 'contributorsAmount',
        //   placeholder: 'Add Contribution',
        //   type: 'number'
        // },
      ],
      buttons:
        [
          {
            text: 'Cancle'
          },
          {
            text: 'Save',
            handler: data => {
              let TakeFromContri: number = 0;
              let paidInCountri: number = 0;
              let totalContri = this.calculations.contriAddtionOfUser(this.contribution, data.contributorsAmount);
              let perHead = this.calculations.perHeadCal(this.users, totalContri);
              let inputData = { perHead: perHead, totalContri: totalContri, username: data.contributor, paidInCountri: paidInCountri, TakeFromContri: TakeFromContri };
              this.tripService.updateTrip(id, inputData).subscribe(data => {
                this.loadContributors();
              });
            }
          }
        ]
    });
    prompt.present();
  };

  removeContributor(userId, UserAmount) {
    let userToDeleteData = {
      userId: userId,
      contriAfterDeletingUser: this.calculations.contriAfterDeletingUser(this.contribution, UserAmount)
    };
    this.tripService.deleteContributor(this.tripid, userToDeleteData).subscribe(data => {
      this.loadContributors();
    })
  };
}
