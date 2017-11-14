import { TripServiceProvider } from './../../providers/trip-service/trip-service';
import { Component } from '@angular/core';
import { NavController, AlertController, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
// import { AddContributorsPage } from '../add-contributors/add-contributors'
import { TripCrudPage } from './../trip-crud/trip-crud';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  trips: Observable<any>;
  temp: any;
  constructor(public navCtrl: NavController, public TripServiceProvider: TripServiceProvider, public alertCtrl: AlertController, public toastCtrl: ToastController) {
    this.loadTrips();
  }
  tripCrudPage(){
    this.navCtrl.push(TripCrudPage);
  }
  loadTrips() {
    this.trips = this.TripServiceProvider.getTrips();
    this.trips.subscribe((val) => {
      // console.log(val);
      this.temp = val;
    });
    // console.log("Trips", this.trips);
    // console.log("Trips in temp", this.temp);
  }

  addTrip() {
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
            this.TripServiceProvider.addTrip(data.text).subscribe(data => {
              this.showToast(data);
              this.loadTrips();
            });
          }
        }
      ]
    });

    prompt.present();
  }

  removeTrip(id) {
    this.TripServiceProvider.deleteTrip(id).subscribe(data => {
      this.showToast(data);
      this.loadTrips();
    })
  }

  private showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
}
