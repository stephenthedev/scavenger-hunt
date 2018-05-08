import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {LoadingController} from "ionic-angular";

// const HUNTS_API = 'http://ec2-18-232-158-4.compute-1.amazonaws.com:3000';
// const USERS_API = 'http://ec2-18-232-158-4.compute-1.amazonaws.com:3001';
const HUNTS_API = 'http://localhost:3000';
const USERS_API = 'http://localhost:3001';

/*
  Generated class for the ApiServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiServiceProvider {
  userEmail = 'noop@noop.com';

  constructor(public http: HttpClient, private loadingCtrl: LoadingController) {
    console.log('Hello ApiServiceProvider Provider');
  }

  createHunt(name, items) {
    let loading = this.loadingCtrl.create({
      content: 'Creating hunt'
    });
    return loading.present().then(() => {
      return this.http.post(`${HUNTS_API}/hunts`, {
        name,
        items: items.map(i => {
          return {label: i, usersWhoHaveCompletedIt: ['noop@noop.com']}
        }),
        lat: 1,
        long: 1,
        radius: 1
      }).toPromise();
    }).then(() => loading.dismiss());
  }

  getHunts() {
    return this.http.get(`${HUNTS_API}/hunts`).toPromise();
  }

  getHunt(id: string) {
    return this.http.get(`${HUNTS_API}/hunts/${id}`).toPromise();
  }

  completeItem(id, email, label, image) {
    return this.http.post(`${HUNTS_API}/complete`, {
      id,
      email,
      label,
      image
    });
  }

  signup(email, password) {
    return this.http.post(`${USERS_API}/signup`, {
      email,
      password
    }).toPromise();
  }

  login(email, password) {
    return this.http.post(`${USERS_API}/login`, {
      email,
      password
    }).toPromise().then(() => this.userEmail = email);
  }

  mockPromise(time = null, result = null) {
    return new Promise(r => setTimeout(() => r(result), time || 1000));
  }

}
