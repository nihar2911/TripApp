import { ContributionAmmountPage } from './../pages/contribution-ammount/contribution-ammount';
import { TripCrudPage } from './../pages/trip-crud/trip-crud';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { NavController, AlertController, ToastController } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AddContributorsPage } from '../pages/add-contributors/add-contributors'

import { HttpModule } from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppSettingProvider } from '../providers/app-setting/app-setting';
import { TripServiceProvider } from '../providers/trip-service/trip-service';
import { TripCalculationProvider } from '../providers/trip-calculation/trip-calculation';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    AddContributorsPage,
    TripCrudPage,
    ContributionAmmountPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    TripCrudPage,
    AddContributorsPage,
    ContributionAmmountPage
  ],
  providers: [
    AppSettingProvider,
    TripServiceProvider,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TripCalculationProvider   
  ]
})
export class AppModule {}
