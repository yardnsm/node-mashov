import axios from 'axios';
import moxios from 'moxios';
import { endpoints } from '../lib/api-config';
import lessonsCountController from '../lib/controllers/lessons-count';
import lessonsCountFixture from './fixtures/lessons-count.json';

beforeEach(() => {
  moxios.install();
});

afterEach(() => {
  moxios.uninstall();
});

test('should return all lessonsCount events', (done) => {
  moxios.stubRequest(endpoints.lessonsCount('0000'), {
    status: 200,
    response: lessonsCountFixture.plain
  });

  lessonsCountController(axios, {
    userId: '0000'
  }).then((lessonsCount) => {
    expect(lessonsCount).toMatchObject(lessonsCountFixture.parsed);
    done();
  });
});
