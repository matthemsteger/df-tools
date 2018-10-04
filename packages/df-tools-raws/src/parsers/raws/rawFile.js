import P from 'parsimmon';
import {always, prop} from 'ramda';
import {noise} from '../utilities';
import objectTypeParser from './objectType';
import createObjectParser from './objects';

const fileLabel = always(P.regexp(/[a-z_]*/));
const fileObjectType = always(objectTypeParser);

/**
 * @typedef {object} Position
 * @property {number} offset
 * @property {number} line
 * @property {number} column
 */

/**
 * @template Value
 * @typedef {object} ParseNode
 * @property {string} name
 * @property {Value} value
 * @property {Position} start
 * @property {Position} end
 */

/**
 * @typedef {ParseNode<string>} ObjectTypeNode
 */

/**
 * Extract the value of a objectTypeNode
 * @function
 * @param {ObjectTypeNode} objectTypeNode
 * @returns {string}
 */
const extractObjectType = prop('value');

/**
 * @template T
 * @typedef {object} ObjectsParseResult
 * @property {T[]} objects
 * @property {ObjectTypeNode} objectType
 */

/**
 * Using the object type node, parse object types
 * @template T
 * @param {ObjectTypeNode} objectTypeNode
 * @returns {ObjectsParseResult<T>}
 */
function parseObjectTypes(objectTypeNode) {
	const objectType = extractObjectType(objectTypeNode);
	const objectParser = createObjectParser(objectType);
	return objectParser.many().map((objects) => ({
		objects,
		objectType: objectTypeNode
	}));
}

export default function createRawFileParser() {
	return P.createLanguage({
		file(lang) {
			return P.seqMap(
				lang.fileLabel,
				lang.fileObjectType.trim(noise).chain(parseObjectTypes),
				(label, {objectType, objects}) => ({
					label,
					objectType,
					objects
				})
			);
		},
		fileLabel,
		fileObjectType
	});
}
