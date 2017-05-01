# node-mashov [WIP]

[![Build Status](https://travis-ci.org/yardnsm/node-mashov.svg?branch=master)](https://travis-ci.org/yardnsm/node-mashov)

> A node.js wrapper for [Mashov](http://www.mashov.info/) API.

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
  username: '123456789',
  password: 'shhhhhh',
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

#### new Client()

Create a new client instance.

```javascript
new Client(options);
```

##### options

Type: `Object`

###### username
###### password
###### school

The user's school, see [`fetchSchools`](#fetchschools).

#### Client#login()

Returns: `Promise`

Authenticate the user.

> The following methods are available only after a successful login

#### Client#getUser()
#### Client#getGrades()
#### Client#getBagrutGrades()
#### Client#getBehaveEvents()
#### Client#getGroups()
#### Client#getTimetable()
#### Client#getContacts()
#### Client#getInbox()

---

## See also

- [mashov-api](https://gitlab.com/yoavst/mashov-api) - Mashov API for JVM platform

## License

MIT © [Yarden Sod-Moriah](http://yardnsm.net/)
