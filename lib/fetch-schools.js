import axios from 'axios';
import { endpoints } from './api-config';

const fetchSchools = () =>
  axios.get(endpoints.schools)
    .then(response => response.data)
    .then(schools => schools.map(s => ({
      id: s.semel,
      name: s.name,
      years: s.years
    })));

export default fetchSchools;