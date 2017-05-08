export const extractCookie = header => header.split(';')[0].split('=');

export const createCookieHeader = cookies =>
  cookies.map(e => [e.name, e.value].join('=')).join('; ');

export const createQueryString = parts =>
  `?${parts.filter(e => e.value).map(e => [e.name, e.value].join('=')).join('&')}`;
