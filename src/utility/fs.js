import _fs from 'fs';
import R from 'ramda';
import Maybe from 'folktale/maybe';
import _glob from 'glob';
import {encaseN, encaseN2} from 'fluture';
import _md5File from 'md5-file';
import {futurifyAll} from './futurify';

const fs = futurifyAll(_fs);
const glob = encaseN2(_glob);
const md5File = encaseN(_md5File);

export {fs};
export {glob};

export const maybeDirHasFile = R.curry((fileName, directoryPath) =>
	R.compose(
		R.map(R.compose(Maybe.fromNullable, R.find(R.equals(fileName)))),
		fs.readdirFuture
	)(directoryPath)
);

/**
 * @typedef FileMeta
 * @property {string} filePath
 * @property {string} hash
 */

/**
 * Get the file metadata from a file path
 * @param {string} filePath
 * @returns {Future<FileMeta>}
 */
export function fileMeta(filePath) {
	return R.compose(
		R.map(R.compose(R.assoc('filePath', filePath), R.objOf('hash'))),
		md5File
	)(filePath);
}

export const readUtf8File = R.converge(fs.readFileFuture, [
	R.identity,
	R.always('utf8')
]);
