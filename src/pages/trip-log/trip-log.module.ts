import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TripLogPage } from './trip-log';

@NgModule({
  declarations: [
    TripLogPage,
  ],
  imports: [
    IonicPageModule.forChild(TripLogPage),
  ],
})
export class TripLogPageModule {}
