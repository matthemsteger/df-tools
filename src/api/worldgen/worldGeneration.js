import {exec} from 'child_process';
import path from 'path';
import Future, {parallel, both, reject as rejectedFutureOf, of as futureOf} from 'fluture';
import R from 'ramda';
import _debug from 'debug';
import iconv from 'iconv-lite';
import {fs} from './../../utility/fs';
import {discoverInstall} from './../../model/install';
import {getAllSaveRegions} from './../saves';
import {getExportsForRegion, parseWorldSitesAndPops, parseWorldHistory} from './worldExports';
import {worldGenResult} from './../../model/worldGen';
import {getWorldGenSettings} from './../settings';
import {parseCreatureRaws} from './../raws';

const debug = _debug('df:api:worldgen:worldGeneration');

function runDwarfFortressProcess(executablePath, worldGenId, config, cwd) {
	debug('runDwarfFortressProcess -> executablePath: %s, worldGenId: %o, config: %s, cwd: %s', executablePath, worldGenId, config, cwd);
	return Future((reject, resolve) => {
		const dfProcess = exec(`${executablePath} -gen ${worldGenId} RANDOM "${config}"`, {
			cwd
		}, (err, stdout, stderr) => {
			if (err) return reject(err);

			return resolve({
				stdout,
				stderr
			});
		});

		return () => {
			if (dfProcess && !dfProcess.killed) {
				dfProcess.kill();
			}
		};
	})
		.chainRej((err) => {
			if (!err.code || err.code === 1) return rejectedFutureOf(err);
			return futureOf({});
		});
}

function readGameLog(gamelogPath, start) {
	return Future((reject, resolve) => {
		fs.createReadStream(gamelogPath, {
			start
		})
			.pipe(iconv.decodeStream('cp437'))
			.collect((err, logText) => {
				if (err) reject(err);

				resolve(logText);
			});
	});
}

const parseCreaturesIfNeeded = R.curry((creatures, installPath) => {
	if (creatures) return futureOf(creatures);

	return parseCreatureRaws(installPath);
});

export function genWorld({dfRootPath, config, creatures, id = null}) {
	debug('starting genWorld with dfRootPath:%s, config:%s, id:%s', dfRootPath, config, id);

	return R.chain(([install, worldSettings, usedIds, rawCreatures]) => {
		debug('install: %o, worldSettings: %o, usedIds: %o', install, worldSettings, usedIds);
		if (!R.any(R.propEq('title', config), worldSettings)) {
			return rejectedFutureOf(new Error(`Could not find a world generation configuration named ${config}`));
		}

		const worldGenId = R.when(R.not, R.always(R.compose(R.inc, R.last)(usedIds)), id);
		const finalExecutablePath = / /.test(install.executablePath) ? `"${install.executablePath}"` : install.executablePath;
		const gamelogPath = path.resolve(dfRootPath, 'gamelog.txt');
		debug('worldGenId: %o, finalExecutablePath: %s, gamelogPath: %s', worldGenId, finalExecutablePath, gamelogPath);
		return R.chain(({size: initialGamelogSize}) => {
			return R.chain(({stdout, stderr}) => {
				debug('stdout is %s, stderr is %s', stdout, stderr);
				return R.chain((rawGameLog) => {
					const lastLogEntry = R.compose(
						R.head,
						R.reverse,
						R.filter(R.startsWith('Command Line:')),
						R.split(/\r?\n/)
					)(rawGameLog);

					if (R.is(String, lastLogEntry) && lastLogEntry.indexOf('aborted because folder exists') > -1) {
						return rejectedFutureOf(new Error(`There is already a region${worldGenId}`));
					}

					return R.chain((regionFilePaths) => {
						const {worldSitesAndPops: worldSitesAndPopsPath, worldHistory: worldHistoryPath} = regionFilePaths;
						return R.map(([worldSitesAndPops, worldHistory]) => {
							const region = `region${worldGenId}`;
							return {
								worldSitesAndPops,
								worldHistory,
								region,
								worldSitesAndPopsPath,
								filePaths: regionFilePaths
							};
						}, both(parseWorldSitesAndPops({filePath: worldSitesAndPopsPath, creatures: rawCreatures}), parseWorldHistory({filePath: worldHistoryPath})));
					}, getExportsForRegion({dfRootPath, region: worldGenId}));
				}, readGameLog(gamelogPath, initialGamelogSize));
			}, runDwarfFortressProcess(finalExecutablePath, worldGenId, config, install.path));
		}, fs.statFuture(gamelogPath));
	}, parallel(3, R.juxt([discoverInstall, getWorldGenSettings, getAllSaveRegions, R.compose(parseCreaturesIfNeeded(creatures), R.prop('dfRootPath'))])({dfRootPath})));
}

export function genWorlds({dfRootPath, config, numWorlds = 1}) {
	//
}

/*
export function genWorldAsync({dfRootPath, config, id = null} = {}) {
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
*/

