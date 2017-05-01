import moxios from 'moxios';
import { endpoints } from '../lib/api-config';
import Client from '../lib/client';
import loginFixture from './fixtures/login'

beforeEach(() => {
  moxios.install();
});

afterEach(() => {
  moxios.uninstall();
});

describe('Client', () => {

  describe('login', () => {

    it('should fail if details are wrong', (done) => {
      moxios.stubRequest(endpoints.login, {
        status: 401
      });

      const client = new Client({
        username: 'username',
        password: 'password',
        school: {},
        year: 2017
      });

      client.login().catch(done);
    });

  it('should resolve if details are correct', (done) => {
      moxios.stubRequest(endpoints.login, {
        status: 200,
        response: loginFixture.plain,
        headers: loginFixture.headers
      });

      const client = new Client({
        username: 'correctUsername',
        password: 'correctPassword',
        school: {},
        year: 2017
      });

      client.login().then(done);
    });
  });
});