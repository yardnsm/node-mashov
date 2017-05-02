import axios from 'axios';
import moxios from 'moxios';
import { endpoints } from '../lib/api-config';
import gradesController from '../lib/client/grades';
import gradesFixture from './fixtures/grades.json';

beforeEach(() => {
  moxios.install();
});

afterEach(() => {
  moxios.uninstall();
});

test('should return all grades', (done) => {
  moxios.stubRequest(endpoints.grades('0000'), {
    status: 200,
    response: gradesFixture.plain
  });

  gradesController(axios, {
    userId: '0000'
  }).then((grades) => {
    expect(grades).toMatchObject(gradesFixture.parsed);
    done();
  });
});
