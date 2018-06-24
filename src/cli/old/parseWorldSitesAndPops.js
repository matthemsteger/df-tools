import Promise from 'bluebird';
import fs from 'fs';
import _debug from 'debug';
import {worldgen} from './../../api';

Promise.promisifyAll(fs);
const debug = _debug('df:cli:commands:generateTokenOrBlock');

export const command = 'parse-world-sites-and-pops';
export const describe = 'Parse World Sites and Pops';
export function builder(yargs) {
	return yargs.option('path', {
		alias: 'p',
		demandOption: true
	});
}

export async function handler(argv) {
	try {
		const {path} = argv;
		const worldSitesAndPops = await worldgen.parseWorldSitesAndPops({
			filePath: path
		});
		debug('result: %o', worldSitesAndPops);
		process.exit(0);
	} catch (err) {
		debug(err);
		process.exit(1);
	}
}
