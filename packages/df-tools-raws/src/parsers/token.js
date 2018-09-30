import P from 'parsimmon';
import {colon, tokenArgument, rbracket} from './utilities';

const argumentSequence = colon.then(tokenArgument.mark());

export default function createTokenParser(name, numArgs = 0) {
	const tokenArgumentParser = Number.isNaN(numArgs)
		? argumentSequence.atLeast(1)
		: argumentSequence.times(numArgs);

	return P.seq(
		P.regexp(/\[?/).desc('optional start bracket'),
		P.string(name).desc('name')
	)
		.then(tokenArgumentParser)
		.skip(rbracket)
		.node(name);
}
