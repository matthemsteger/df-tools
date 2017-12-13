import P from 'parsimmon';
import R from 'ramda';
import _debug from 'debug';

const debug = _debug('df:dsl:parsers:tokenLanguage');

/**
 * This is the common token language of [BLAH:something:...] and is shared among raws
 * and settings.
 */

export const colon = P.string(':');
export const comment = P.regexp(/(?:[^\][\r\n]+(?!.*(?:]|\[))|[^\]\s]+(?![^[]*]))/);
export const commentOrWhitespace = comment.trim(P.optWhitespace).many();
export const isLanguageToken = R.flip(R.contains)(['[', ']', ':']);
export const rbracket = P.string(']');
export const tokenArgument = P.regexp(/[^:\]]+/);

export function spacedWithComments(parser) {
	// this should be a many since any amount of crap should be skipped
	return commentOrWhitespace
		.then(parser)
		.skip(commentOrWhitespace);
}

export function spaceAllWithComments(parsers) {
	return parsers.map((parser) => spacedWithComments(parser));
}

export const numRequiredInDefinitions = (definitions) => R.length(R.filter(R.any(R.both(R.is(Boolean), R.equals(true))), definitions));

export function createTokenParser(name, numArgs = 0, transformer) {
	// will need to take a NaN or equiv here as numArgs and then gather arguments
	// for dynamic tags that dont have a set amount of args
	let tokenArgumentParser;
	if (Number.isNaN(numArgs)) {
		tokenArgumentParser = P.seq(...[colon, tokenArgument]).atLeast(1);
	} else {
		tokenArgumentParser = P.seq(...[colon, tokenArgument]).times(numArgs);
	}

	const seq = [
		P.regexp(/\[?/).desc('optional start bracket'),
		P.string(name).desc('name'),
		tokenArgumentParser,
		rbracket.desc('end bracket')
	];

	return P.seq(...seq)
		.trim(P.optWhitespace)
		.map(
			R.compose(
				// R.when(R.always(R.is(Function, transformer)), (tokenArgs) => transformer(tokenArgs)),
				R.tail,
				R.reject(isLanguageToken),
				R.flatten
			)
		)
		.node(name);
}

export const makeDefinition = R.curry((required, transformToApply, args, tokenName) => {
	const transform = transformToApply ? transformToApply(tokenName) : undefined;
	return {
		name: tokenName,
		transform,
		required,
		args
	};
});

export const makeRequiredDefinition = makeDefinition(true);
export const makeOptionalDefinition = makeDefinition(false);

function convertObjectDefinition(definition) {
	debug('converting object definition %o', definition);
	const {name, args, transform, children} = definition;
	const defTokenParser = createTokenParser(name, args, transform);
	debug('defTokenParser is %o', defTokenParser);
	if (!R.length(children)) return defTokenParser;

	const numRequired = R.compose(R.length, R.filter(R.propEq('required', true)))(children);
	debug('creating child parsers from children %o', children);
	const childTokenParsers = spaceAllWithComments(children.map(convertObjectDefinition));
	return P.seqMap(
		defTokenParser,
		P.alt(...childTokenParsers).atLeast(numRequired),
		(defToken, tokenChildren) => ({children: tokenChildren, ...defToken})
	);
}

export function convertDefinition(definition) {
	debug('converting definition %o', definition);
	// definition is an array
	// [0] - token name
	// [1] - number of arguments
	// [2] - (array) - children
	// [2] - (boolean) - required
	// [3] - (boolean) - required (when children)
	// tokens are assumed optional
	if (!Array.isArray(definition)) return convertObjectDefinition(definition);

	const defTokenParser = createTokenParser(definition[0], definition[1]);
	if (definition.length < 3 || R.is(Boolean, definition[2])) return defTokenParser;

	const numRequired = numRequiredInDefinitions(definition[2]);
	const childTokenParsers = spaceAllWithComments(definition[2].map(convertDefinition));
	return P.seqMap(
		defTokenParser,
		P.alt(...childTokenParsers).atLeast(numRequired),
		(defToken, children) => ({children, ...defToken})
	);
}

