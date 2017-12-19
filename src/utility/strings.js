import R from 'ramda';

export const pad = R.curry((padStr, str) => `${padStr}${str}${padStr}`); // eslint-disable-line import/prefer-default-export

