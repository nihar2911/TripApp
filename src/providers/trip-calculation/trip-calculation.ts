// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';


@Injectable()
export class TripCalculationProvider {
  contri: number;
  constructor() {
  }

  contributionCal(userArray) {
    // console.log("user Array in service: ", userArray[0].paidInCountri, userArray[1].paidInCountri, userArray.length);
    this.contri = 0;
    for (let i = 0; i < userArray.length; i++) {
      this.contri = this.contri + userArray[i].paidInCountri;
    }
    return this.contri;
  };

  perHeadCal(userArray, contri) {
    return (contri / userArray.length)
  }
  contriAddtionOfUser(oldContri, newContri) {
    let newcontri = Number(newContri);
    console.log(typeof (oldContri), typeof (newcontri), oldContri + newcontri);
    return oldContri + newcontri;
  }
  totalContriAddtion(nowContri, contriAfterUserAdds){
   let NC= Number(nowContri);
   let CAUA = Number(contriAfterUserAdds);
   return NC+CAUA;
  }
}
