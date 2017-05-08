import axios from 'axios';
import moxios from 'moxios';
import { endpoints } from '../lib/api-config';
import filesController from '../lib/controllers/files';
import filesFixture from './fixtures/files.json';

beforeEach(() => {
  moxios.install();
});

afterEach(() => {
  moxios.uninstall();
});

test('should return all files', (done) => {
  moxios.stubRequest(endpoints.files.all('0000'), {
    status: 200,
    response: filesFixture.plain
  });

  filesController(axios, {
    userId: '0000'
  }).then((files) => {
    expect(files).toMatchObject(filesFixture.parsed);
    done();
  });
});
