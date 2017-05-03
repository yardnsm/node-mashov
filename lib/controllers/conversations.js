import encodeUrl from 'encodeurl';
import { endpoints } from '../api-config';
import { createQueryString } from '../utils';

/**
 * Just don't expect to understand this, I
 * really don't want to test this.
 */
const createSearchQuery = query => Object.keys(query).map((e) => {
  const val = query[e];
  switch (e) {
    case 'in':
      return `ב:(${val})`;
    case 'sender':
      return `מאת:(${val})`;
    case 'receiver':
      return `אל:(${val})`;
    case 'subject':
      return `נושא:(${val})`;
    case 'body':
      return `תוכן:(${val})`;
    case 'attachment':
      return 'יש:(קבצים)';
    case 'fromDate':
      return `מ:(${val})`;
    case 'toDate':
      return `עד:(${val})`;
    default:
      return '';
  }
}).join(' ');

const all = (axios, payload) => {
  let { query, limit, skip } = payload;

  query = query || 'inbox';
  limit = limit || 20;
  skip = skip || 0;

  const urlQueryString = createQueryString([
    { name: 'take', value: limit },
    { name: 'skip', value: skip }
  ]);

  const endpoint = typeof query === 'string' ?
    endpoints.conversations[query](urlQueryString) :
    endpoints.conversations.search(encodeUrl(createSearchQuery(query)), urlQueryString);

  return axios.get(endpoint)
    .then(response => response.data)
    .then(data => data.map(e => ({
      id: e.conversationId,
      subject: e.subject,
      unread: e.isNew,
      hasAttachments: e.hasAttachments,
      messages: e.messages.map(m => ({
        id: m.messageId,
        sender: m.senderName,
        subject: m.subject,
        timestamp: m.sendTime
      }))
    })));
};

const single = (axios, payload) =>
  axios.get(endpoints.conversations.single(payload.conversationId))
      .then(response => response.data)
      .then(data => ({
        id: data.conversationId,
        subject: data.subject,
        unread: data.isNew,
        hasAttachments: data.hasAttachments,
        messages: data.messages.map(m => ({
          id: m.messageId,
          sender: m.senderName,
          subject: m.subject,
          body: m.body,
          timestamp: m.sendTime,
          unread: m.isNew,
          deleted: m.isDeleted,
          attachments: (m.files || []).map(f => ({
            id: f.fileId, name: f.fileName
          }))
        }))
      }));

export default { all, single };
