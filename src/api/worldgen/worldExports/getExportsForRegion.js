import glob from 'glob';
import path from 'path';
import R from 'ramda';
import {encaseN2} from 'fluture';
import _debug from 'debug';
import {discoverInstall} from './../../../api/install/discoverInstall';

const debug = _debug('df:api:worldgen:worldExports:getExportsForRegion');

const globFuture = encaseN2(glob);

const fileTypes = [
	{type: 'detailedMap', endsWith: 'detailed', ext: '.bmp'},
	{type: 'worldHistory', endsWith: 'world_history', ext: '.txt'},
	{type: 'worldMap', endsWith: 'world_map', ext: '.bmp'},
	{type: 'worldSitesAndPops', endsWith: 'world_sites_and_pops', ext: '.txt'},
	{type: 'worldGenParams', endsWith: 'world_gen_param', ext: '.txt'}
];

function determineFileType(name, ext) {
	debug('determineFileType for name: %s ext:%s', name, ext);
	return R.find(R.both(
		R.compose(R.endsWith(R.__, name), R.prop('endsWith')),
		R.propEq('ext', ext)
	), fileTypes);
}

const getRegionsInPath = R.curry((region, installPath) =>
	globFuture(path.join(installPath, `region${region}*`), {nodir: true, absolute: true})
);

export default function getExportsForRegion({dfRootPath, region}) {
	return R.compose(
		R.chain(R.compose(
			R.map(R.compose(
				R.when(R.complement(R.has('worldHistory')), () => {
					throw new Error(`Region ${region} not found.`);
				}),
				R.tap((regionExports) => debug('regionExports: %o', regionExports)),
				R.reduce((map, filePath) => {
					const {name, ext} = path.parse(filePath);
					const {type} = determineFileType(name, ext);
					return R.merge(map, {[type]: filePath});
				}, {}),
				R.tap((paths) => debug('paths: %o', paths))
			)),
			getRegionsInPath(region),
			R.prop('path'),
			R.tap((install) => debug('install: %o', install))
		)),
		discoverInstall
	)({dfRootPath});
}

