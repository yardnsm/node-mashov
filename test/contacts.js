import axios from 'axios';
import moxios from 'moxios';
import { endpoints } from '../lib/api-config';
import contactsController from '../lib/controllers/contacts';
import contactsFixture from './fixtures/contacts.json';

beforeEach(() => {
  moxios.install();
});

afterEach(() => {
  moxios.uninstall();
});

test('should return all student\'s contacts', (done) => {
  moxios.stubRequest(endpoints.contacts.student('0000'), {
    status: 200,
    response: contactsFixture.plain
  });

  contactsController.student(axios, {
    userId: '0000'
  }).then((contacts) => {
    expect(contacts).toMatchObject(contactsFixture.parsed);
    done();
  });
});

test('should return groups contacts', (done) => {
  moxios.stubRequest(endpoints.contacts.group('0000'), {
    status: 200,
    response: contactsFixture.plain
  });

  contactsController.group(axios, {
    groupId: '0000'
  }).then((contacts) => {
    expect(contacts).toMatchObject(contactsFixture.parsed);
    done();
  });
});
