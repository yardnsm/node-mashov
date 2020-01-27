import { endpoints } from '../api-config';

const timetableController = (axios, payload) =>
  axios.get(endpoints.timetable(payload.userId))
    .then(response => response.data)
    .then(data => data.map(e => ({
      groupId: e.timeTable.groupId,
      day: e.timeTable.day,
      lesson: e.timeTable.lesson,
      subject: e.groupDetails.subjectName,
      teacher: e.groupDetails.teacherName,
    })));

export default timetableController;
