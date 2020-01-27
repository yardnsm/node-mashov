import { endpoints } from '../api-config';

const lessonsCountController = (axios, payload) =>
  axios.get(endpoints.lessonsCount(payload.userId))
    .then(response => response.data)
    .then(data => data.map(e => ({
      groupId: e.groupId,
      lessonCount: e.lessonCount,
      weeklyHours: e.weeklyHours,
    })));

export default lessonsCountController;
