import axios from 'axios';
import moxios from 'moxios';
import { endpoints } from '../src/api-config';
import behaveController from '../src/controllers/behave';
import behaveFixture from './fixtures/behave.json';

beforeEach(() => {
  moxios.install();
});

afterEach(() => {
  moxios.uninstall();
});

test('should return all behave events', (done) => {
  moxios.stubRequest(endpoints.behave('0000'), {
    status: 200,
    response: behaveFixture.plain,
  });

  behaveController(axios, {
    userId: '0000',
  }).then((behave) => {
    expect(behave).toMatchObject(behaveFixture.parsed);
    done();
  });
});
