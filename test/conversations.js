import axios from 'axios';
import moxios from 'moxios';
import encodeUrl from 'encodeurl';
import { endpoints } from '../lib/api-config';
import conversationsController from '../lib/controllers/conversations';
import fixture from './fixtures/conversations.json';

beforeEach(() => {
  moxios.install();
});

afterEach(() => {
  moxios.uninstall();
});

test('get all conversations', (done) => {
  moxios.stubRequest(endpoints.conversations.inbox('?'), {
    status: 200,
    response: fixture.all_conversations
  });

  conversationsController.all(axios, {
    query: 'inbox'
  }).then((convs) => {
    expect(convs).toMatchObject(fixture.all_conversations_parsed);
    done();
  });
});

test('generate a query correctly', (done) => {
  const queryExpected =
    encodeUrl('מאת:(sender) אל:(receiver) נושא:(subject) תוכן:(<b>body</b>) יש:(קבצים) מ:(2017-05-01) עד:(2017-05-08)');

  moxios.stubRequest(endpoints.conversations.search(queryExpected, '?'), {
    status: 200,
    response: fixture.all_conversations
  });

  conversationsController.all(axios, {
    query: {
      sender: 'sender',
      receiver: 'receiver',
      subject: 'subject',
      body: '<b>body</b>',
      attachment: true,
      fromDate: '2017-05-01',
      toDate: '2017-05-08'
    }
  }).then(done);
});

test('get a single conversation', (done) => {
  moxios.stubRequest(endpoints.conversations.single('0000'), {
    status: 200,
    response: fixture.single_conversation
  });

  conversationsController.single(axios, {
    conversationId: '0000'
  }).then((conv) => {
    expect(conv).toMatchObject(fixture.single_conversation_parsed);
    done();
  });
});
