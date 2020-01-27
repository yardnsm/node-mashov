import { endpoints } from '../api-config';

const bagrutGradesController = (axios, payload) =>
  axios.get(endpoints.bagrutGrades(payload.userId))
    .then(response => response.data)
    .then(data => data.map(e => ({
      id: e.semel,
      name: e.name,
      yearly: e.shnaty,
      test: e.test,
      final: e.final,
    })));

export default bagrutGradesController;
