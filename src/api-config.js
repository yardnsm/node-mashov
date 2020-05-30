export const baseUrl = 'https://web.mashov.info/api';
export const apiVersion = '3.20190301';
export const appName = 'com.mashov.main';

export const endpoints = {
  schools: `${baseUrl}/schools`,
  login: `${baseUrl}/login`,
  logout: `${baseUrl}/logout`,

  conversations: {
    inbox: () => `${baseUrl}/mail/inbox/conversations`,
    archive: () => `${baseUrl}/mail/archive/conversations`,
    unread: () => `${baseUrl}/mail/unread/conversations`,
    deleted: () => `${baseUrl}/mail/deleted/conversations`,
    sent: () => `${baseUrl}/mail/sent/conversations`,
    drafts: () => `${baseUrl}/mail/drafts/conversations`,
    search: searchQuery => `${baseUrl}/mail/search/${searchQuery}/conversations`,
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

  onlineLessons: {
    all: `${baseUrl}/bbb`,
    join: lessonId => `${baseUrl}/bbb/join/${lessonId}`,
  },
};
