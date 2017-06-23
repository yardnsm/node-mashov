import axios from 'axios';
import moxios from 'moxios';
import { endpoints } from '../lib/api-config';
import bellsController from '../lib/controllers/bells';
import bellsFixture from './fixtures/bells.json';

beforeEach(() => {
  moxios.install();
});

afterEach(() => {
  moxios.uninstall();
});

test('should return all bells events', (done) => {
  moxios.stubRequest(endpoints.bells, {
    status: 200,
    response: bellsFixture.plain,
  });

  bellsController(axios, {
    userId: '0000',
  }).then((bells) => {
    expect(bells).toMatchObject(bellsFixture.parsed);
    done();
  });
});
