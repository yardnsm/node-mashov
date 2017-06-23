import axios from 'axios';
import moxios from 'moxios';
import { endpoints } from '../lib/api-config';
import loginController from '../lib/controllers/login';
import loginFixture from './fixtures/login.json';

beforeEach(() => {
  moxios.install();
});

afterEach(() => {
  moxios.uninstall();
});

test('should fail if details are wrong', (done) => {
  moxios.stubRequest(endpoints.login, {
    status: 401,
  });

  loginController(axios, {
    username: 'username',
    password: 'password',
    school: {},
    year: 2017,
  }).catch(done);
});

test('should resolve if details are correct', (done) => {
  moxios.stubRequest(endpoints.login, {
    status: 200,
    response: loginFixture.plain,
    headers: loginFixture.headers,
  });

  loginController(axios, {
    username: 'username',
    password: 'password',
    school: {},
    year: 2017,
  }).then(done);
});
