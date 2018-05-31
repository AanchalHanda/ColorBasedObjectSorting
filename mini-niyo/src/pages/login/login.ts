import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home'
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage implements OnInit {
  
  user_name: any;
  user_password: any;
  user: FormGroup;
  isUserRegisterd:boolean;
  isPasswordCorrect:boolean;
  user_data:{
    user_name:any,
    user_password:any,
    req_type : any
  }
  link='http://localhost:8000/';
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public http : Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  saveUser(){
    this.user_data={
      user_name:this.user_name,
      user_password:this.user_password,
      req_type : "login"
    };
  }
  
  onClickLogin(){
    this.saveUser();
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post(this.link+'View/g/', JSON.stringify(this.user_data),{headers: headers})
          .map( res=>{
                        res.json()
                        this.isUserRegisterd=(res.json().user_name_exists)=="true"?true:false;
                        this.isPasswordCorrect=(res.json().password_correct)=="true"?true:false;
                      //  console.log(this.isUserRegisterd)
                      //  console.log(this.isPasswordCorrect)
                      //  console.log(res.json())

                        if(this.isUserRegisterd){
                          
                          if(this.isPasswordCorrect){
                            this.presentToast("Login successful");
                            console.log("Login successful");
                            this.navCtrl.setRoot(HomePage,{user_name:this.user_data.user_name});
                          }
                          else{
                            this.presentToast("incorrect password");
                            console.log("incorrect password");
                          }
                        }
                         else{
                            this.presentToast("User not registerd");
                            console.log("User not registerd"); 
                        }
          }).subscribe(data => {
          }, error => {
              console.log(error);
              this.presentToast(error);
          });
  }


  toRegisterPage(){
    this.navCtrl.setRoot(RegisterPage);
  }

  ngOnInit() {
    this.user = new FormGroup({
    user_name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    user_password: new FormControl('', [Validators.required, Validators.minLength(4)])
    });    
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


