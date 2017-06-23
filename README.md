# node-mashov

[![Build Status](https://travis-ci.org/yardnsm/node-mashov.svg?branch=master)](https://travis-ci.org/yardnsm/node-mashov)
[![Stability](https://img.shields.io/badge/stability-experimental-orange.svg)]()

> A node.js wrapper for [Mashov](http://www.mashov.info/) API.

Note that:

- This wrapper focuses on student accounts, so don't expect for parental/teacher accounts support.
- I was too scared to test messages sending, so there isn't such feature here.
- I am not affiliated with Mashov in any way.

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

> Sample reponses from the API can be found [here](test/fixtures).

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

**All of the following methods return a `Promise`**

#### Client#login()

Authenticate using the details provided in the constructor.

#### Client#logout()

Deauthenticate and destroy authentication details.

#### Client#getConversations([query], [limit], [skip])

Getting the user's conversations.

##### query

Type: `Object`, `string`<br>
Default: `'inbox'`

Mashov's API lets you query conversations. This wrapper does include support for that.

If `query` is a `string`, it'll fetch all of the messages matched the type. It could be one of the following:

- `'inbox'` - Inbox
- `'archive'` - Archived messages
- `'unread'` - Unread messages
- `'deleted'` - Deleted messages
- `'sent'` - Messages sent
- `'draft'` - Drafts

Otherwise, you can use a more complex query by making `query` into an object,
with the following properties:

###### in

Type: `string`<br>
Default: `'all'`

- `'all'` - All conversations
- `'inbox'` - Inbox
- `'unread'` - Unread messages

###### sender
###### receiver
###### subject
###### body

Type: `string`

###### attachment

Type: `boolean`<br>
Default: `false`

If `true`, will query all the conversations that has an attachment. If `false`, it'll query
conversations with or without attachments.

###### fromDate
###### toDate

Type: `string`<br>
Format: `YYYY-MM-DD`

> **An example for a valid query:**
> ```javascript
> {
>   in: 'unread',
>   sender: 'teacher',
>   receiver: 'student',
>   subject: 'Bring your books tomorrow',
>   attachment: true,
>   dromDate: '2017-05-01'
> }
> ```

##### limit

Type: `number`<br>
Default: `20`

Number of messages to fetch (from start).

##### skip

Type: `number`<br>
Default: `0`

Number of messages to skip. Can be useful for pagination.

#### Client#getConversation(conversationId)

Fetch a single conversation.

> **Example usage:**
> ```javascript
> client.getAllConversations()
>   .then(convs => convs[0].id)
>   .then(client.getConversation)
>   .then((conv) => {
>     console.log(conv);
>   });
> ```

#### Client#getGrades()
#### Client#getBagrutGrades()
#### Client#getBehaveEvents()
#### Client#getLessonsCount()

#### Client#getBells()

Will fetch the user's school's bell schedule.

#### Client#getTimetable()

#### Client#getFiles()

Will fetch the user's files (aka study meterials)

#### Client#getGroups()
#### Client#getContacts()

#### Client#getGroupContacts()

> **Example usage:**
> ```javascript
> client.getGroups()
>   .then(groups => groups[0].id)
>   .then(client.getGroupsContact)
>   .then((contacts) => {
>     console.log(contacts);
>   });
> ```

---

## See also

- [mashov-api](https://gitlab.com/yoavst/mashov-api) - Mashov API for JVM platform

## License

MIT © [Yarden Sod-Moriah](http://yardnsm.net/)
