import axios from 'axios';
import encodeUrl from 'encodeurl';
import { createCookieHeader, createQueryString } from './utils';

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

/**
 * Mashov API client
 */
class Client {
  constructor() {
    this._authDetails = null;
    this._axiosInstance = null;

    this._startDate = null;
    this._endDate = null;

    this._createAxiosInstance = this._createAxiosInstance.bind(this);
    this._continueIfAuthenticated = this._continueIfAuthenticated.bind(this);

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);

    this.getAuthDetails = this.getAuthDetails.bind(this);
    this.setAuthDetails = this.setAuthDetails.bind(this);
    this.setStartDate = this.setStartDate.bind(this);
    this.setEndDate = this.setEndDate.bind(this);

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

  /**
   * Create a new Axios instance for the controllers to use. Note that this method does not
   * return any value, but rather set `_axiosInstance`.
   */
  _createAxiosInstance() {
    this._axiosInstance = axios.create({
      headers: {
        'X-Csrf-Token': this._authDetails.csrfToken,
        Cookie: createCookieHeader([
          { name: 'uniquId', value: this._authDetails.uniqueId },
          { name: 'MashovSessionID', value: this._authDetails.mashovSessionId },
          { name: 'Csrf-Token', value: this._authDetails.csrfToken },
        ]),
      },
      paramsSerializer: (params) => {
        const parts = Object.keys(params).map(e => ({ name: e, value: params[e] }));
        return createQueryString(parts);
      },
    });

    this._axiosInstance.interceptors.request.use((config) => {
      const newConfig = config;

      newConfig.url = encodeUrl(config.url);
      newConfig.params = Object.assign(newConfig.params || {}, {
        start: this._startDate,
        end: this._endDate,
      });

      return newConfig;
    });
  }

  /**
   * Check if we have the user's authDeatils.
   *
   * @returns {Promise}
   */
  _continueIfAuthenticated() {
    return new Promise((resolve, reject) => {
      if (this._authDetails) {
        resolve();
      } else {
        reject(new Error('User is not logged in'));
      }
    });
  }

  /**
   * Get the user's authDetails.
   * @returns {Object}
   */
  getAuthDetails() {
    return this._authDetails;
  }

  /**
   * Set the user's authDetails.
   */
  setAuthDetails(authDetails) {
    this._authDetails = authDetails;
    this._createAxiosInstance();
  }

  /**
   * Set start date.
   * @returns {Client}
   */
  setStartDate(startDate) {
    this._startDate = startDate;
    return this;
  }

  /**
   * Set end date.
   * @returns {Client}
   */
  setEndDate(endDate) {
    this._endDate = endDate;
    return this;
  }

  /**
   * Authenticate the API.
   *
   * @param {Object} userDeatils
   * @param {string} userDetails.username
   * @param {string} userDetails.password
   * @param {number} userDetails.year
   * @param {Object} userDetails.school
   * @returns {Promise}
   */
  login(userDetails) {
    return loginController(axios, userDetails).then((authDetails) => {
      this._authDetails = authDetails;
    }).then(() => {
      this._createAxiosInstance();
    });
  }

  /**
   * Deauthenticate the API.
   *
   * @returns {Promise}
   */
  logout() {
    return logoutController(this._axiosInstance).then(() => {
      this._authDetails = null;
      this._axiosInstance = null;
    });
  }

  /**
   * Get the user's conversations.
   *
   * @returns {Promise}
   */
  getConversations(query = 'inbox', limit, skip) {
    return this._continueIfAuthenticated().then(() =>
      conversationsController.all(this._axiosInstance, {
        query,
        limit,
        skip,
      }));
  }

  /**
   * Get a single conversation.
   *
   * @returns {Promise}
   */
  getConversation(conversationId) {
    return this._continueIfAuthenticated().then(() =>
      conversationsController.single(this._axiosInstance, {
        conversationId,
      }));
  }

  /**
   * Get the user's grades.
   *
   * @returns {Promise}
   */
  getGrades() {
    return this._continueIfAuthenticated().then(() =>
      gradesController(this._axiosInstance, {
        userId: this._authDetails.userId,
      }));
  }

  /**
   * Get the user's Bagrut grades.
   *
   * @returns {Promise}
   */
  getBagrutGrades() {
    return this._continueIfAuthenticated().then(() =>
      bagrutGradesController(this._axiosInstance, {
        userId: this._authDetails.userId,
      }));
  }

  /**
   * Get the user's behave events.
   *
   * @returns {Promise}
   */
  getBehaveEvents() {
    return this._continueIfAuthenticated().then(() =>
      behaveController(this._axiosInstance, {
        userId: this._authDetails.userId,
      }));
  }

  /**
   * Get the user's lesson count.
   *
   * @returns {Promise}
   */
  getLessonsCount() {
    return this._continueIfAuthenticated().then(() =>
      lessonsCountController(this._axiosInstance, {
        userId: this._authDetails.userId,
      }));
  }

  /**
   * Get the user's school's bell schedule.
   *
   * @returns {Promise}
   */
  getBells() {
    return this._continueIfAuthenticated().then(() =>
      bellsController(this._axiosInstance));
  }

  /**
   * Get the user's timetable.
   *
   * @returns {Promise}
   */
  getTimetable() {
    return this._continueIfAuthenticated().then(() =>
      timetableController(this._axiosInstance, {
        userId: this._authDetails.userId,
      }));
  }

  /**
   * Get the user's study materials.
   *
   * @returns {Promise}
   */
  getFiles() {
    return this._continueIfAuthenticated().then(() =>
      filesController(this._axiosInstance, {
        userId: this._authDetails.userId,
      }));
  }

  /**
   * Get the user's groups.
   *
   * @returns {Promise}
   */
  getGroups() {
    return this._continueIfAuthenticated().then(() =>
      groupsController(this._axiosInstance, {
        userId: this._authDetails.userId,
      }));
  }

  /**
   * Get the user's contacts.
   *
   * @returns {Promise}
   */
  getContacts() {
    return this._continueIfAuthenticated().then(() =>
      contactsController.student(this._axiosInstance, {
        userId: this._authDetails.userId,
      }));
  }

  /**
   * Get the groups's conatcts.
   *
   * @returns {Promise}
   */
  getGroupContacts(groupId) {
    return this._continueIfAuthenticated().then(() =>
      contactsController.group(this._axiosInstance, {
        groupId,
      }));
  }
}

export default Client;
