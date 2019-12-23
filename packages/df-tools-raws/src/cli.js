#!/usr/bin/env node

import yargs from 'yargs';
import process from 'process';
import {promisify} from 'util';
import {readFile} from 'fs';
import {
	outputDefinitions,
	outputTokenNames
} from './parsers/raws/definitionsGenerator';
import createRawFileParser from './parsers/raws/rawFile';

const readFileAsync = promisify(readFile);

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

async function outputRawFileParse({file}) {
	try {
		const parser = createRawFileParser();
		const rawText = await readFileAsync(file, 'utf8');
		const result = parser.file.tryParse(rawText);
		process.stdout.write(JSON.stringify(result));
		process.exit(0);
	} catch (err) {
		process.stderr.write(err.message);
		process.exit(1);
	}
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
	.command(
		'parse-raw-file <file>',
		'Parse a raw file and output the result of the parse in JSON',
		(y) => {
			y.positional('file', {
				type: 'string',
				describe: 'the path to a file'
			});
		},
		outputRawFileParse
	)
	.help().argv;
