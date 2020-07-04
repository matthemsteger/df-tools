import {compose, curry, chain} from 'ramda';
import iconv from 'iconv-lite';
import {resolve} from 'path';
import {fs} from '@matthemsteger/utils-fn-fs';
import {encase} from 'fluture';

import createWorldSitesAndPopsParser from './parsers/worldSitesAndPops';

const {readFileFuture} = fs;

const readFile = (resolvedPath) => readFileFuture(resolvedPath, null);
const decode = (fileBuffer) => iconv.decode(fileBuffer, 'cp437');
const parse = curry((creatures, content) =>
	createWorldSitesAndPopsParser(creatures).file.tryParse(content)
);

const decodeAndParse = curry((creatures, buffer) =>
	compose(parse(creatures), decode)(buffer)
);

export default function parseWorldSitesAndPops({filePath, creatures}) {
	const resolvedPath = resolve(filePath);

	return chain(encase(decodeAndParse(creatures)), readFile(resolvedPath));
}
