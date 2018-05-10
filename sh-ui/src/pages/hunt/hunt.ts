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

  hunt:any = {};
  isInProgress = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, private api: ApiServiceProvider, private camera: Camera, private alertCtrl: AlertController) {

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    this.api.getHunt(this.navParams.get('id'))
      .then(hunt => {
        this.hunt = hunt;
        this.isInProgress = this.inProgress();
        loading.dismiss();
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HuntPage');
  }

  completeItem(item) {
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      return this.api.completeItem(
        this.hunt._id,
        this.api.userEmail,
        item.label,
        imageData
      );
    }).then((data:any) => {
      console.log('response', data);
      if (data.message == 'MATCHED') {
        item.usersWhoHaveCompletedIt.push(this.api.userEmail);
        this.isInProgress = this.inProgress();
      } else {
        console.log(JSON.stringify(data));
        this.alertCtrl.create({message:'Not a match'}).present();
      }
    }).catch((err) => {
      // Handle error
      this.alertCtrl.create({
        message: err
      }).present();
      console.error(err);
    });
  }

  inProgress() {
    if(!this.hunt || !this.hunt.items) {
      return false;
    } else if(this.hunt.items.find(i => !this.isDone(i))) {
      return true;
    } else {
      return false;
    }
  }


  isDone(item) {
    return item.usersWhoHaveCompletedIt && item.usersWhoHaveCompletedIt.find(u => u == this.api.userEmail);
  }

}
