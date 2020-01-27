import { endpoints } from '../api-config';

const transformContactsData = data => data.map(e => ({
  firstName: e.privateName,
  lastName: e.familyName,
  classCode: e.classCode,
  classNumber: e.classNum,
  city: e.city,
  address: e.address,
  email: e.email,
  phone: e.phone,
  cellphone: e.cellphone,
}));

const student = (axios, payload) =>
  axios.get(endpoints.contacts.student(payload.userId))
    .then(response => response.data)
    .then(transformContactsData);

const group = (axios, payload) =>
  axios.get(endpoints.contacts.group(payload.groupId))
    .then(response => response.data)
    .then(transformContactsData);

export default { student, group };
