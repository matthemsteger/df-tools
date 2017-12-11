import _fs from 'fs';
import R from 'ramda';
import {parallel} from 'fluture';
import {futurifyAll} from './../../utility/futurify';
import rawCreaturesParser from './../../dsl/parsers/raws/creatures/rawCreaturesParser';
import rawFiles from './rawFiles';

const fs = futurifyAll(_fs);

export function parseCreatureRawText(creatureRawsText) {
	return rawCreaturesParser.file.parse(creatureRawsText);
}

export const parseCreatureRawFile = R.compose(
	R.map(parseCreatureRawText),
	(filePath) => fs.readFileFuture(filePath, {encoding: 'utf8', flag: 'r'})
);


export const parseCreatureRaws = R.compose(
	R.chain(R.compose(parallel(Number.POSITIVE_INFINITY), R.map(parseCreatureRawFile))),
	rawFiles.creature
);
