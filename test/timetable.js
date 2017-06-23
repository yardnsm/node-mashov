import axios from 'axios';
import moxios from 'moxios';
import { endpoints } from '../lib/api-config';
import timetableController from '../lib/controllers/timetable';
import timetableFixture from './fixtures/timetable.json';

beforeEach(() => {
  moxios.install();
});

afterEach(() => {
  moxios.uninstall();
});

test('should return all timetable events', (done) => {
  moxios.stubRequest(endpoints.timetable('0000'), {
    status: 200,
    response: timetableFixture.plain,
  });

  timetableController(axios, {
    userId: '0000',
  }).then((timetable) => {
    expect(timetable).toMatchObject(timetableFixture.parsed);
    done();
  });
});
