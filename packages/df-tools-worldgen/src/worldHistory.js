import {compose, chain} from 'ramda';
import iconv from 'iconv-lite';
import {resolve} from 'path';
import {fs} from '@matthemsteger/utils-fn-fs';
import {encase} from 'fluture';

import createWorldHistoryParser from './parsers/worldHistory';

const {readFileFuture} = fs;

const readFile = (resolvedPath) => readFileFuture(resolvedPath, null);
const decode = (fileBuffer) => iconv.decode(fileBuffer, 'cp437');
const parse = (content) => createWorldHistoryParser().tryParse(content);

const decodeAndParse = compose(parse, decode);

export default function parseWorldHistory({dfRootPath}) {
	const resolvedPath = resolve(dfRootPath);

	return chain(encase(decodeAndParse), readFile(resolvedPath));
}
