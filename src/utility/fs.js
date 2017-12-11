import _fs from 'fs';
import R from 'ramda';
import Maybe from 'folktale/maybe';
import {futurifyAll} from './futurify';

const fs = futurifyAll(_fs);

export {fs};

export const maybeDirHasFile = R.curry((fileName, directoryPath) =>
	R.compose(
		R.map(R.compose(
			Maybe.fromNullable,
			R.find(R.equals(fileName))
		)),
		fs.readdirFuture
	)(directoryPath)
);
