import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TripCrudPage } from './trip-crud';

@NgModule({
  declarations: [
    TripCrudPage,
  ],
  imports: [
    IonicPageModule.forChild(TripCrudPage),
  ],
})
export class TripCrudPageModule {}
