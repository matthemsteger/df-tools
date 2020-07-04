import {resolve} from 'path';
import {fs} from '@matthemsteger/utils-fn-fs';
import {parseBase10Int} from '@matthemsteger/utils-fn-numbers';
import {map, filter, startsWith, compose, nth, match, prop} from 'ramda';

const {readdirFuture} = fs;

export function getSavePath(dfRootPath) {
	return resolve(dfRootPath, 'data/save');
}

const onlyRegions = filter(
	(dirent) => dirent.isDirectory() && startsWith('region', dirent.name)
);

const extractRegionNumber = compose(
	parseBase10Int,
	nth(1),
	match(/^region(\d+)$/),
	prop('name')
);

const parseRegionNumbers = map(extractRegionNumber);

const getRegions = compose(parseRegionNumbers, onlyRegions);

export function getAllSaveRegions({dfRootPath}) {
	const saveDir = getSavePath(dfRootPath);
	return map(getRegions, readdirFuture(saveDir, {withFileTypes: true}));
}
