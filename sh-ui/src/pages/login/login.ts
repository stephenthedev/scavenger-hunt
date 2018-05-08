import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ApiServiceProvider} from "../../providers/api-service/api-service";
import {TabsPage} from "../tabs/tabs";
import {SignupPage} from "../signup/signup";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private email:string;
  private password:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private api:ApiServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    this.api.login(this.email, this.password)
      .then(() => this.navCtrl.setRoot(TabsPage))
      .catch(console.error);
  }

  goToSignup() {
    this.navCtrl.push(SignupPage);
  }

}
