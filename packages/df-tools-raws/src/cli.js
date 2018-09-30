#!/usr/bin/env node

import yargs from 'yargs';
import process from 'process';
import {
	outputDefinitions,
	outputTokenNames
} from './parsers/raws/definitionsGenerator';

function generateDefinitions({glob}) {
	outputDefinitions({
		fileGlob: glob
	}).fork(
		() => process.exit(1),
		(output) => {
			process.stdout.write(output);
			process.exit(0);
		}
	);
}

function generateTokenNames({glob}) {
	outputTokenNames({
		fileGlob: glob
	}).fork(
		() => process.exit(1),
		(output) => {
			process.stdout.write(output);
			process.exit(0);
		}
	);
}

// eslint-disable-next-line no-unused-expressions
yargs
	.usage('$0 <cmd> [args]')
	.command(
		'generate-definitions <glob>',
		'Generate raw definitions file based on glob of raws',
		(y) => {
			y.positional('glob', {
				type: 'string',
				default: '*.txt',
				describe: 'the glob for raw files'
			});
		},
		generateDefinitions
	)
	.command(
		'output-token-names <glob>',
		'Output all the token names from all the files in the glob',
		(y) => {
			y.positional('glob', {
				type: 'string',
				default: '*.txt',
				describe: 'the glob for raw files'
			});
		},
		generateTokenNames
	)
	.help().argv;
