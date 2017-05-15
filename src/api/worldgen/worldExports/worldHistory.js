import path from 'path';
import fs from 'fs';
import Promise from 'bluebird';
import iconv from 'iconv-lite';
import _debug from 'debug';
import readline from 'readline';

const debug = _debug('df:api:worldgen:worldExports:worldHistory');

Promise.promisifyAll(fs);

export default async function parseWorldHistory({filePath} = {}) {
	// simple parsing, only care about world name
	const lineReader = readline.createInterface({
		input: fs.createReadStream(path.resolve(filePath)).pipe(iconv.decodeStream('cp437'))
	});

	return new Promise((resolve, reject) => {
		let lineNumber = 0;
		const worldHistory = {};
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
			if (!worldHistory.worldName || !worldHistory.friendlyWorldName) {
				reject(new Error('Could not parse world history file'));
			} else {
				resolve(worldHistory);
			}
		});
	});
}
