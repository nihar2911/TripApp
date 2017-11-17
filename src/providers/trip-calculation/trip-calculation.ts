// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


@Injectable()
export class TripCalculationProvider {
  contri: number;
  constructor() {
    console.log('Hello TripCalculationProvider Provider');

  }

  contributionCal(userArray) {
    // console.log("user Array in service: ", userArray[0].paidInCountri, userArray[1].paidInCountri, userArray.length);
    this.contri = 0;
    for (let i = 0; i < userArray.length; i++) {
      this.contri = this.contri + userArray[i].paidInCountri;
      console.log("Contri = ", this.contri);
    }
    return this.contri;
  }
  perHeadCal(userArray, contri) {
     console.log(contri / userArray.length); 
     return (contri / userArray.length)
  }

}
