import {exec} from 'child_process';
import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import Promise from 'bluebird';
import _debug from 'debug';
import iconv from 'iconv-lite';
import {discoverInstall} from './../../model/install';
import {getAllSaveRegions} from './../saves';
import {getExportsForRegion, parseWorldSitesAndPops, parseWorldHistory} from './worldExports';
import {WorldGenResult} from './../../model/worldGen';
import {getWorldGenSettings} from './../settings';

Promise.promisifyAll(fs);

const debug = _debug('df:worldgen');

export async function genWorld({dfRootPath, config, id = null} = {}) {
	// verify df executable
	// verify config exists
	// figure out next id number available

	const install = await discoverInstall({dfRootPath});
	const worldGenSettings = await getWorldGenSettings({dfRootPath});
	if (!_.some(worldGenSettings, {title: config})) {
		throw new Error(`Could not find a world generation configuration with the name ${config}`);
	}

	// find next id number
	const usedIds = await getAllSaveRegions({dfRootPath});
	const worldGenId = !id ? _.last(usedIds) + 1 : id;
	const finalExecutablePath = / /.test(install.executablePath) ? `"${install.executablePath}"` : install.executablePath;

	const gamelogPath = path.resolve(dfRootPath, 'gamelog.txt');
	const {size: initialGamelogSize} = await fs.stat(gamelogPath);

	// dwarf fortress never sends stdout or stderr itself
	// it always sends back a non-0 random integer return code
	// the OS will return proper non-0 return codes (1) if there is a problem with the command
	try {
		const [stdout, stderr] = await Promise.fromCallback((callback) => exec(`${finalExecutablePath} -gen ${worldGenId} RANDOM ${config}`, {
			cwd: install.path
		}, callback), {multiArgs: true});

		debug('stdout is %s, stderr is %s', stdout, stderr);
	} catch (err) {
		if (!err.code || err.code === 1) {
			throw err;
		}

		debug(err);
	}

	const rawGameLog = await new Promise((resolve, reject) => {
		fs.createReadStream(gamelogPath, {
			start: initialGamelogSize
		})
			.pipe(iconv.decodeStream('cp437'))
			.collect((err, logText) => {
				if (err) reject(err);

				resolve(logText);
			});
	});

	const gameLogLines = rawGameLog.split(/\r?\n/);
	const commandLineLogEntries = _.chain(gameLogLines)
		.filter((line) => _.startsWith(line, 'Command Line:'))
		.reverse()
		.value();

	const lastLogEntry = _.head(commandLineLogEntries);
	if (_.isString(lastLogEntry) && lastLogEntry.indexOf('aborted because folder exists') > -1) {
		throw new Error(`There is already a region${worldGenId}`);
	}

	// find the world info
	const regionFilePaths = await getExportsForRegion({dfRootPath, region: worldGenId});
	const {worldSitesAndPops: worldSitesAndPopsPath, worldHistory: worldHistoryPath} = regionFilePaths;
	const worldSitesAndPops = parseWorldSitesAndPops({filePath: worldSitesAndPopsPath});
	const worldHistory = parseWorldHistory({filePath: worldHistoryPath});

	return new WorldGenResult({
		worldSitesAndPops,
		worldHistory,
		region: `region${worldGenId}`,
		worldSitesAndPopsPath,
		filePaths: regionFilePaths
	});
}

export async function genWorlds({dfRootPath, config, numWorlds = 1} = {}) {
	const genResults = await Promise.mapSeries(_.times(numWorlds), () => Promise.resolve(genWorld({dfRootPath, config})).reflect());
	const finalResult = {worlds: [], errors: []};
	_.forEach(genResults, (result) => {
		if (result.isFulfilled()) {
			finalResult.worlds.push(result.value());
		} else {
			finalResult.errors.push(result.reason());
		}
	});

	return finalResult;
}
