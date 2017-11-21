import { Injectable } from '@angular/core';

@Injectable()
export class TripCalculationProvider {
  constructor() {
  }

  contributionCal(userArray) {
    let contri = 0;
    for (let i = 0; i < userArray.length; i++) {
      contri = contri + userArray[i].paidInCountri;
    }
    return contri;
  };

  perHeadCal(userArray, contri) {
    console.log("user array", userArray.length);
    console.log("user array", contri);
    return (contri / userArray.length)
  }
  contriAddtionOfUser(oldContri, newContri) {
    let newcontri = Number(newContri);
    return oldContri + newcontri;
  }
  totalContriAddtion(nowContri, contriAfterUserAdds) {
    let NC = Number(nowContri);
    let CAUA = Number(contriAfterUserAdds);
    return NC + CAUA;
  }
  contriAfterLog(oldContri, logAmount) {
    let OC = Number(oldContri);
    let LA = Number(logAmount);
    return OC - LA
  }
  expenceAfterLog(oldExpence, logAmount) {
    let OE = Number(oldExpence);
    let LA = Number(logAmount);
    return OE + LA
  }

  expenceAfterDeletingLog(oldExpence, logAmount) {
    let OE = Number(oldExpence);
    let LA = Number(logAmount);
    return OE - LA;
  }
  contriAfterDeletingLog(oldContri, logAmount) {
    let OC = Number(oldContri);
    let LA = Number(logAmount);
    console.log(OC+LA);
    return OC + LA
  }
}
