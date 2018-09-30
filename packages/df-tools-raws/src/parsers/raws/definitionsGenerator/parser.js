import P from 'parsimmon';
import {colon, tokenArgument, rbracket, noise} from '../../utilities';

const argumentSequence = colon.then(tokenArgument).many();

const tokenParser = P.seqMap(
	P.regexp(/\[?/)
		.desc('optional start bracket')
		.then(P.regexp(/[^:\s[\]]+[^\]:]/).desc('token name')),
	argumentSequence.skip(rbracket),
	(name, args) => ({name, numArgs: args.length})
);

export default tokenParser.trim(noise);
