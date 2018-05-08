import {Component} from '@angular/core';
import {Alert, AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {ApiServiceProvider} from "../../providers/api-service/api-service";
import {TabsPage} from "../tabs/tabs";

/**
 * Generated class for the NewHuntPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-hunt',
  templateUrl: 'new-hunt.html',
})
export class NewHuntPage {

  name: string;
  items: Array<string> = ['Cartoon', 'Library', 'Violin'];

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private api: ApiServiceProvider, private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewHuntPage');
  }

  addItem() {
    this.alertCtrl.create({
      title: 'Add Item',
      inputs: [
        {
          name: 'item',
          placeholder: 'What to look for'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Add',
          handler: data => {
            this.items.push(data.item);
          }
        }
      ]
    }).present().then(console.log);
  }

  removeItem(item) {
    this.items = this.items.filter(i => i !== item);
  }

  createHunt() {

    if (!this.name || this.items.length < 1) {
      return this.alertCtrl.create({title: 'Need a name and items'}).present();
    }

    this.api.createHunt(
      this.name,
      this.items
    ).then(() => this.navCtrl.setRoot(TabsPage));
  }
}
