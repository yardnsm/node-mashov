import { endpoints } from '../api-config';

const bellsController = axios =>
  axios.get(endpoints.bells)
    .then(response => response.data)
    .then(data => data.map(e => ({
      lesson: e.lessonNumber,
      startTime: e.startTime,
      endTime: e.endTime
    })));

export default bellsController;
