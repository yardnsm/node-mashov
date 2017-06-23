import { endpoints } from '../api-config';

const groupsController = (axios, payload) =>
  axios.get(endpoints.groups(payload.userId))
    .then(response => response.data)
    .then(data => data.map(e => ({
      id: e.groupId,
      name: e.groupName,
      subject: e.subjectName,
      teacher: e.teacherName,
    })));

export default groupsController;
