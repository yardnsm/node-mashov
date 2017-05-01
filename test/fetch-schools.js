import moxios from 'moxios';
import { endpoints } from '../lib/api-config';
import fetchSchools from '../lib/fetch-schools';
import schoolsFixture from './fixtures/schools'

beforeEach(() => {
  moxios.install();
});

afterEach(() => {
  moxios.uninstall();
});

test('fetchSchools should fetch a list of all schools', async () => {
  moxios.stubRequest(endpoints.schools, {
    status: 200,
    response: schoolsFixture.plain
  });

  const schools = await fetchSchools();
  expect(schools).toMatchObject(schoolsFixture.parsed);
});