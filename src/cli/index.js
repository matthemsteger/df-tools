import yargs from 'yargs';
import _debug from 'debug';

const debug = _debug('df:cli:commands:index');

const argv = yargs
	.commandDir('commands')
	.demandCommand(1, 'You need to specify at least one command')
	.help()
	.argv;

debug('argv is %o', argv);
