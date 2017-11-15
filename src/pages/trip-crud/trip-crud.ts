import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { TripServiceProvider } from './../../providers/trip-service/trip-service';
import { Observable } from 'rxjs/Observable';
import { AddContributorsPage } from '../add-contributors/add-contributors'

@IonicPage()
@Component({
  selector: 'page-trip-crud',
  templateUrl: 'trip-crud.html',
})
export class TripCrudPage {

  trips: Observable<any>;
  temp;
  constructor(public navCtrl: NavController, public navParams: NavParams, public tripService: TripServiceProvider, public alertCtrl: AlertController) {
    this.loadTrips();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TripCrudPage');
  }
  tripinfo(tripId){
    // console.log("sending Id from Trips",typeof(tripId));
    this.navCtrl.push(AddContributorsPage,{id:tripId});
  }

  loadTrips() {
    this.trips = this.tripService.getTrips();
    this.trips.subscribe((val) => {
      console.log(val);
      this.temp = val;
      console.log("Trips in temp inside subscribe", this.temp);
    });
  };

  createTrip() {
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
  };

  removeTrip(id) {
    this.tripService.deleteTrip(id).subscribe(data => {
      this.loadTrips();
    })
  };

}
