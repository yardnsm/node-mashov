import { endpoints } from '../api-config';

const gradesController = (axios, payload) =>
  axios.get(endpoints.grades(payload.userId))
    .then(response => response.data)
    .then(data => data.map(e => ({
      teacher: e.teacherName,
      groupId: e.groupId,
      subject: e.subjectName,
      date: e.eventDate,
      type: e.gradeType,
      event: e.gradingEvent,
      grade: e.grade
    })));

export default gradesController;
