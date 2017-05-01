import axios from 'axios';
import loginController from './login';
import { createCookieHeader } from '../utils';

class Client {
  constructor(userDetails) {
    this._userDetails = userDetails;

    this._authDetails = null;
    this._axiosInstance = null;
  }

  _createAxiosInstance() {
    this._axiosInstance = axios.create({
      headers: {
        'X-Csrf-Token': this._authDetails.csrfToken,
        'Cookie': createCookieHeader([
          { name: 'uniquId', value: this._authDetails.uniquId },
          { name: 'MashovSessionID', value: this._authDetails.mashovSessionId },
          { name: 'Csrf-Toke', value: this._authDetails.csrfToken },
        ])
      }
    });
  }

  _continueIfAuthenticated() {
    return new Promise((resolve, reject) => {
      this._authDetails ? resolve() : reject();
    });
  }

  login() {
    return loginController(axios, this._userDetails).then(authDetails => {
      this._authDetails = authDetails;
    });
  }
}

export default Client;