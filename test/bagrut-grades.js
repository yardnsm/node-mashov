import axios from 'axios';
import moxios from 'moxios';
import { endpoints } from '../src/api-config';
import bagrutGradesController from '../src/controllers/bagrut-grades';
import bagrutGradesFixture from './fixtures/bagrut-grades.json';

beforeEach(() => {
  moxios.install();
});

afterEach(() => {
  moxios.uninstall();
});

test('should return all bagrut grades', (done) => {
  moxios.stubRequest(endpoints.bagrutGrades('0000'), {
    status: 200,
    response: bagrutGradesFixture.plain,
  });

  bagrutGradesController(axios, {
    userId: '0000',
  }).then((bagrutGrades) => {
    expect(bagrutGrades).toMatchObject(bagrutGradesFixture.parsed);
    done();
  });
});
