import R from 'ramda';

export const parseInteger = R.flip(R.curry(Number.parseInt)); // eslint-disable-line import/prefer-default-export
export const parseBase10Int = parseInteger(10);
