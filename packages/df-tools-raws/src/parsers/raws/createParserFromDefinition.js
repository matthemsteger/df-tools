import P from 'parsimmon';
import {compose, length, filter, propEq, sortBy, path} from 'ramda';
import createTokenParser from '../token';
import {commentOrWhitespace} from '../utilities';

const sortByStartOffset = sortBy(path(['start', 'offset']));

function makeOriginalToken(token) {
	const {name, value} = token;
	const values = value.map((t) => t.value).join(':');
	return `[${name}${values.length > 0 ? ':' : ''}${values}]`;
}

/**
 * @typedef {object} TokenDefinition
 * @property {string} name
 * @property {number} numArgs
 * @property {TokenDefinition[]} [children]
 * @property {boolean} [required]
 */

/**
 * @typedef {TokenDefinition[]} RawParserDefinition
 */

/**
 * Counts the number of required children
 * @function
 * @param {RawParserDefinition[]} definitions
 * @returns {number}
 */
const countRequiredChildren = compose(length, filter(propEq('required', true)));

/**
 * Create a parser from a definition
 * @param {RawParserDefinition} definition
 */
export default function createParserFromDefinition(definition) {
	const {name, numArgs, children} = definition;
	const tokenParser = createTokenParser(name, numArgs).trim(
		commentOrWhitespace
	);
	if (!Array.isArray(children))
		return tokenParser.map((t) => ({...t, original: makeOriginalToken(t)}));

	const numRequiredChildren = countRequiredChildren(children);
	const childrenParsers = children
		.map(createParserFromDefinition)
		.map((parser) => parser.trim(commentOrWhitespace));

	return P.seqMap(
		tokenParser,
		P.alt(...childrenParsers).atLeast(numRequiredChildren),
		(token, allChildren) => ({
			children: sortByStartOffset(allChildren),
			...token,
			original: makeOriginalToken(token)
		})
	);
}
