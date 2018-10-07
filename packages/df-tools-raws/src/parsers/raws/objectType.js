import P from 'parsimmon';
import {lbracket, colon, rbracket} from '../utilities';

const OBJECT_TAG_NAME = 'OBJECT';
const objectTypes = [
	'BODY_DETAIL_PLAN',
	'BODY',
	'BUILDING',
	'CREATURE_VARIATION',
	'CREATURE',
	'DESCRIPTOR_COLOR',
	'DESCRIPTOR_PATTERN',
	'DESCRIPTOR_SHAPE',
	'ENTITY',
	'INORGANIC',
	'INTERACTION',
	'ITEM',
	'LANGUAGE',
	'MATERIAL_TEMPLATE',
	'PLANT',
	'REACTION',
	'TISSUE_TEMPLATE'
];

export default P.seq(lbracket, P.string(OBJECT_TAG_NAME), colon)
	.then(P.alt(...objectTypes.map((objectType) => P.string(objectType))))
	.skip(rbracket)
	.node(OBJECT_TAG_NAME)
	.trim(P.optWhitespace);
