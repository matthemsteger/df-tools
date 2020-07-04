import {exec} from 'child_process';
import path from 'path';
import Future, {
	parallel,
	both,
	reject as rejectedFutureOf,
	of as futureOf
} from 'fluture';
import R from 'ramda';
import _debug from 'debug';
import {fs} from './../../utility/fs';
import {pad} from './../../utility/strings';
import {
	propsPath,
	renameKeys,
	deriveObjFromPaths
} from './../../utility/objects';
import {createContext, debugFilteredContext} from './../../utility/context';
import {discoverInstall} from './../../model/install';
import {getAllSaveRegions} from './../saves';
import {
	getExportsForRegion,
	parseWorldSitesAndPops,
	parseWorldHistory
} from './worldExports';
import {getWorldGenSettings} from './../settings';
import {parseCreatureRaws} from './../raws';
import readGameLogFromPosition from './../gamelog';

const debug = _debug('df:api:worldgen:worldGeneration');

function runDwarfFortressProcess(executablePath, worldGenId, config, cwd) {
	debug(
		'runDwarfFortressProcess -> executablePath: %s, worldGenId: %o, config: %s, cwd: %s',
		executablePath,
		worldGenId,
		config,
		cwd
	);
	return Future((reject, resolve) => {
		const dfProcess = exec(
			`${executablePath} -gen ${worldGenId} RANDOM "${config}"`,
			{
				cwd
			},
			(err, stdout, stderr) => {
				if (err) return reject(err);

				return resolve({
					stdout,
					stderr
				});
			}
		);

		return () => {
			debug(
				'Entered cancel run dwarf fortress with dfProcess %o',
				dfProcess
			);
			if (dfProcess && !dfProcess.killed) {
				dfProcess.kill();
				debug('Killed dwarf fortress during cancel');
			}
		};
	}).chainRej((err) => {
		if (!err.code || err.code === 1) return rejectedFutureOf(err);
		return futureOf({});
	});
}

function runDwarfFortressGenWorldWithContext(
	mergeIntoContext,
	tapFilteredContext
) {
	return R.compose(
		R.map(mergeIntoContext),
		R.apply(runDwarfFortressProcess),
		propsPath([
			['finalExecutablePath'],
			['worldGenId'],
			['config'],
			['install', 'path']
		]),
		tapFilteredContext([
			'finalExecutablePath',
			'worldGenId',
			'config',
			'install'
		])
	);
}

const parseCreaturesIfNeeded = R.curry((creatures, installPath) => {
	if (creatures) return futureOf(creatures);

	return parseCreatureRaws(installPath);
});

function initialInformationWithContext(zipIntoContext, creatures) {
	return R.compose(
		R.map(
			zipIntoContext([
				'install',
				'worldSettings',
				'usedIds',
				'rawCreatures'
			])
		),
		parallel(4),
		R.juxt([
			discoverInstall,
			getWorldGenSettings,
			getAllSaveRegions,
			R.compose(parseCreaturesIfNeeded(creatures), R.prop('dfRootPath'))
		]),
		R.pick(['dfRootPath'])
	);
}

const worldGenIdFromContext = R.when(
	R.compose(R.not, R.prop('id')),
	R.compose(R.inc, R.last, R.prop('usedIds'))
);

const finalExecutablePathFromContext = R.compose(
	R.when(R.test(/ /), pad('"')),
	R.path(['install', 'executablePath'])
);

const gamelogPathFromContext = R.compose(
	(dfRootPath) => path.resolve(dfRootPath, 'gamelog.txt'),
	R.prop('dfRootPath')
);

function gameLogSizeWithContext(valueIntoContext, tapFilteredContext) {
	return R.compose(
		R.map(
			R.compose(valueIntoContext('initialGamelogSize'), R.prop('size'))
		),
		R.compose(fs.statFuture, R.prop('gamelogPath')),
		tapFilteredContext([
			'gamelogPath',
			'finalExecutablePath',
			'worldGenId'
		]),
		R.compose(valueIntoContext('gamelogPath'), gamelogPathFromContext),
		R.compose(
			valueIntoContext('finalExecutablePath'),
			finalExecutablePathFromContext
		),
		tapFilteredContext(['worldGenId']),
		R.compose(valueIntoContext('worldGenId'), worldGenIdFromContext),
		tapFilteredContext(['id', 'usedIds', 'install', 'dfRootPath'])
	);
}

function rawGameLogWithContext(valueIntoContext, tapFilteredContext) {
	return R.compose(
		R.map(valueIntoContext('rawGameLog')),
		R.apply(readGameLogFromPosition),
		R.props(['gamelogPath', 'initialGamelogSize']),
		tapFilteredContext(['gamelogPath', 'initialGamelogSize'])
	);
}

const getLastLogEntry = R.compose(
	R.head,
	R.reverse,
	R.filter(R.startsWith('Command Line:')),
	R.split(/\r?\n/)
);

function checkLogForErrorsWithContext(context) {
	const {config} = context;
	return R.compose(
		R.ifElse(
			R.both(R.is(String), R.contains('aborted because folder exists')),
			R.always(
				rejectedFutureOf(
					new Error(
						`Could not find a world generation configuration named ${config}`
					)
				)
			),
			R.always(futureOf(context))
		),
		getLastLogEntry,
		R.prop('rawGameLog')
	);
}

function exportsForRegionWithContext(valueIntoContext) {
	return R.compose(
		R.map(valueIntoContext('regionFilePaths')),
		getExportsForRegion,
		renameKeys({worldGenId: 'region'}),
		R.pick(['dfRootPath', 'worldGenId'])
	);
}

const parseWorldSitesAndPopsArgsFromContext = deriveObjFromPaths(
	[['regionFilePaths', 'worldSitesAndPops'], ['rawCreatures']],
	['filePath', 'creatures']
);

const parseWorldHistoryArgsFromContext = deriveObjFromPaths(
	[['regionFilePaths', 'worldHistory']],
	['filePath']
);

function parseResultsWithContext(zipIntoContext) {
	return R.compose(
		R.map(zipIntoContext(['worldSitesAndPops', 'worldHistory'])),
		R.converge(both, [
			R.compose(
				parseWorldSitesAndPops,
				parseWorldSitesAndPopsArgsFromContext
			),
			R.compose(parseWorldHistory, parseWorldHistoryArgsFromContext)
		])
	);
}

function resultFromContext(context) {
	const {worldGenId} = context;
	const region = `region${worldGenId}`;

	return {
		...R.pick(['worldSitesAndPops', 'worldHistory', 'filePaths'], context),
		region
	};
}

export function genWorld({dfRootPath, config, creatures, id = null}) {
	debug(
		'starting genWorld with dfRootPath:%s, config:%s, id:%s',
		dfRootPath,
		config,
		id
	);
	const context = {dfRootPath, config, creatures, id};
	const {mergeIntoContext, zipIntoContext, valueIntoContext} = createContext(
		context
	);
	const tapFilteredContext = (props) =>
		R.tap(debugFilteredContext(debug, props));

	return R.compose(
		R.map(resultFromContext),
		R.chain(parseResultsWithContext(zipIntoContext)),
		R.chain(exportsForRegionWithContext(valueIntoContext)),
		R.chain(checkLogForErrorsWithContext(context)),
		R.chain(rawGameLogWithContext(valueIntoContext, tapFilteredContext)),
		R.chain(
			runDwarfFortressGenWorldWithContext(
				mergeIntoContext,
				tapFilteredContext
			)
		),
		R.chain(gameLogSizeWithContext(valueIntoContext, tapFilteredContext)),
		initialInformationWithContext(zipIntoContext, creatures)
	)(context);
}

export function genWorlds({dfRootPath, config, numWorlds = 1}) {
	debug(
		'starting genWorlds with dfRootPath:%s, config:%s, numWorlds:%d',
		dfRootPath,
		config,
		numWorlds
	);
	return rejectedFutureOf(new Error('Not Implemented'));
}
