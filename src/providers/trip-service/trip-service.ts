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
    console.log("Data getting", data);
    var sendingData, dataIdentifer;
    if (data.username) {
      dataIdentifer = data.username;
    } else if (data.amount) {
      dataIdentifer = data.amount;
    }
    switch (dataIdentifer) {
      case data.username:
        var newUser = {
          "username": data.username,
          "TakeFromContri": data.TakeFromContri,
          "paidInCountri": data.paidInCountri,
          "totalContri": data.totalContri,
          "perHead": data.perHead
        };
        sendingData = newUser;
        break;
      case data.amount:
        sendingData = {
          amount: data.amount,
          thingOrItem: data.thingOrItem,
          expence: data.expence,
          contri: data.contri
        };
        console.log(sendingData);
        break;
    }
    // console.log("data sending from trip service and ID ", sendingData, tripId);
    return this.http.put(this.apiUrl + 'trips/' + tripId, sendingData).map(response => response.json().result);
  }

  public deleteTrip(tripId) {
    return this.http.delete(this.apiUrl + 'trips/' + tripId).map(response => response.json().result);
  }

  public deleteContributor(tripId, userToDeleteData) {
    console.log("tirpID=",tripId + " userID=", userToDeleteData);
    return this.http.put(this.apiUrl + 'trips/' + tripId, userToDeleteData).map(response => response.json().result);
  }

  public updateContri(tripId, contri, perHead, userId, userContri) {
    // console.log(tripId, contri, perHead, userId, userContri);
    return this.http.put(this.apiUrl + 'trips/' + tripId, { contribution: contri, perHead, userId, userContri }).map(response => response.json().result);
  }

  public deletelog(tripId, logData){
    console.log("log which you want to delete", logData);
    return this.http.put(this.apiUrl + 'trips/' + tripId, logData).map(response => response.json().result);
  }
}
