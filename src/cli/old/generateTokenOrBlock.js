import path from 'path';
import glob from 'glob';
import Promise from 'bluebird';
import fs from 'fs';
import _ from 'lodash';
import _debug from 'debug';
import {getExpectations} from './generateRawTagExpectations';

Promise.promisifyAll(fs);
const debug = _debug('df:cli:commands:generateTokenOrBlock');

export const command = 'generate-token-or-block';
export const describe = 'Generate token or block based on a file token syntax';
export function builder(yargs) {
	return yargs
		.option('raws', {
			alias: 'r',
			default: '**/*.txt'
		})
		.option('template', {
			alias: 't',
			default: path.resolve(__dirname, '../../templates/tokenOrBlock.js')
		})
		.option('filename', {
			alias: 'f',
			demandOption: true
		})
		.option('token-names-import-object', {
			alias: 'o',
			demandOption: true
		})
		.option('between', {
			alias: 'b'
		})
		.option('useOr', {
			boolean: true,
			default: true
		});
}

export async function handler(argv) {
	try {
		const {
			raws,
			template: templatePath,
			filename,
			between,
			o: tokenNamesImportObject,
			useOr
		} = argv;
		const rawFileNames = await Promise.fromCallback((callback) =>
			glob(raws, {nodir: true, absolute: true}, callback)
		);
		const expectationsCollection = await getExpectations(
			rawFileNames,
			between
		);

		const template = require(templatePath); // eslint-disable-line global-require,import/no-dynamic-require
		const renderedTemplate = await template.default(
			tokenNamesImportObject,
			_.get(_.head(expectationsCollection), 'expectations'),
			useOr
		);

		await fs.writeFileAsync(filename, renderedTemplate);
		process.exit(0);
	} catch (err) {
		debug(err);
		process.exit(1);
	}
}
