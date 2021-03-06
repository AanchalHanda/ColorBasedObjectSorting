import { Component } from '@angular/core';
import { NavController, NavParams, ModalController} from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoginPage } from '../login/login';
import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop';
import { Camera } from '@ionic-native/camera';
import { ProfilePage } from '../profile/profile';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user_name:any;
  date = new Date();
  photos : any;
  myDate: String = new Date(this.date.getTime() - this.date.getTimezoneOffset()*60000).toISOString();
  constructor(public navCtrl: NavController,
              public http:Http,
              public navParams: NavParams,
              public imagePicker: ImagePicker,
              public cropService: Crop,
              public modalCtrl:ModalController) {
    this.user_name=this.navParams.get('user_name');
  }

  onClickLogout(){
    this.navCtrl.setRoot(LoginPage)
  }

  onClickPic(){
    let addModal = this.modalCtrl.create(ProfilePage);
    addModal.present();
  }

  onClickEdit(){
    let options= {
      maximumImagesCount: 1,
    }
    this.photos = new Array<string>();
    this.imagePicker.getPictures(options)
    .then((results) => {
      this.reduceImages(results).then(() => {
        console.log('all images cropped!!');
      });
    }, (err) => { console.log(err) });
  }

  reduceImages(selected_pictures: any) : any{
    return selected_pictures.reduce((promise:any, item:any) => {
      return promise.then((result) => {
        return this.cropService.crop(item, {quality: 75})
        .then(cropped_image => this.photos.push(cropped_image));
      });
    }, Promise.resolve());
  }

}

