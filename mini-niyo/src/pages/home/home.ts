import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user_name:any;

  constructor(public navCtrl: NavController,public http:Http, public navParams: NavParams) {
    this.user_name=this.navParams.get('user_name');
  }

  onClickLogout(){
    this.navCtrl.setRoot(LoginPage)
  }
}
