import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {ApiServiceProvider} from "../../providers/api-service/api-service";
import {Camera, CameraOptions} from '@ionic-native/camera';

/**
 * Generated class for the HuntPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hunt',
  templateUrl: 'hunt.html',
})
export class HuntPage {

  hunt = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, private api: ApiServiceProvider, private camera: Camera, private alertCtrl: AlertController) {

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    this.api.getHunt(this.navParams.get('id'))
      .then(hunt => {
        this.hunt = hunt;
        loading.dismiss();
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HuntPage');
  }

  completeItem(item) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
      this.alertCtrl.create({
        message: err
      }).present();
      console.error(err);
    });
  }


  isDone(item) {
    return item.usersWhoHaveCompletedIt && item.usersWhoHaveCompletedIt.find(u => u == this.api.userEmail);
  }

}
