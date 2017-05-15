import glob from 'glob';
import Promise from 'bluebird';
import path from 'path';
import _ from 'lodash';
import {discoverInstall} from './../../../model/install';

function determineFileType(name, ext) {
	[
		{type: 'detailedMap', endsWith: 'detailed', ext: '.bmp'},
		{type: 'worldHistory', endsWith: 'world_history', ext: '.txt'},
		{type: 'worldMap', endsWith: 'world_map', ext: '.bmp'},
		{type: 'worldSitesAndPops', endsWith: 'world_sites_and_pops', ext: '.txt'},
		{type: 'worldGenParams', endsWith: 'world_gen_param', ext: '.txt'}
	].forEach(({type, endsWith, ext: defExt}) => { // eslint-disable-line consistent-return
		if (_.endsWith(name, endsWith) && ext === defExt) {
			return type;
		}
	});

	return null;
}

export default async function getExportsForRegion({dfRootPath, region} = {}) {
	const install = await discoverInstall({dfRootPath});
	const regionFiles = await Promise.fromCallback((callback) => glob(path.join(install.path, `region${region}-*`), {nodir: true, absolute: true}, callback));
	const mappedFiles = _.reduce(regionFiles, (map, filePath) => {
		const {name, ext} = path.parse(filePath);
		const type = determineFileType(name, ext);
		_.assign(map, {[type]: filePath});
		return map;
	}, {});

	if (!_.includes(_.keys(mappedFiles), 'worldHistory')) throw new Error(`Region ${region} not found.`);

	return mappedFiles;
}
