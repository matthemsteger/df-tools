import P from 'parsimmon';
import R from 'ramda';

export const genericParseInt = R.flip(R.curry(Number.parseInt))(10);

export const isLanguageToken = R.flip(R.contains)(['[', ']', ':']);

// export const comment = P.regexp(/[^\]\s]+(?![^[]*])/); orig
// export const comment = P.regexp(/[^\][\r\n]+(?!.*])/); better
export const comment = P.regexp(
	/(?:[^\][\r\n]+(?!.*(?:]|\[))|[^\]\s]+(?![^[]*]))/
);

// export const commentOrWhitespace = P.regexp(/[^\]]*(?![^[]*])/);
export const commentOrWhitespace = comment.trim(P.optWhitespace).many();

// [^\]]*(?![^[\s]*])
// \[?[A-Z_]+(?::.*]|]) -> regex for an entire token, allows tokens not starting with [
// \[?[A-Z_]+(?::[^\]\r\n]+)*] -> even better all tokens

export const rawTag = P.regexp(/\s*(\[?[A-Z_]+(?::[^\]\r\n]+)*])\s*/, 1);

export const lbracket = P.string('[');

export const rbracket = P.string(']');

export const colon = P.string(':');

export function spaced(parser) {
	return P.optWhitespace.then(parser).skip(P.optWhitespace);
}

export function spaceAll(parsers) {
	return parsers.map((parser) => spaced(parser));
}

function spacedWithComments(parser) {
	// this should be a many since any amount of crap should be skipped
	return commentOrWhitespace.then(parser).skip(commentOrWhitespace);
}

function spaceAllWithComments(parsers) {
	return parsers.map((parser) => spacedWithComments(parser));
}

export const tokenArgument = P.regexp(/[^:\]]+/);

// a token can be surrounded by white space
// comments can be surrounded by white space
// comments and whitespace can be anything except [, chars]

export function createTokenParser(name, numArgs = 0) {
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
				R.tail,
				R.reject(isLanguageToken),
				R.flatten
			)
		)
		.node(name);
}

// a token is a node, the node has a children property that are the tokens children
// the identifier for the node is the node name, camel cased
// a helper can describe an entire tree of a raw easily

/*
const blah = {
	rawObject: 'ITEM_AMMO',
	children: [
		['NAME', 2],
		['CLASS', 1],
		['SIZE', 1],
		['ATTACK', 7, [
			['ATTACK_PREPARE_AND_RECOVER', 2]
		]]
	]
};
*/

function convertDefinition(definition) {
	// definition is an array
	// [0] - token name
	// [1] - number of arguments
	// [2] - (array) - children
	// [2] - (boolean) - required
	// [3] - (boolean) - required (when children)
	// tokens are assumed optional
	const defTokenParser = createTokenParser(definition[0], definition[1]);
	if (definition.length < 3 || R.is(Boolean, definition[2]))
		return defTokenParser;

	const numRequired = R.filter(
		R.any(R.both(R.is(Boolean), R.equals(true))),
		definition[2]
	).length;
	const childTokenParsers = spaceAllWithComments(
		definition[2].map(convertDefinition)
	);
	return P.seqMap(
		defTokenParser,
		P.alt(...childTokenParsers).atLeast(numRequired),
		(defToken, children) => ({children, ...defToken})
	);
}

export function createRawFileParser(rawDefinition) {
	const {
		rawObject: rawObjectTagName,
		children: childrenDefinitions
	} = rawDefinition;
	return P.createLanguage({
		file(lang) {
			return P.seqMap(
				lang.label.thru(spaced),
				lang.objectType.thru(spaced),
				lang.objects,
				(label, objectType, objects) => ({
					label,
					objectType,
					objects
				})
			);
		},
		label() {
			return comment;
		},
		objectType: () => createTokenParser('OBJECT', 1),
		objects: (lang) => lang.rawObject.many(),
		rawObject: () => {
			const numRequired = R.filter(
				R.any(R.both(R.is(Boolean), R.equals(true))),
				childrenDefinitions
			).length;
			const childTokenParsers = spaceAllWithComments(
				childrenDefinitions.map(convertDefinition)
			);
			return P.seqMap(
				spacedWithComments(createTokenParser(rawObjectTagName, 1)),
				P.alt(...childTokenParsers).atLeast(numRequired),
				(rawObject, children) => ({...rawObject, children})
			);
		}
	});
}

/*
export default P.createLanguage({
	file(lang) {
		return P.seqMap(
			lang.label.thru(spaced),
			lang.objectType.thru(spaced),
			lang.ammunitions,
			(label, objectType, ammunitions) => ({
				label,
				objectType,
				ammunitions
			})
		);
	},
	label() {
		return comment;
	},
	objectType: () => createTokenParser('OBJECT', 1),
	ammunitions(lang) {
		return lang.itemAmmo.many();
	},
	itemAmmo(lang) {
		const childTokenParsers = spaceAll([
			lang.name,
			lang.ammoClass,
			lang.size,
			lang.attack
		]);

		return P.seqMap(
			createTokenParser('ITEM_AMMO', 1),
			P.alt(...childTokenParsers).times(childTokenParsers.length),
			(itemAmmo, children) => {
				return {itemAmmo, children};
			}
		);

		// return createTokenParser('ITEM_AMMO', 1).chain(([id]) => {
		// 	// need to take all parsers in child, in any order, at least one
		// 	return P.alt(...childTokenParsers).times(childTokenParsers.length);
		// });
	},
	name: () => createTokenParser('NAME', 2),
	ammoClass: () => createTokenParser('CLASS', 1),
	size: () => createTokenParser('SIZE', 1),
	attack: () => attack
});

 */
