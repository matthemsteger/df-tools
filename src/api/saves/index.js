import path from 'path';
import R from 'ramda';
import {of as futureOf} from 'fluture';
import {fs} from './../../utility/fs';
import {parseInteger} from './../../utility/numbers';

/**
 * Get all save regions for the given object with dfRootPath
 * @param {string} options.dfRootPath
 * @returns {Number[]}
 */
export const getAllSaveRegions = R.compose(
	R.map(
		R.compose(
			R.sort(R.subtract),
			R.map(
				R.compose(
					parseInteger(10),
					R.nth(1),
					R.match(/^region(\d+)$/)
				)
			),
			R.filter(R.startsWith('region'))
		)
	),
	fs.readdirFuture,
	(dfRootPath) => path.resolve(dfRootPath, 'data/save'),
	R.prop('dfRootPath')
);

export function getAllSaves() {
	return futureOf([]);
}
