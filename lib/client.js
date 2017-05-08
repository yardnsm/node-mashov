import axios from 'axios';
import { createCookieHeader } from './utils';

import loginController from './controllers/login';
import logoutController from './controllers/logout';

import conversationsController from './controllers/conversations';
import gradesController from './controllers/grades';
import bagrutGradesController from './controllers/bagrut-grades';
import behaveController from './controllers/behave';
import lessonsCountController from './controllers/lessons-count';
import bellsController from './controllers/bells';
import timetableController from './controllers/timetable';
import filesController from './controllers/files';
import groupsController from './controllers/groups';
import contactsController from './controllers/contacts';

class Client {
  constructor(userDetails) {
    this._userDetails = userDetails;

    this._authDetails = null;
    this._axiosInstance = null;

    this._createAxiosInstance = this._createAxiosInstance.bind(this);
    this._continueIfAuthenticated = this._continueIfAuthenticated.bind(this);

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);

    this.getConversations = this.getConversations.bind(this);
    this.getConversation = this.getConversation.bind(this);
    this.getGrades = this.getGrades.bind(this);
    this.getBagrutGrades = this.getBagrutGrades.bind(this);
    this.getBehaveEvents = this.getBehaveEvents.bind(this);
    this.getLessonsCount = this.getLessonsCount.bind(this);
    this.getBells = this.getBells.bind(this);
    this.getTimetable = this.getTimetable.bind(this);
    this.getFiles = this.getFiles.bind(this);
    this.getGroups = this.getGroups.bind(this);
    this.getContacts = this.getContacts.bind(this);
    this.getGroupContacts = this.getGroupContacts.bind(this);
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

  logout() {
    return logoutController(this._axiosInstance).then(() => {
      this._authDetails = null;
      this._axiosInstance = null;
    });
  }

  getConversations(query = 'inbox', limit, skip) {
    return this._continueIfAuthenticated().then(() =>
      conversationsController.all(this._axiosInstance, {
        query,
        limit,
        skip
      }));
  }

  getConversation(conversationId) {
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

  getBehaveEvents() {
    return this._continueIfAuthenticated().then(() =>
      behaveController(this._axiosInstance, {
        userId: this._authDetails.userId
      }));
  }

  getLessonsCount() {
    return this._continueIfAuthenticated().then(() =>
      lessonsCountController(this._axiosInstance, {
        userId: this._authDetails.userId
      }));
  }

  getBells() {
    return this._continueIfAuthenticated().then(() =>
      bellsController(this._axiosInstance));
  }

  getTimetable() {
    return this._continueIfAuthenticated().then(() =>
      timetableController(this._axiosInstance, {
        userId: this._authDetails.userId
      }));
  }

  getFiles() {
    return this._continueIfAuthenticated().then(() =>
      filesController(this._axiosInstance, {
        userId: this._authDetails.userId
      }));
  }

  getGroups() {
    return this._continueIfAuthenticated().then(() =>
      groupsController(this._axiosInstance, {
        userId: this._authDetails.userId
      }));
  }

  getContacts() {
    return this._continueIfAuthenticated().then(() =>
      contactsController.student(this._axiosInstance, {
        userId: this._authDetails.userId
      }));
  }

  getGroupContacts(groupId) {
    return this._continueIfAuthenticated().then(() =>
      contactsController.group(this._axiosInstance, {
        groupId
      }));
  }
}

export default Client;
