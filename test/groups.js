import axios from 'axios';
import moxios from 'moxios';
import { endpoints } from '../lib/api-config';
import groupsController from '../lib/controllers/groups';
import groupsFixture from './fixtures/groups.json';

beforeEach(() => {
  moxios.install();
});

afterEach(() => {
  moxios.uninstall();
});

test('should return all groups', (done) => {
  moxios.stubRequest(endpoints.groups('0000'), {
    status: 200,
    response: groupsFixture.plain,
  });

  groupsController(axios, {
    userId: '0000',
  }).then((groups) => {
    expect(groups).toMatchObject(groupsFixture.parsed);
    done();
  });
});
