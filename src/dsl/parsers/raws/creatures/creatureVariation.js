import {createRawFileParser} from './../generic';

export const definition = [
	['CV_REMOVE_TAG', 1],
	[
		'CV_CONVERT_TAG',
		0,
		[
			['CVCT_MASTER', 1],
			['CVCT_TARGET', Number.NaN],
			['CVCT_REPLACEMENT', Number.NaN]
		]
	],
	['CV_NEW_TAG', Number.NaN],
	['CV_ADD_TAG', Number.NaN]
];

export default createRawFileParser({
	rawObject: 'CREATURE_VARIATION',
	children: definition
});
