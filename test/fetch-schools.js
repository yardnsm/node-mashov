import moxios from 'moxios';
import { endpoints } from '../src/api-config';
import fetchSchools from '../src/fetch-schools';
import schoolsFixture from './fixtures/schools.json';

beforeEach(() => {
  moxios.install();
});

afterEach(() => {
  moxios.uninstall();
});

test('should fetch a list of all schools', async () => {
  moxios.stubRequest(endpoints.schools, {
    status: 200,
    response: schoolsFixture.plain,
  });

  const schools = await fetchSchools();
  expect(schools).toMatchObject(schoolsFixture.parsed);
});
