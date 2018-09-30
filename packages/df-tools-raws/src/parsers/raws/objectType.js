import P from 'parsimmon';
import {lbracket, colon, rbracket} from '../utilities';

const OBJECT_TAG_NAME = 'OBJECT';
const objectTypes = ['CREATURE'];

export default P.seq(lbracket, P.string(OBJECT_TAG_NAME), colon)
	.then(P.alt(...objectTypes.map((objectType) => P.string(objectType))))
	.skip(rbracket)
	.node(OBJECT_TAG_NAME)
	.trim(P.optWhitespace);
