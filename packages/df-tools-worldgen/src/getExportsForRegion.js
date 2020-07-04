import {
	find,
	compose,
	prop,
	endsWith,
	__,
	curry,
	both,
	propEq,
	map,
	reduce,
	merge
} from 'ramda';
import {glob} from '@matthemsteger/utils-fn-fs';
import {join, parse} from 'path';

/**
 * @typedef {function(Error): void} ErrorCallback
 */

/**
 * @template T
 * @typedef {function(T): void} SuccessCallback
 */

/**
 * @typedef {function(): void} Cancellation
 */

/**
 * @template T
 * @typedef {object} Future
 * @property {function(ErrorCallback, SuccessCallback): Cancellation} fork
 */

export const REGION_EXPORT_TYPES = Object.freeze({
	DETAILED_MAP: 'detailedMap',
	WORLD_HISTORY: 'worldHistory',
	WORLD_MAP: 'worldMap',
	WORLD_SITES_AND_POPS: 'worldSitesAndPops',
	WORLD_GEN_PARAMS: 'worldGenParams'
});

const fileTypes = [
	{type: REGION_EXPORT_TYPES.DETAILED_MAP, endsWith: 'detailed', ext: '.bmp'},
	{
		type: REGION_EXPORT_TYPES.WORLD_HISTORY,
		endsWith: 'world_history',
		ext: '.txt'
	},
	{type: REGION_EXPORT_TYPES.WORLD_MAP, endsWith: 'world_map', ext: '.bmp'},
	{
		type: REGION_EXPORT_TYPES.WORLD_SITES_AND_POPS,
		endsWith: 'world_sites_and_pops',
		ext: '.txt'
	},
	{
		type: REGION_EXPORT_TYPES.WORLD_GEN_PARAMS,
		endsWith: 'world_gen_param',
		ext: '.txt'
	}
];

const fileTypeEndsWith = curry((name, fileType) =>
	compose(endsWith(__), prop('endsWith'))(fileType)
);

const matchNameExtToFileType = curry((name, ext) =>
	both(fileTypeEndsWith(name), propEq('ext', ext))
);

function determineFileType(name, ext) {
	return find(matchNameExtToFileType(name, ext), fileTypes);
}

const getRegionsInPath = curry((region, installPath) =>
	glob(join(installPath, `region${region}-*`), {nodir: true, absolute: true})
);

const mapExportPathsToTypes = reduce((typesToPaths, filePath) => {
	const {name, ext} = parse(filePath);
	const {type} = determineFileType(name, ext);
	return merge(typesToPaths, {[type]: filePath});
}, {});

/**
 * Get the paths to the exports for a region
 * @param {object} options
 * @param {string} options.installPath
 * @param {number} options.region
 * @returns {Future<Object<string, string>>}
 */
export default function getExportsForRegion({installPath, region}) {
	const regionsInPathFuture = getRegionsInPath(region, installPath);
	return map(mapExportPathsToTypes, regionsInPathFuture);
}
