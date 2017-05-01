import moxios from 'moxios';
import { endpoints } from '../lib/api-config';
import Client from '../lib/client';

beforeEach(() => {
  moxios.install();
});

afterEach(() => {
  moxios.uninstall();
});

describe('Client', () => {

  describe('login', () => {

    it('should fail if details are wrong', () => {
      moxios.stubRequest(endpoints.schools, {
        status: 401
      });

      const client = new Client({
        username: 'username',
        password: 'password',
        school: {},
        year: 2017
      });

      return expect(client.login()).rejects;
    });
  });
});