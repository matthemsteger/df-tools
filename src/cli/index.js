import yargs from 'yargs';
import _debug from 'debug';
import * as generateNameClassesCommand from './commands/generateNameClasses';
import * as generateByObjectTypeCommand from './commands/generateByObjectType';
import * as generateByObjectChildTokenCommand from './commands/generateByObjectChildToken';
import * as generateRawTagExpectationsCommand from './commands/generateRawTagExpectations';
import * as generateTokenOrBlockCommand from './commands/generateTokenOrBlock';
import * as testWorldGenCommand from './commands/testWorldGen';
import * as testTemplateEngineCommand from './commands/testTemplateEngine';

const debug = _debug('df:cli:commands:index');

const argv = yargs
	.usage('Usage: $0 <command> [options]')
	.command(generateNameClassesCommand)
	.command(generateByObjectTypeCommand)
	.command(generateByObjectChildTokenCommand)
	.command(generateRawTagExpectationsCommand)
	.command(testWorldGenCommand)
	.command(generateTokenOrBlockCommand)
	.command(testTemplateEngineCommand)
	.demandCommand(1, 'You need to specify at least one command')
	.help()
	.argv;

debug('argv is %o', argv);
