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
    password
  }).then((response) => {

    const authDetails = {};
    const cookies = response.headers['set-cookie'].map(e => extractCookie(e));

    authDetails.isAuthenticated = true;
    authDetails.csrfToken = response.headers['x-csrf-token'] || '';
    authDetails.uniqueId = cookies.find(e => e[0] === 'uniquId')[1];
    authDetails.mashovSessionId = cookies.find(e => e[0] === 'MashovSessionID')[1];

    authDetails.correlationId = response.data.credential.correlationId;
    authDetails.sessionId = response.data.credential.sessionId;
    authDetails.idNumber = response.data.credential.idNumber;
    authDetails.userId = response.data.credential.userId;

    return authDetails;
  });
};

export default loginController;
