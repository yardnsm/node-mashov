# node-mashov [WIP]

[![Build Status](https://travis-ci.org/yardnsm/node-mashov.svg?branch=master)](https://travis-ci.org/yardnsm/node-mashov)

> A node.js wrapper for [Mashov](http://www.mashov.info/) API.

Note that:
- This wrapper focuses on student accounts, so don't expect for parental/teachers accounts support.
- I was afraid to test messages sending, so there isn't such feature here.

For a full list of features, consult the [API](#api) section.

## Install

```console
npm install --save node-mashov
```

## Usage

### Example usage

```javascript
import { fetchSchools, Client } from 'node-mashov';

const schools = await fetchSchools();
const school = schools.find(s => s.name.includes('myschool'));
  
const client = new Client({
  username: 'username',
  password: 'supersecret',
  year: school.years[school.years.length - 1],
  school
});

client.login()
  .then(client.getGrades)
  .then((grades) => {
    console.log(grades);
  });
```

### API

#### fetchSchools()

Returns a `Promise` for an `Array` of schools.

#### new Client(userDetails)

Create a new client instance.

##### userDetails

Type: `Object`

###### username
###### password
###### year
###### school

#### Client#login()

Returns a `Promise`.

#### Client#getAllConversations([query], [limit], [skip])

Getting the user's conversations.

##### query

Type: `Object`, `string`<br>
Default: `'inbox'`

If string, it'll fetch all of the messages matched the type. It could be in of the following:
- `'inbox'` - Inbox
- `'archive'` - Archived messages
- `'unread'` - Unread messages
- `'deleted'` - Deleted messages
- `'sent'` - Messages sent
- `'draft'` - Drafts

###### in

Type: `string`<br>
Default: `'all'`

- `'all'` - All conversations
- `'inbox'` - Inbox
- `'unread'` - Unread messages

###### sender
###### receiver
###### subject
###### content

Type: `string`

###### attachment

Type: `boolean`<br>
Default: `false`

###### fromDate
###### toDate

Type: `string`<br>
Format: `YYYY-MM-DD`

An example for query:

```javascript
{
  in: 'unread',
  sender: 'teacher',
  receiver:  'student',
  subject: 'Bring your books tomorrow',
  attachment: true,
  dromDate: '2017-05-01'
}
```

##### limit

Type: `number`<br>
Default: `20`

Number of messages to fetch (from start).

##### skip

Type: `number`<br>
Default: `0`

Number of messages to skip. Can be useful for pagination.

#### Client#getSingleConversation(conversationId)

Get a single conversation.

> Example usage:
> ```javascript
> client.getAllConversations()
>   .then(convs => convs[0].id)
>   .then(client.getSingleConversation)
>   .then((conv) => {
>     console.log(conv);
>   });
> ```

#### Client#getGrades()
#### Client#getBagrutGrades()

#### Client#getUser()
#### Client#getBehaveEvents()
#### Client#getGroups()
#### Client#getTimetable()
#### Client#getContacts()

---

## See also

- [mashov-api](https://gitlab.com/yoavst/mashov-api) - Mashov API for JVM platform

## License

MIT © [Yarden Sod-Moriah](http://yardnsm.net/)
