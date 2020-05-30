import { endpoints } from '../api-config';

const onlineLessonsController = axios =>
  axios.get(endpoints.onlineLessons.all)
    .then(response => response.data)
    .then(data => data.map(e => ({
      lessonId: e.confid || e.confId,
      name: e.name,
      teacher: e.creatorName,
      startTime: e.startDate,
      endTime: e.endDate,
      joinLink: endpoints.onlineLessons.join(e.confid || e.confId),
    })));

export default onlineLessonsController;
