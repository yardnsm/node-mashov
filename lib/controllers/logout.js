import { endpoints } from '../api-config';

const logoutController = axios =>
  axios.get(endpoints.logout);

export default logoutController;
