import Promise from 'bluebird';
import fs from 'fs';
import path from 'path';
import glob from 'glob';
import _debug from 'debug';
import rawCreaturesParser from './../../../dsl/parsers/raws/creatures/rawCreaturesParser';

Promise.promisifyAll(fs);
const debug = _debug('df:cli:commands:creatureRawsSmokeTest');

export const command = 'creatures-raw';
export const describe = 'Parse all creatures raws and see if there are any errors';
export function builder(yargs) {
	return yargs;
}

export async function handler(argv) {
	try {
		const {'df-root': dfRootPath} = argv;
		const rawsPath = path.resolve(dfRootPath, 'raw/objects');
		const rawFileNames = await Promise.fromCallback((callback) => glob(`${rawsPath}/creature_*.txt`, {nodir: true, absolute: true}, callback));
		const rawResults = await Promise.mapSeries(rawFileNames, async (fileName) => {
			const contents = await fs.readFileAsync(fileName, {encoding: 'utf8'});
			debug('read %s', fileName);
			const parsed = rawCreaturesParser.file.parse(contents);
			debug('parsed %s', fileName);

			if (parsed.status === false) {
				debug(parsed);
				throw new Error(`Creature raw ${fileName} could not be parsed`);
			}
		});

		debug('Parsed %d raws', rawResults.length);

		process.exit(0);
	} catch (err) {
		debug(err);
		process.exit(1);
	}
}
