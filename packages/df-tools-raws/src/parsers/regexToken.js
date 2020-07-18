const TOKEN_LANGUAGE_REGEX = /\[?([A-Z_]+)((?::[^\]\r\n]+)*)]/g;
const ARGUMENT_REGEX = /:([^\]\r\n:]+)/g;

function regexParseArguments(rawArgumentSequence, tokenStartIdx) {
	const args = [];
	if (!rawArgumentSequence) {
		return args;
	}

	const matches = rawArgumentSequence.matchAll(ARGUMENT_REGEX);
	// eslint-disable-next-line no-restricted-syntax
	for (const match of matches) {
		const [original, arg] = match;
		const {index: startIndex} = match;
		const start = startIndex + 1 + tokenStartIdx;

		args.push({
			start,
			get end() {
				return start + original.length - 1;
			},
			value: arg
		});
	}

	return args;
}

export default function regexParseTokens(input) {
	const tokens = [];
	const matches = input.matchAll(TOKEN_LANGUAGE_REGEX);
	// eslint-disable-next-line no-restricted-syntax
	for (const match of matches) {
		const [original, name, rawArgumentSequence] = match;
		const {index: startIndex} = match;
		const start = startIndex + 1;
		const end = startIndex + name.length;
		const args = regexParseArguments(rawArgumentSequence, end);

		tokens.push({
			name,
			start,
			end,
			args,
			original
		});
	}

	return tokens;
}
