import {resolve} from 'path';
import {fs} from '@matthemsteger/utils-fn-fs';
import {parseBase10Int} from '@matthemsteger/utils-fn-numbers';
import {map, filter, compose, nth, match, prop} from 'ramda';

const {readdirFuture} = fs;

const REGION_REGEX = /^region(\d+)$/;

export function getSavePath(dfRootPath) {
	return resolve(dfRootPath, 'data/save');
}

const onlyRegions = filter(
	(dirent) => dirent.isDirectory() && REGION_REGEX.test(dirent.name)
);

const extractRegionNumber = compose(
	parseBase10Int,
	nth(1),
	match(REGION_REGEX),
	prop('name')
);

const parseRegionNumbers = map(extractRegionNumber);

const getRegions = compose(parseRegionNumbers, onlyRegions);

export function getAllSaveRegions({dfRootPath}) {
	const saveDir = getSavePath(dfRootPath);
	return map(getRegions, readdirFuture(saveDir, {withFileTypes: true}));
}
