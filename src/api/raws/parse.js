import R from 'ramda';
import {reject} from 'fluture';
import types from './types';
import {parseCreatureRawFile} from './creature';

export default R.curry((rawFileType, rawFilePath) => {
	switch (rawFileType) {
		case types.CREATURE:
			return parseCreatureRawFile(rawFilePath);
		default:
			return reject(
				new Error(`rawFileType of ${rawFileType} is not supported`)
			);
	}
});
