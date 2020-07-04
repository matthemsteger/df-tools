import R from 'ramda';
import {parallel} from 'fluture';
import {fs} from './../../utility/fs';
import rawCreaturesParser from './../../dsl/parsers/raws/creatures/rawCreaturesParser';
import rawFiles from './rawFiles';
import types from './types';
import {modelCreatureRawFile} from './../../model/raws/creature';

/**
 * Parse creature raw text
 * @param {string} creatureRawText
 */
export function parseCreatureRawText(creatureRawsText) {
	return rawCreaturesParser.file.parse(creatureRawsText);
}

/**
 * Parse a single creature raw file
 * @param {string} rawFilePath
 */
export const parseCreatureRawFile = R.compose(
	R.map(parseCreatureRawText),
	(filePath) => fs.readFileFuture(filePath, {encoding: 'utf8', flag: 'r'})
);

/**
 * Parse creature raws given a root path
 * @param {string} dfRootPath
 */
export const parseCreatureRaws = R.compose(
	R.chain(
		R.compose(
			parallel(Number.POSITIVE_INFINITY),
			R.map(R.compose(parseCreatureRawFile, R.prop('filePath')))
		)
	),
	rawFiles[types.CREATURE]
);

export const modelParsedCreatureRaw = modelCreatureRawFile;
