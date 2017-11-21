import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { TripServiceProvider } from './../../providers/trip-service/trip-service';
import { Observable } from 'rxjs/Observable';
import { TripCalculationProvider } from './../../providers/trip-calculation/trip-calculation';
import { ContributionAmmountPage } from './../contribution-ammount/contribution-ammount'

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

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
    console.log('ionViewDidLoad DashboardPage');
  }

  contiInfo() {
    // console.log("sending Id from Trips",typeof(tripid));
    this.navCtrl.push(ContributionAmmountPage, { id: this.tripid });
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


  addLog(logId) {
    if (this.checkContri) {
      let prompt = this.alertCtrl.create({
        title: "Please add Contribution",
        subTitle: "You must add contribution to add an expence. Paisa honga tabhi kharcha karegana patthe.",
        buttons: [
          {
            text: 'Hum Bhikari',
            role: 'cancle'
          },
          {
            text: "hao dalta",
            handler: data => {
              this.contiInfo()
            }

          }
        ]
      });
      prompt.present();
    } else {
      let prompt = this.alertCtrl.create({
        title: "New log for " + logId,
        inputs: [
          {
            name: 'amount',
            placeholder: 'Amount',
            type: 'number'
          },
          {
            name: 'thingItem',
            value: logId
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
                let amount = Number(data.amount);
                let contriAfterLog = this.calculations.contriAfterLog(this.contri, amount);
                let expenceAfterLog = this.calculations.expenceAfterLog(this.expence, amount);
                let logData = {
                  amount: data.amount,
                  thingOrItem: data.thingItem,
                  expence: expenceAfterLog,
                  contri: contriAfterLog
                };
                this.tripService.updateTrip(this.tripid, logData).subscribe(data => {
                  this.loadContributors();
                });
              }
            }
          ]
      });
      prompt.present();
    }
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
