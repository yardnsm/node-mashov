/**
 * Extract cookie name & value from header.
 *
 *    'cookie1=val1; path=/...' ==> ['cookie1', 'val1']
 *
 * @param {string} header - The `Cookie` header to parse
 * @returns {string[]}
 */
export const extractCookie = header => header.split(';')[0].split('=');

/**
 * Create a simple `Cookie` header.
 *
 *    [{ name: 'c1', value: 'v1' }, { name: 'c2', value: 'v2' }] ==> 'c1=v1; c2=v2'
 *
 * @param {Object[]} cookies
 * @param {string} cookies[].name - Name of the cookie
 * @param {string} cookies[].value - Cookie's value
 * @returns {string}
 */
export const createCookieHeader = cookies =>
  cookies.filter(e => e.value).map(e => [e.name, e.value].join('=')).join('; ');

/**
 * Create a query string
 *
 *    [{ name: 'c1', value: 'v1' }, { name: 'c2', value: 'v2' }] ==> 'c1=v1&c2=v2'
 *
 * @param {Object[]} parts
 * @param {string} parts[].name
 * @param {string} parts[].value
 * @returns {string}
 */
export const createQueryString = parts =>
  `${parts.filter(e => e.value).map(e => [e.name, e.value].join('=')).join('&')}`;
