import { extractCookie } from '../utils';
import { endpoints, apiVersion, appName } from '../api-config';

const loginController = (axios, payload) => {
  const { school, year, username, password } = payload;

  return axios.post(endpoints.login, {
    apiVersion,
    appName,
    school,
    semel: school.id,
    year,
    username,
    password,
  }).then((response) => {
    const cookies = response.headers['set-cookie'].map(e => extractCookie(e));

    return {
      isAuthenticated: true,
      csrfToken: response.headers['x-csrf-token'] || '',
      uniqueId: cookies.find(e => e[0] === 'uniquId')[1],
      mashovSessionId: cookies.find(e => e[0] === 'MashovSessionID')[1],
      correlationId: response.data.credential.correlationId,
      sessionId: response.data.credential.correlationId,
      userId: response.data.credential.userId,
    };
  });
};

export default loginController;
