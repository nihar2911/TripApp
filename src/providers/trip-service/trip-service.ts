import { AppSettingProvider } from '../app-setting/app-setting';
// import { HttpModule } from '@angular/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class TripServiceProvider {

  apiUrl = this.appSetting.getApiURL();
  constructor(public http: Http, public appSetting: AppSettingProvider) { }

  public getTrips() {
    return this.http.get(this.apiUrl + 'trips').map(response => response.json().result);
  }


  public addTrip(newTrip) {
    return this.http.post(this.apiUrl + 'trips', { 'text': newTrip }).map(response => response.json().result);
  }

  public deleteTrip(tripId) {
    return this.http.delete(this.apiUrl + 'trips/' + tripId).map(response => response.json().result);
  }

}
