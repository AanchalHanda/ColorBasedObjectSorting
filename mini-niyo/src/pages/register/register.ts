import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { LoginPage } from '../login/login';
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage implements OnInit{
  user_name: any;
  user_password: any;
  user: FormGroup;
  isAlreadyRegisterd:boolean;

  new_user : {user_name:any,
              user_password:any,
              req_type: any}
  
              link='http://localhost:8000/';
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public http : Http, 
              public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  saveUser(){

    this.new_user={
      user_name:this.user_name,
      user_password:this.user_password,
      req_type: "register"
    };
    
    console.log(this.new_user);
  }

  ngOnInit() {

    this.user = new FormGroup({
    user_name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    user_password: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
    
    }

    sendData(request,response){

      this.saveUser();

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(this.link+'View/g/', JSON.stringify(this.new_user),{headers: headers})
          .map( res=>{
              res.json()
              this.isAlreadyRegisterd=<boolean>res.json().user_name_exists;
              console.log(res.json())
              if(this.isAlreadyRegisterd){
                this.presentToast("Username already taken !");
                console.log("Username already taken !");  
              }
              else{
                this.presentToast("Registration successful");
                console.log("Registration successful"); 
              }
          }).subscribe(data => {
          }, error => {
              console.log(error);
              this.presentToast(error);
          });
  }

  toLoginPage(){
    this.navCtrl.setRoot(LoginPage);
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}

