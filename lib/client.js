import axios from 'axios';
import { createCookieHeader } from './utils';

import loginController from './controllers/login';
import conversationsController from './controllers/conversations';
import gradesController from './controllers/grades';
import bagrutGradesController from './controllers/bagrut-grades';

class Client {
  constructor(userDetails) {
    this._userDetails = userDetails;

    this._authDetails = null;
    this._axiosInstance = null;

    this._createAxiosInstance = this._createAxiosInstance.bind(this);
    this._continueIfAuthenticated = this._continueIfAuthenticated.bind(this);

    this.login = this.login.bind(this);
    this.getAllConversations = this.getAllConversations.bind(this);
    this.getSingleConversation = this.getSingleConversation.bind(this);
    this.getGrades = this.getGrades.bind(this);
    this.getBagrutGrades = this.getBagrutGrades.bind(this);
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
      if (this._authDetails) {
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

  getAllConversations(query = 'inbox', limit, skip) {
    return this._continueIfAuthenticated().then(() =>
      conversationsController.all(this._axiosInstance, {
        query,
        limit,
        skip
      }));
  }

  getSingleConversation(conversationId) {
    return this._continueIfAuthenticated().then(() =>
      conversationsController.single(this._axiosInstance, {
        conversationId
      }));
  }

  getGrades() {
    return this._continueIfAuthenticated().then(() =>
      gradesController(this._axiosInstance, {
        userId: this._authDetails.userId
      }));
  }

  getBagrutGrades() {
    return this._continueIfAuthenticated().then(() =>
      bagrutGradesController(this._axiosInstance, {
        userId: this._authDetails.userId
      }));
  }
}

export default Client;
