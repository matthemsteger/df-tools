import path from 'path';
import fs from 'fs';
import Promise from 'bluebird';
import _ from 'lodash';

Promise.promisifyAll(fs);

export async function getAllSaveRegions({dfRootPath} = {}) {
	const savePath = path.resolve(dfRootPath, 'data/save');
	const dirNames = await fs.readdirAsync(savePath);
	return _.chain(dirNames)
		.filter((dirName) => _.startsWith(dirName, 'region'))
		.map((dirName) => _.trimStart(dirName, 'region'))
		.map(_.parseInt)
		.sortBy()
		.value();
}

export async function getAllSaves() {
	return [];
}
