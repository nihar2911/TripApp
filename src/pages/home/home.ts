import { TripServiceProvider } from './../../providers/trip-service/trip-service';
import { Component } from '@angular/core';
import { NavController, AlertController, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  trips: Observable<any>;
  constructor(public navCtrl: NavController, public TripServiceProvider: TripServiceProvider, public alertCtrl: AlertController, public toastCtrl: ToastController) {
    this.loadTrips();
  }

  loadTrips() {
    this.trips = this.TripServiceProvider.getTrips();
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
