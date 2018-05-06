import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {LoadingController} from "ionic-angular";

const HUNTS_API = 'http://ec2-18-232-158-4.compute-1.amazonaws.com:3000/';
const USERS_API = 'http://ec2-18-232-158-4.compute-1.amazonaws.com:3001/';

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

  createHunt(data) {
    let loading = this.loadingCtrl.create({
      content: 'Creating hunt'
    });
    return loading.present().then(() => {
      return this.mockPromise(1000)
    }).then(() => loading.dismiss());
  }

  getHunts() {
    return this.mockPromise(null, [{name: 'test', id: '1234'}, {
      name: 'test',
      id: '12345',
      currentUsers: ['noop@noop.com']
    }]);
  }

  getHunt(id: string) {
    return this.mockPromise(null,
      {
        name: 'Test hunt',
        items: [
          {
            label: 'Boat',
            usersWhoHaveCompletedIt: []
          },
          {
            label: 'Car',
            usersWhoHaveCompletedIt: ['noop@noop.com']
          }
        ]
      });
  }

  completeItem(image, item) {
    return this.mockPromise();
  }

  signup(data) {
    return this.mockPromise();
  }

  login(data) {
    return this.mockPromise();
  }

  mockPromise(time = null, result = null) {
    return new Promise(r => setTimeout(() => r(result), time || 1000));
  }

}
