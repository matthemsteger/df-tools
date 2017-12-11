import {exec} from 'child_process';
import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import Promise from 'bluebird';
import Future from 'fluture';
import R from 'ramda';
import _debug from 'debug';
import iconv from 'iconv-lite';
import {discoverInstall} from './../../model/install';
import {getAllSaveRegions} from './../saves';
import {getExportsForRegion, parseWorldSitesAndPops, parseWorldHistory} from './worldExports';
import {worldGenResult} from './../../model/worldGen';
import {getWorldGenSettings} from './../settings';

Promise.promisifyAll(fs);

const debug = _debug('df:worldgen');

export function genWorld({dfRootPath, config, id = null} = {}) {
	return Future((reject, resolve) => {
		debug('starting genWorld with dfRootPath:%s, config:%s, id:%s', dfRootPath, config, id);

		// in the future this library can be converted to futures and observables (fluture and most.js)
		// for now, since genWorlds is a LONG running operation that needs cancellation
		// ability, do this hack
		// this promise chain will run immediately
		let dfProcess;
		(async () => {
			try {
				const install = await discoverInstall({dfRootPath});
				const worldSettings = await getWorldGenSettings({dfRootPath});
				if (!R.any(R.propEq('title', config), worldSettings)) {
					throw new Error(`Could not find a world generation configuration with the name ${config}`);
				}

				// find next id number
				const usedIds = await getAllSaveRegions({dfRootPath});
				const worldGenId = !id ? _.last(usedIds) + 1 : id;
				const finalExecutablePath = / /.test(install.executablePath) ? `"${install.executablePath}"` : install.executablePath;

				const gamelogPath = path.resolve(dfRootPath, 'gamelog.txt');
				const {size: initialGamelogSize} = await fs.statAsync(gamelogPath);

				// dwarf fortress never sends stdout or stderr itself
				// it always sends back a non-0 random integer return code
				// the OS will return proper non-0 return codes (1) if there is a problem with the command
				try {
					const [stdout, stderr] = await new Promise((res, rej) => {
						dfProcess = exec(`${finalExecutablePath} -gen ${worldGenId} RANDOM "${config}"`, {
							cwd: install.path
						}, (err, standardOut, standardErr) => {
							if (err) return rej(err);
							return [standardOut, standardErr];
						});
					});

					debug('stdout is %s, stderr is %s', stdout, stderr);
				} catch (err) {
					if (!err.code || err.code === 1) {
						throw err;
					}

					debug(err);
				}

				const rawGameLog = await new Promise((res, rej) => {
					fs.createReadStream(gamelogPath, {
						start: initialGamelogSize
					})
						.pipe(iconv.decodeStream('cp437'))
						.collect((err, logText) => {
							if (err) rej(err);

							res(logText);
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
				const worldSitesAndPops = await parseWorldSitesAndPops({filePath: worldSitesAndPopsPath});
				const worldHistory = await parseWorldHistory({filePath: worldHistoryPath});

				const result = worldGenResult({
					worldSitesAndPops,
					worldHistory,
					region: `region${worldGenId}`,
					worldSitesAndPopsPath,
					filePaths: regionFilePaths
				});

				resolve(result);

				return result;
			} catch (err) {
				reject(err);
				return undefined;
			}
		})();

		// return a cancellation function
		return () => {
			if (dfProcess && !dfProcess.killed) {
				dfProcess.kill();
			}
		};
	});
}

export async function genWorldOld({dfRootPath, config, id = null} = {}) {
	debug('starting genWorld with dfRootPath:%s, config:%s, id:%s', dfRootPath, config, id);

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
	const {size: initialGamelogSize} = await fs.statAsync(gamelogPath);

	// dwarf fortress never sends stdout or stderr itself
	// it always sends back a non-0 random integer return code
	// the OS will return proper non-0 return codes (1) if there is a problem with the command
	try {
		const [stdout, stderr] = await Promise.fromCallback((callback) => exec(`${finalExecutablePath} -gen ${worldGenId} RANDOM "${config}"`, {
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
	const worldSitesAndPops = await parseWorldSitesAndPops({filePath: worldSitesAndPopsPath});
	const worldHistory = await parseWorldHistory({filePath: worldHistoryPath});

	return worldGenResult({
		worldSitesAndPops,
		worldHistory,
		region: `region${worldGenId}`,
		worldSitesAndPopsPath,
		filePaths: regionFilePaths
	});
}

export async function genWorlds({dfRootPath, config, numWorlds = 1} = {}) {
	const genResults = await Promise.mapSeries(_.times(numWorlds), () => Promise.resolve(genWorld({dfRootPath, config}).promise()).reflect());
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
