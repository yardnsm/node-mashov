import axios from 'axios';
import moxios from 'moxios';
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
  moxios.stubRequest(endpoints.conversations.inbox('?limit=20&skip=0'), {
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
