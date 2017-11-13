import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddContributorsPage } from './add-contributors';

@NgModule({
  declarations: [
    AddContributorsPage,
  ],
  imports: [
    IonicPageModule.forChild(AddContributorsPage),
  ],
})
export class AddContributorsPageModule {}
