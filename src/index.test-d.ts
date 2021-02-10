/* eslint-disable */

import { expectType } from 'tsd';
import {
  fetchSchools,
  Client,

  AuthDetails,

  FetchSchoolsResponse,
  LoginReponse,
  LogoutResponse,
  GetConversationsResponse,
  GetConversationResponse,
  GetGradesResponse,
  GetBagrutGradesResponse,
  GetBehaveEventsReponse,
  GetLessonsCountResponse,
  GetBellsReponse,
  GetTimetableResponse,
  GetFilesResponse,
  GetGroupsResponse,
  GetContactsResponse,
  GetGroupContactsResponse,
  GetOnlineLessonsResponse,
} from '.';

// Test fetchSchools
expectType<FetchSchoolsResponse>(fetchSchools());

// Test Client
const client = new Client();

expectType<AuthDetails>(client.getAuthDetails());
expectType<void>(client.setAuthDetails({
  csrfToken: '0000',
  uniquId: '0000',
  mashovAuthToken: '0000',
  correlationId: '0000',
  sessionId: '0000',
  userId: '0000',
}));

expectType<Client>(client.setStartDate(null));
expectType<Client>(client.setStartDate('2020-12-31'));

expectType<Client>(client.setEndDate(null));
expectType<Client>(client.setEndDate('2020-12-31'));

expectType<LoginReponse>(client.login({
  username: 'username',
  password: 'password',
  year: 2019,
  school: {
    id: 1111,
    name: 'School',
    years: [2019, 2020],
  },
}));

expectType<LogoutResponse>(client.logout());

expectType<GetConversationsResponse>(client.getConversations('inbox', 20, 0));
expectType<GetConversationsResponse>(client.getConversations('archive', 20, 0));
expectType<GetConversationsResponse>(client.getConversations('unread', 20, 0));
expectType<GetConversationsResponse>(client.getConversations('deleted', 20, 0));
expectType<GetConversationsResponse>(client.getConversations('sent', 20, 0));
expectType<GetConversationsResponse>(client.getConversations('draft', 20, 0));
expectType<GetConversationsResponse>(
  client.getConversations({
    in: 'all',
    sender: 'Sender',
    receiver: 'Receiver',
    subject: 'Subject',
    attachment: true,
    fromDate: '2020-12-31',
  }, 20, 0)
);
expectType<GetConversationsResponse>(
  client.getConversations({
    body: 'Subject',
    toDate: '2020-12-31',
  }, 20, 0)
);

expectType<GetConversationResponse>(client.getConversation('0000'));
expectType<GetGradesResponse>(client.getGrades());
expectType<GetBagrutGradesResponse>(client.getBagrutGrades());
expectType<GetBehaveEventsReponse>(client.getBehaveEvents());
expectType<GetLessonsCountResponse>(client.getLessonsCount());
expectType<GetBellsReponse>(client.getBells());
expectType<GetTimetableResponse>(client.getTimetable());
expectType<GetFilesResponse>(client.getFiles());
expectType<GetGroupsResponse>(client.getGroups());
expectType<GetContactsResponse>(client.getContacts());
expectType<GetGroupContactsResponse>(client.getGroupContacts('0000'));
expectType<GetOnlineLessonsResponse>(client.getOnlineLessons());
