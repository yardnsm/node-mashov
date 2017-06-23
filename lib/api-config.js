export const baseUrl = 'https://svc.mashov.info/api';
export const apiVersion = '3.2017032';
export const appName = 'com.mashov.main';

export const endpoints = {
  schools: `${baseUrl}/schools`,
  login: `${baseUrl}/login`,
  logout: `${baseUrl}/logout`,

  conversations: {
    inbox: query => `${baseUrl}/mail/inbox/conversations/${query}`,
    archive: query => `${baseUrl}/mail/archive/conversations/${query}`,
    unread: query => `${baseUrl}/mail/unread/conversations/${query}`,
    deleted: query => `${baseUrl}/mail/deleted/conversations/${query}`,
    sent: query => `${baseUrl}/mail/sent/conversations/${query}`,
    drafts: query => `${baseUrl}/mail/drafts/conversations/${query}`,
    search: (searchQuery, query) => `${baseUrl}/mail/search/${searchQuery}/conversations/${query}`,
    single: convId => `${baseUrl}/mail/conversations/${convId}`,
  },

  grades: userId => `${baseUrl}/students/${userId}/grades`,
  bagrutGrades: userId => `${baseUrl}/students/${userId}/bagrut/grades`,
  behave: userId => `${baseUrl}/students/${userId}/behave`,
  lessonsCount: userId => `${baseUrl}/students/${userId}/lessonsCount`,
  bells: `${baseUrl}/bells`,
  timetable: userId => `${baseUrl}/students/${userId}/timetable`,

  files: {
    all: userId => `${baseUrl}/students/${userId}/files`,
    single: (userId, fileId, fileName) => `${baseUrl}/students/${userId}/files/${fileId}/${fileName}`,
  },

  groups: userId => `${baseUrl}/students/${userId}/groups`,

  contacts: {
    student: userId => `${baseUrl}/students/${userId}/alfon`,
    group: groupId => `${baseUrl}/groups/${groupId}/alfon`,
  },
};
