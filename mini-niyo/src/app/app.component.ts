import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { RegisterPage } from '../pages/register/register'
import { PersonalDetailsPage } from '../pages/personal-details/personal-details';
import { FinancialDetailsPage } from '../pages/financial-details/financial-details';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild('content') nav: NavController;
  rootPage:any = HomePage;
//    rootPage:any = RegisterPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onClickItemHome(){
    this.nav.setRoot(HomePage);
  }

  onClickItemPersonalDetails(){
    this.nav.push(PersonalDetailsPage);
  }

  onClickItemFinancialDetails(){
    this.nav.push(FinancialDetailsPage);
  }
    
}

