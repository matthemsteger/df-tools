import glob from 'glob';
import path from 'path';
import R from 'ramda';
import {encaseN2} from 'fluture';
import {discoverInstall} from './../../../api/install/discoverInstall';

const globFuture = encaseN2(glob);

const fileTypes = [
	{type: 'detailedMap', endsWith: 'detailed', ext: '.bmp'},
	{type: 'worldHistory', endsWith: 'world_history', ext: '.txt'},
	{type: 'worldMap', endsWith: 'world_map', ext: '.bmp'},
	{type: 'worldSitesAndPops', endsWith: 'world_sites_and_pops', ext: '.txt'},
	{type: 'worldGenParams', endsWith: 'world_gen_param', ext: '.txt'}
];

function determineFileType(name, ext) {
	return R.find(R.both(
		R.compose(R.endsWith(R.__, name), R.prop('endsWith')),
		R.propEq('ext', ext)
	), fileTypes);
}

const getRegionsInPath = R.curry((region, installPath) =>
	globFuture(path.join(installPath, `region${region}`), {nodir: true, absolute: true})
);

export default function getExportsForRegion({dfRootPath, region}) {
	return R.compose(
		R.chain(R.compose(
			R.map(R.compose(
				R.when(R.complement(R.has('worldHistory')), () => {
					throw new Error(`Region ${region} not found.`);
				}),
				R.reduce((map, filePath) => {
					const {name, ext} = path.parse(filePath);
					const type = determineFileType(name, ext);
					return R.merge(R.__, {[type]: filePath});
				}, {})
			)),
			getRegionsInPath(region),
			R.prop('path')
		)),
		discoverInstall
	)({dfRootPath});
}

