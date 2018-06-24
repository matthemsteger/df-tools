import _glob from 'glob';
import fs from 'fs';
import Promise from 'bluebird';
import R from 'ramda';
import _debug from 'debug';
import serializeError from 'serialize-error';
import rawCreaturesParser from './../../../../dsl/parsers/raws/creatures/rawCreaturesParser';
import {modelCreatureRawFile} from './../../../../model/raws/creature/creatureRawProcessing';

Promise.promisifyAll(fs);
const glob = Promise.promisify(_glob);
const debug = _debug('df:cli:commands:parse:raws:parseRawCreatureFile');

export const command = 'creature-file [file]';
export const desc = 'Parse a raw creature file(s) (e.g. creature_standard.txt)';
export function builder(yargs) {
	return yargs.demandOption(['file']);
}

export async function handler(argv) {
	debug('argv %o', argv);
	const {file: fileNameOrPath} = argv;
	try {
		const files = await glob(fileNameOrPath, {absolute: true, nodir: true});
		debug('files %o', files);

		const nestedParsedCreatures = await Promise.map(
			files,
			async (fileName) => {
				const text = await fs.readFileAsync(fileName, 'utf8');
				const {
					status,
					value,
					index,
					expected
				} = rawCreaturesParser.file.parse(text);
				if (!status) {
					const error = new Error(`Could not parse ${fileName}`);
					error.parseContext = {index, expected};
					throw error;
				}

				return modelCreatureRawFile(value);
			}
		);

		const creatures = R.unnest(nestedParsedCreatures);
		debug('parsed %d creatures', creatures.length);
		await Promise.fromCallback((callback) =>
			process.stdout.write(
				JSON.stringify(creatures, null, '\t'),
				'utf8',
				callback
			)
		);
	} catch (err) {
		await Promise.fromCallback((callback) =>
			process.stderr.write(
				JSON.stringify(serializeError(err)),
				'utf8',
				callback
			)
		);
		process.exit(1);
	}
}
