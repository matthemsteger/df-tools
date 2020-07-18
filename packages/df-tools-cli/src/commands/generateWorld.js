import {fork} from 'fluture';
import {generateWorld} from '@df-tools/df-tools-worldgen';

const handleError = (e) => {
	process.stderr.write(e.stack || e.message || 'Unknown error');
	process.exit(1);
};

const handleSuccess = (output) => {
	process.stdout.write(output);
	process.exit(0);
};

const cliFork = fork(handleError)(handleSuccess);

export const command = 'generate-world';
export const desc = 'Generate a Dwarf Fortress world';
export function builder(yargs) {
	return yargs
		.option('df', {
			alias: 'dfPath',
			demandOption: true,
			describe: 'the path to the DF home directory'
		})
		.option('exec', {
			alias: 'dfExec',
			demandOption: true,
			describe: 'the path to the DF executable'
		})
		.option('config', {
			alias: 'dfConfig',
			demandOption: true,
			describe: 'the config to use'
		});
}

export function handler(argv) {
	const {df: dfRootPath, exec: executablePath, config} = argv;
	const generateWorldFuture = generateWorld({
		dfRootPath,
		executablePath,
		config
	});
	cliFork(generateWorldFuture);
}
