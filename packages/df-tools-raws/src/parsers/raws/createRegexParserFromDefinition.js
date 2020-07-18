import {find, propEq} from 'ramda';
import regexParseTokens from '../regexToken';

const LABEL_REGEX = /^\s*([^\r\n[]+)\s*/;

function parseSimpleRawFile(input) {
	const [, label] = input.match(LABEL_REGEX);

	const result = {label, objects: [], rawObjectTokens: []};
	const parsedTokens = regexParseTokens(input);

	let detectedObjectTypeName;
	parsedTokens.forEach((token, idx) => {
		const {name} = token;
		if (idx === 0 && name === 'OBJECT') {
			result.objectType = token;
		} else {
			if (idx === 1) {
				detectedObjectTypeName = name;
			}

			if (name === detectedObjectTypeName) {
				result.objects.push({
					...token,
					children: []
				});
				result.rawObjectTokens.push(token);
			} else {
				result.rawObjectTokens.push(token);
				result.objects[result.objects.length - 1].children.push(token);
			}
		}
	});

	return result;
}

/**
 * Temporary brute force, not very elegant
 */
function buildRawFromDefinition(definition, tokens, tokenIdx = 0) {
	const {name, children, possibleChildNames} = definition;
	const {name: tokenName} = tokens[tokenIdx];

	if (name === tokenName) {
		const resultToken = {...tokens[tokenIdx]};
		let nextTokenIdx = tokenIdx;
		if (
			children &&
			children.length > 0 &&
			!!tokens[tokenIdx + 1] &&
			possibleChildNames.includes(tokens[tokenIdx + 1].name)
		) {
			resultToken.children = [];
			let childDefinition;
			let token;
			do {
				childDefinition = find(
					propEq(
						'name',
						tokens[nextTokenIdx + 1] &&
							tokens[nextTokenIdx + 1].name
					),
					children
				);

				const result =
					childDefinition &&
					buildRawFromDefinition(
						childDefinition,
						tokens,
						nextTokenIdx + 1
					);

				if (result) {
					token = result.token;
					resultToken.children.push(token);
					nextTokenIdx = result.tokenIdx;
				}
			} while (childDefinition && token);
		}

		return {token: resultToken, tokenIdx: nextTokenIdx};
	}

	return null;
}

export default function createRegexParserFromDefinition(definition) {
	return function rawRegexParser(input) {
		const {label, objectType, rawObjectTokens} = parseSimpleRawFile(input);

		let tokenIdx = 0;
		const objects = [];
		while (tokenIdx < rawObjectTokens.length) {
			const result = buildRawFromDefinition(
				definition,
				rawObjectTokens,
				tokenIdx
			);
			if (result) {
				tokenIdx = result.tokenIdx + 1;
				objects.push(result.token);
			}
		}

		return {
			label,
			objectType,
			objects
		};
	};
}
