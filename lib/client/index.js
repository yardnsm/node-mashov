import axios from 'axios';
import loginController from './login';
import gradesController from './grades';
import { createCookieHeader } from '../utils';

class Client {
  constructor(userDetails) {
    this._userDetails = userDetails;

    this._authDetails = {};
    this._axiosInstance = () => {}; // noop

    this._createAxiosInstance = this._createAxiosInstance.bind(this);
    this._continueIfAuthenticated = this._continueIfAuthenticated.bind(this);
    this.login = this.login.bind(this);
    this.getGrades = this.getGrades.bind(this);
  }

  _createAxiosInstance() {
    this._axiosInstance = axios.create({
      headers: {
        'X-Csrf-Token': this._authDetails.csrfToken,
        Cookie: createCookieHeader([
          { name: 'uniquId', value: this._authDetails.uniqueId },
          { name: 'MashovSessionID', value: this._authDetails.mashovSessionId },
          { name: 'Csrf-Token', value: this._authDetails.csrfToken },
        ])
      }
    });
  }

  _continueIfAuthenticated() {
    return new Promise((resolve, reject) => {
      if (this._authDetails.isAuthenticated) {
        resolve();
      } else {
        reject(new Error('User is not logged in'));
      }
    });
  }

  login() {
    return loginController(axios, this._userDetails).then((authDetails) => {
      this._authDetails = authDetails;
    }).then(this._createAxiosInstance);
  }

  getGrades() {
    return this._continueIfAuthenticated().then(() =>
      gradesController(this._axiosInstance, {
        userId: this._authDetails.userId
      }));
  }
}

export default Client;
