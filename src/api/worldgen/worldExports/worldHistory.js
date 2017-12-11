import path from 'path';
import fs from 'fs';
import Future from 'fluture';
import iconv from 'iconv-lite';
import _debug from 'debug';
import readline from 'readline';

const debug = _debug('df:api:worldgen:worldExports:worldHistory');

export default function parseWorldHistory({filePath}) {
	// simple parsing, only care about world name
	const lineReader = readline.createInterface({
		input: fs.createReadStream(path.resolve(filePath)).pipe(iconv.decodeStream('cp437'))
	});

	return Future((reject, resolve) => {
		let lineNumber = 0;
		const worldHistory = {};
		let cancelled = false;

		lineReader.on('line', (line) => {
			lineNumber += 1;
			debug('reading line %d as %s', lineNumber, line);
			switch (lineNumber) {
				case 1:
					worldHistory.worldName = line;
					break;
				case 2:
					worldHistory.friendlyWorldName = line;
					break;
				default:
					debug('closing reader because at line %d', lineNumber);
					lineReader.close();
			}
		});

		lineReader.on('close', () => {
			debug('at lineReader close with worldHistory %o', worldHistory);
			if (cancelled) return;

			if (!worldHistory.worldName || !worldHistory.friendlyWorldName) {
				reject(new Error('Could not parse world history file'));
			} else {
				resolve(worldHistory);
			}
		});

		return () => {
			cancelled = true;
			lineReader.close();
		};
	});
}

