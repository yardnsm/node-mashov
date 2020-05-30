import axios from 'axios';
import moxios from 'moxios';
import { endpoints } from '../src/api-config';
import onlineLessonsController from '../src/controllers/online-lessons';
import onlineLessonsFixture from './fixtures/online-lessons.json';

beforeEach(() => {
  moxios.install();
});

afterEach(() => {
  moxios.uninstall();
});

test('should return all online lessons', (done) => {
  moxios.stubRequest(endpoints.onlineLessons.all, {
    status: 200,
    response: onlineLessonsFixture.plain,
  });

  onlineLessonsController(axios, {
    userId: '0000',
  }).then((lessons) => {
    expect(lessons).toMatchObject(onlineLessonsFixture.parsed);
    done();
  });
});
