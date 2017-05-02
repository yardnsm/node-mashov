export const baseUrl = 'https://svc.mashov.info/api';
export const apiVersion = '3.2017032';
export const appName = 'com.mashov.main';

export const endpoints = {
  schools: `${baseUrl}/schools`,
  login: `${baseUrl}/login`,

  grades: userId => `${baseUrl}/students/${userId}/grades`
};
