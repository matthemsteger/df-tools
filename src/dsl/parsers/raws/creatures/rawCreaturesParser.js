import {createRawFileParser} from './../generic';

const casteTags = [
	['CASTE_NAME', 3],

];

export default createRawFileParser({
	rawObject: 'CREATURE',
	children: [
		['DESCRIPTION', 1],
		['NAME', 3],
		['CREATURE_TILE', 1],
		['COLOR', 3],
		['FANCIFUL', 0],
		['DOES_NOT_EXIST', 0],
		['PREFSTRING', 1],
		['ALL_ACTIVE', 0],
		['CASTE', 1, [
			['CASTE_NAME', 3],
			['FEMALE', 0],
			['MALE', 0]
		]]
	]
});
