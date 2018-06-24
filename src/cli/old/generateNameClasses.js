import path from 'path';
import glob from 'glob';
import Promise from 'bluebird';
import fs from 'fs';
import dust from 'dustjs-linkedin';
import _ from 'lodash';
import _debug from 'debug';
import {tokenMatcher} from 'chevrotain';
import BaseLexer from './../../dsl/lexers/baseLexer';
import {TokenName} from './../../dsl/tokens/languageTokens';

Promise.promisifyAll(fs);
const debug = _debug('df:cli:commands:generateNameClasses');

export const command = 'generate-name-classes';
export const describe = 'Generate name classes from raw file(s)';
export function builder(yargs) {
	return yargs
		.option('raws', {
			alias: 'r',
			default: '**/*.txt'
		})
		.option('template', {
			alias: 't',
			default: path.resolve(
				__dirname,
				'../../templates/classNames.js.dust'
			)
		})
		.option('filename', {
			alias: 'f',
			demandOption: true
		});
}

export async function handler(argv) {
	try {
		const {raws, template, filename} = argv;
		const rawFileNames = await Promise.fromCallback((callback) =>
			glob(raws, {nodir: true}, callback)
		);
		const templateContents = await fs.readFileAsync(template, 'utf8');
		const compiled = dust.compile(templateContents, 'nameClassesBlock');
		dust.loadSource(compiled);

		const lexer = new BaseLexer();

		const tokenNames = await Promise.map(rawFileNames, (filePath) =>
			fs
				.readFileAsync(filePath, {encoding: 'utf8'})
				.then((fileContents) => {
					const tokens = lexer.tokenize(fileContents);
					return _.chain(tokens.tokens)
						.filter((token) => tokenMatcher(token, TokenName))
						.map((token) => token.image)
						.value();
				})
		);

		const uniqueTokenNames = _.chain(tokenNames)
			.flatten()
			.uniq()
			.sortBy()
			.value();

		const fileContents = await Promise.reduce(
			uniqueTokenNames,
			(contents, tokenName) => {
				const classname = _.upperFirst(_.camelCase(tokenName));
				return Promise.fromCallback((callback) =>
					dust.render(
						'nameClassesBlock',
						{classname, tokenName, tab: '\t'},
						callback
					)
				).then((renderedBlock) => contents + renderedBlock);
			},
			''
		);

		await fs.writeFileAsync(filename, fileContents);
		process.exit(0);
	} catch (err) {
		debug(err);
		process.exit(1);
	}
}
