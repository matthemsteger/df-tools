import _fs from 'fs';
import R from 'ramda';
import Maybe from 'folktale/maybe';
import _glob from 'glob';
import {encaseN2} from 'fluture';
import {futurifyAll} from './futurify';

const fs = futurifyAll(_fs);
const glob = encaseN2(_glob);

export {fs};
export {glob};

export const maybeDirHasFile = R.curry((fileName, directoryPath) =>
	R.compose(
		R.map(R.compose(
			Maybe.fromNullable,
			R.find(R.equals(fileName))
		)),
		fs.readdirFuture
	)(directoryPath)
);
