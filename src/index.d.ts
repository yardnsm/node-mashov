/* eslint-disable */

export interface School {
  id: number;
  name: string;
  years: SchoolYear[];
}

export interface AuthDetails {
  csrfToken: string;
  uniquId: string;
  mashovSessionId: string;
  correlationId: string;
  sessionId: string;
  userId: string;
}

export interface UserDetails {
  username: string;
  password: string;
  year: SchoolYear;
  school: School;
}

export interface ConversationsComplexQuery {
  in?: 'all' | 'inbox' | 'unread';
  sender?: string;
  receiver?: string;
  subject?: string;
  body?: string;
  attachment?: boolean;
  fromDate?: MashovDate;
  toDate?: MashovDate;
}

export interface Attachment {
  id: string;
  name: string;
}

export interface Message {
  id: string;
  sender: string;
  subject: string;
  timestamp: string;
  body: string;
  unread: boolean;
  deleted: boolean;
  attachments: Attachment[];
}

export interface Conversation {
  id: string;
  subject: string;
  unread: boolean;
  hasAttachments: boolean;
  messages: Message[];
}

export interface Grade {
  teacher: string;
  groupId: MashovGroupId,
  subject: string;
  date: string;
  type: 'exam' | string; // TODO: add more types
  event: string;
  grade: number;
}

export interface BagrutGrade {
  id: number;
  name: string,
  yearly: number;
  test: number;
  final: number;
}

export interface BehaveEvent {
  groupId: MashovGroupId;
  lesson: number;
  date: string;
  type: 'absense' | string; // TODO: add more types
  justification: 'approved' | string; // TODO: add more types;
  justificationId: number;
  reporter: string;
  subject: string;
}

export interface LessonCount {
  groupId: MashovGroupId;
  lessonCount: number;
  weeklyHours: number;
}

export interface Bell {
  lesson: number;
  startTime: string;
  endTime: string;
}

export interface TimetableLesson {
  groupId: MashovGroupId;
  day: number;
  lesson: number;
  subject: string;
  teacher: string;
}

export interface File {
  id: number;
  name: string;
  groupName: string;
  url: string;
}

export interface Group {
  id: MashovGroupId;
  name: string;
  subject: string;
  teacher: string;
}

export interface Contact {
  firstName: string;
  lastName: string;
  classCode: string;
  classNumber: string;
  city: string;
  address: string;
  email: string;
  phone: string;
  cellphone: string;
}

export type SchoolYear = number;
export type MashovDate = string | null;
export type MashovGroupId = string;
export type ConversationsQuery =
  | 'inbox'
  | 'archive'
  | 'unread'
  | 'deleted'
  | 'sent'
  | 'draft'
  | ConversationsComplexQuery;

export type FetchSchoolsResponse = Promise<School[]>;

export type LoginReponse = Promise<void>;
export type LogoutResponse = Promise<void>;
export type GetConversationsResponse = Promise<Conversation[]>;
export type GetConversationResponse = Promise<Conversation>;
export type GetGradesResponse = Promise<Grade[]>;
export type GetBagrutGradesResponse = Promise<BagrutGrade[]>;
export type GetBehaveEventsReponse = Promise<BehaveEvent[]>;
export type GetLessonsCountResponse = Promise<LessonCount[]>;
export type GetBellsReponse = Promise<Bell[]>;
export type GetTimetableResponse = Promise<TimetableLesson[]>;
export type GetFilesResponse = Promise<File[]>;
export type GetGroupsResponse = Promise<Group[]>;
export type GetContactsResponse = Promise<Contact[]>;
export type GetGroupContactsResponse = Promise<Contact[]>;

declare function fetchSchools(): FetchSchoolsResponse;

export class Client {
  getAuthDetails(): AuthDetails;
  setAuthDetails(authDetails: AuthDetails): void;

  setStartDate(startDate: MashovDate): Client;
  setEndDate(endDate: MashovDate): Client;

  login(userDetails: UserDetails): LoginReponse;
  logout(): LogoutResponse;

  getConversations(query: ConversationsQuery, limit: number, skip: number): GetConversationsResponse;
  getConversation(conversationId: string): GetConversationResponse;
  getGrades(): GetGradesResponse;
  getBagrutGrades(): GetBagrutGradesResponse;
  getBehaveEvents(): GetBehaveEventsReponse;
  getLessonsCount(): GetLessonsCountResponse;
  getBells(): GetBellsReponse;
  getTimetable(): GetTimetableResponse;
  getFiles(): GetFilesResponse;
  getGroups(): GetGroupsResponse;
  getContacts(): GetContactsResponse;
  getGroupContacts(groupId: MashovGroupId): GetGroupContactsResponse;
}
