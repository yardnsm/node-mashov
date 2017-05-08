import encodeUrl from 'encodeurl';
import { endpoints } from '../api-config';

const filesController = (axios, payload) =>
  axios.get(endpoints.files.all(payload.userId))
    .then(response => response.data)
    .then(data => data.map(e => ({
      id: e.fileId,
      name: e.fileName,
      groupName: e.ownerGroup,
      url: encodeUrl(endpoints.files.single(payload.userId, e.fileId, e.fileName))
    })));

export default filesController;
