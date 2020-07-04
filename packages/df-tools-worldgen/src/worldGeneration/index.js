import {resolve, reject, go} from 'fluture';
import {
	compose,
	head,
	reverse,
	filter,
	startsWith,
	split,
	contains
} from 'ramda';
import readGameLogFromPosition, {
	getGamelogPath
} from '@df-tools/df-tools-gamelog';
import findNextId from './findNextId';
import initialGamelogSize from './initialGamelogSize';
import runDwarfFortressProcess from './runDwarfFortressProcess';

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
	const idFuture = requestedId ? resolve(requestedId) : findNextId();

	return go(function* doWorldGeneration() {
		const initialLogSize = yield initialGamelogSize(dfRootPath);
		const id = yield idFuture;
		const {stdout, stderr} = yield runDwarfFortressProcess(
			executablePath,
			id,
			config,
			dfRootPath
		);

		const rawGameLog = yield readGameLogFromPosition(
			gameLogPath,
			initialLogSize
		);

		const lastLogEntry = getLastLogEntry(rawGameLog);
		if (lastLogEntry && contains('aborted because folder exists')) {
			return yield reject(
				`Could not find a world generation configuration named ${config}`
			);
		}

		return {
			stdout,
			stderr,
			region: id
		};
	});
}
