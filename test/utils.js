import { extractCookie, createCookieHeader, createQueryString } from '../lib/utils';

test('extractCookie', () => {
  const header = 'cookie1=val1; domain=.place.holder; path=/; secure; httponly';
  const res = extractCookie(header);

  expect(res).toEqual(expect.arrayContaining([
    'cookie1',
    'val1',
  ]));
});

test('createCookieHeader', () => {
  const cookies = [
    { name: 'cookie1', value: 'val1' },
    { name: 'cookie2', value: 'val2' },
  ];

  const res = createCookieHeader(cookies);

  expect(res).toEqual('cookie1=val1; cookie2=val2');
});

test('createQueryString', () => {
  const parts = [
    { name: 'par1', value: 'val1' },
    { name: 'par2', value: 'val2' },
  ];

  const res = createQueryString(parts);

  expect(res).toEqual('?par1=val1&par2=val2');
});
