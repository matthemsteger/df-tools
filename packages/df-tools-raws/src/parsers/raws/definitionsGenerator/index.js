/**
 * Go through all tokens and output javascript objects
 * name, num args
 * import a json file with other meta added (in generated source)
 * sort by name
 */

import {
	mergeWith,
	reduceBy,
	prop,
	map,
	compose,
	reduce,
	toPairs,
	sortBy,
	nth,
	keys
} from 'ramda';
import {glob, readUtf8File} from '@matthemsteger/utils-fn-fs';
import {unlimitedParallel} from '@matthemsteger/utils-fn-futures';
import parser from './parser';
import generateTemplate from './template';

const findFiles = (pattern) => glob(pattern, {absolute: true, nodir: true});

/**
 * Read an array of file names
 * @function
 * @param {string[]} fileNames
 * @returns {Future<string[]>} array of file contents
 */
const readFiles = compose(
	unlimitedParallel,
	map(readUtf8File)
);

/**
 * Given two num args, figure out whether variable
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function resolveNumArgs(a, b) {
	return a === b ? a : Number.NaN;
}

/**
 * @typedef {object} Token
 * @property {string} name
 * @property {number} numArgs
 */

/**
 * Using two tokens, resolve number of args
 * @param {Number} a
 * @param {Token} b
 * @returns {number}
 */
function mergeTokenValues(a, {numArgs: b}) {
	if (a === undefined) return b;
	return resolveNumArgs(a, b);
}

/**
 * Merge two tokens of the same name
 * @function
 * @param {Token} a
 * @param {Token} b
 * @returns {Token}
 */
const mergeTokenHashes = mergeWith(resolveNumArgs);

/**
 * Parse tokens in a string
 * @param {string} tokensString
 * @returns {Token[]} tokens
 */
function parseTokens(tokensString) {
	const tokens = parser.many().tryParse(tokensString);
	return reduceBy(mergeTokenValues, undefined, prop('name'), tokens);
}

function generateDefinitions(fileGlob) {
	return findFiles(fileGlob)
		.chain(readFiles)
		.map(map(parseTokens))
		.map(reduce(mergeTokenHashes, {}));
}

export function outputDefinitions({fileGlob}) {
	return generateDefinitions(fileGlob).map((definitionsHash) => {
		const definitions = toPairs(definitionsHash);
		const sortedDefinitions = sortBy(nth(0), definitions);
		return generateTemplate(sortedDefinitions);
	});
}

export function outputTokenNames({fileGlob}) {
	return generateDefinitions(fileGlob).map((definitionsHash) =>
		keys(definitionsHash)
			.sort()
			.join(', ')
	);
}
