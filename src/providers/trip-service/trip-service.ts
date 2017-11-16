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
  public getTrip(tripId) {
    return this.http.get(this.apiUrl + 'trips/' + tripId).map(response => response.json().result);
  }

  public addTrip(newTripName) {
    var newTrip = {
      "tripName": newTripName,
      "fund": {
        "contribution": 0,
        "expence": 0,
        "perHead": 0
      }
    };
    return this.http.post(this.apiUrl + 'trips', newTrip).map(response => response.json().result);
  }

  public updateTrip(tripId, data) {
    var sendingData, dataIdentifer;
    if (data.username) {
      dataIdentifer = data.username;
    }
    switch (dataIdentifer) {
      case data.username:
        var newUser = {
          "username": data.username,
          "TakeFromContri": data.TakeFromContri,
          "paidInCountri": data.paidInCountri
        };
        sendingData = newUser;
        break;
    }
    console.log("data sending from trip service and ID ", sendingData, tripId);
    return this.http.put(this.apiUrl + 'trips/' + tripId, sendingData).map(response => response.json().result);
  }

  public deleteTrip(tripId) {
    return this.http.delete(this.apiUrl + 'trips/' + tripId).map(response => response.json().result);
  }

  public deleteContributor(tripId, userId) {
    // console.log("tirpID=",tripId + " userID=", userId)
    return this.http.put(this.apiUrl + 'trips/' + tripId, {_id:userId}).map(response => response.json().result);
  }

}
