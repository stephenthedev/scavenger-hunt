import { Component } from '@angular/core';
import {LoadingController, NavController} from 'ionic-angular';
import {ApiServiceProvider} from "../../providers/api-service/api-service";
import {HuntPage} from "../hunt/hunt";
import {NewHuntPage} from "../new-hunt/new-hunt";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  hunts = [];

  constructor(public navCtrl: NavController, private api: ApiServiceProvider, private loadingCtrl: LoadingController) {


    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    this.api.getHunts()
      .then((hunts:Array<any>) => {
        this.hunts = hunts;
        loading.dismiss();
      });
  }

  selectHunt(hunt) {
    this.navCtrl.push(HuntPage, {id: hunt._id});
  }

  inProgress(hunt) {
    return hunt.currentUsers && hunt.currentUsers.find(u => u == this.api.userEmail);
  }
  isOpen(hunt) {
    return hunt.currentUsers && !hunt.currentUsers.find(u => u == this.api.userEmail);
  }
  isComplete(hunt) {}

  goToNewHunt() {
    this.navCtrl.push(NewHuntPage);
  }
}
