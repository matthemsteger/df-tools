import Promise from 'bluebird';
import fs from 'fs';
import _debug from 'debug';
import {exec} from 'child_process';
import nodePath from 'path';

Promise.promisifyAll(fs);
const debug = _debug('df:cli:commands:testWorldGen');

export const command = 'worldgen';
export const describe = 'Test world gen';
export function builder(yargs) {
	return yargs
		.option('path', {
			alias: 'p',
			demandOption: true
		})
		.option('id', {
			alias: 'i',
			demandOption: true
		})
		.option('config', {
			alias: 'c',
			demandOption: true
		});
}

export async function handler(argv) {
	try {
		const {path, id, config} = argv;
		// const generatedSeed = _.random(0, 99999);
		const {dir: cwd} = nodePath.parse(path);
		debug('calling %s with config %s and id %s', path, config, id);
		const [stdout, stderr] = await Promise.fromCallback((callback) => {
			const dfProcess = exec(`${path} -gen ${id} RANDOM "${config}"`, {cwd}, callback);
			dfProcess.on('exit', (code, signal) => {
				debug('on exit code %s and signal %s', code, signal);
			});

			dfProcess.on('error', (err) => {
				debug(err);
			});

			dfProcess.stdout.on('data', (data) => {
				debug('stdout: %o', data);
			});

			dfProcess.stderr.on('data', (data) => {
				debug('stderr: %o', data);
			});
		}, {multiArgs: true});

		debug('stdout is %o and stderr is %o', stdout, stderr);

		process.exit(0);
	} catch (err) {
		debug(err);
		debug('err.code %d err.signal %s', err.code, err.signal);
		process.exit(1);
	}
}
