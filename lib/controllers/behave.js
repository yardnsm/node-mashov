import { endpoints } from '../api-config';

const behaveController = (axios, payload) =>
  axios.get(endpoints.behave(payload.userId))
    .then(response => response.data)
    .then(data => data.map(e => ({
      groupId: e.groupId,
      lesson: e.lesson,
      date: e.lessonDate,
      type: e.achvaName,
      justification: e.justification,
      justificationId: e.justificationId,
      reporter: e.reporter,
      subject: e.subject,
    })));

export default behaveController;
