import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AlertController, LoadingController} from "ionic-angular";

const HUNTS_API = 'http://ec2-18-232-158-4.compute-1.amazonaws.com:3000';
const USERS_API = 'http://ec2-18-232-158-4.compute-1.amazonaws.com:3001';
// const HUNTS_API = 'http://localhost:3000';
// const USERS_API = 'http://localhost:3001';

/*
  Generated class for the ApiServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiServiceProvider {
  userEmail = 'noop@noop.com';

  constructor(public http: HttpClient, private loadingCtrl: LoadingController, private alertCtrl: AlertController) {
    console.log('Hello ApiServiceProvider Provider');
  }

  createHunt(name, items) {
    return this.makePost(`${HUNTS_API}/hunts`, {
      name,
      items: items.map(i => {
        return {label: i, usersWhoHaveCompletedIt: ['noop@noop.com']}
      }),
      lat: 1,
      long: 1,
      radius: 1
    }, 'Creating the hunt...');
  }

  getHunts() {
    return this.http.get(`${HUNTS_API}/hunts`).toPromise();
  }

  getHunt(id: string) {
    return this.http.get(`${HUNTS_API}/hunts/${id}`).toPromise();
  }

  completeItem(id, email, label, image) {
    return this.makePost(`${HUNTS_API}/complete`, {
      id,
      email,
      label,
      image
    }, 'Checking if you\'re right...');
  }

  signup(email, password) {
    return this.makePost(`${USERS_API}/signup`, {
      email,
      password
    }, 'Creating your account...');
  }

  login(email, password) {
    return this.makePost(`${USERS_API}/login`, {
      email,
      password
    }, 'Logging in...').then(() => this.userEmail = email);
  }

  makePost(url, body, message = 'Loading...') {
    let loading = this.loadingCtrl.create({
      content: message
    });
    return loading.present().then(() => {
      return this.http.post(url, body).toPromise();
    }).catch(e => {
      console.error(e);
      console.error(JSON.stringify(e));
      loading.dismiss();
      this.alertCtrl.create({message: e.message || e}).present();
      return Promise.reject(e);
    }).then(res => {
      loading.dismiss();
      return res;
    });
  }

  mockPromise(time = null, result = null) {
    return new Promise(r => setTimeout(() => r(result), time || 1000));
  }

}
