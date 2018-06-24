import P from 'parsimmon';
import {createTokenParser, spaced, spaceAll} from './generic';

export const attackPrepareRecover = createTokenParser(
	'ATTACK_PREPARE_AND_RECOVER',
	2
);

export default createTokenParser('ATTACK', 7)
	.thru(spaced)
	.chain((node) => {
		const childTokenParsers = spaceAll([attackPrepareRecover]);

		return P.alt(...childTokenParsers)
			.times(childTokenParsers.length)
			.map((children) => ({children, ...node}));
	});
