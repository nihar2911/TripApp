import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, public tripService: TripServiceProvider, public alertCtrl: AlertController) {
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
    let prompt = this.alertCtrl.create({
      title: "Add trip",
      inputs: [
        {
          name: 'text',
          placeholder: 'Name Your Trip'
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
            this.tripService.addTrip(data.text).subscribe(data => {
              this.loadTrips();
            });
          }
        }
      ]
    });

    prompt.present();
  }
}
