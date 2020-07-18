import {resolve, reject, go, race as _race} from 'fluture';
import {
	compose,
	head,
	reverse,
	filter,
	startsWith,
	split,
	contains,
	uncurryN
} from 'ramda';
import readGameLogFromPosition, {
	getGamelogPath
} from '@df-tools/df-tools-gamelog';
import findNextId from './findNextId';
import initialGamelogSize from './initialGamelogSize';
import gamelogMonitorErrors from './gamelogMonitorErrors';
import runDwarfFortressProcess from './runDwarfFortressProcess';

const race = uncurryN(2, _race);

const getLastLogEntry = compose(
	head,
	reverse,
	filter(startsWith('Command Line:')),
	split(/\r?\n/)
);

export default function generateWorld({
	dfRootPath,
	executablePath,
	config,
	id: requestedId
}) {
	const gameLogPath = getGamelogPath(dfRootPath);
	const idFuture = requestedId
		? resolve(requestedId)
		: findNextId({dfRootPath});

	// we want to also see if there is a message about world gen param not found
	// and then abort
	return go(function* doWorldGeneration() {
		const initialLogSize = yield initialGamelogSize(dfRootPath);
		const id = yield idFuture;
		/**
		 * Race monitoring for errors with the process. If the errors are read
		 * then the entire future fails and cancellation is run, which will
		 * kill DF
		 */
		const {stdout, stderr} = yield race(
			runDwarfFortressProcess(executablePath, id, config, dfRootPath),
			gamelogMonitorErrors(dfRootPath, initialLogSize)
		);

		const rawGameLog = yield readGameLogFromPosition(
			gameLogPath,
			initialLogSize
		);

		const lastLogEntry = getLastLogEntry(rawGameLog);
		if (
			lastLogEntry &&
			contains('aborted because folder exists', lastLogEntry)
		) {
			return yield reject(
				new Error(`A folder with the name ${id} already exists`)
			);
		}

		return {
			stdout,
			stderr,
			region: id
		};
	});
}
