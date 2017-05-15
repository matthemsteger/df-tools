import path from 'path';
import glob from 'glob';
import Promise from 'bluebird';
import fs from 'fs';
import dust from 'dustjs-linkedin';
import _ from 'lodash';
import _debug from 'debug';
import BaseLexer from './../../dsl/lexers/baseLexer';
import GenericLangParser from './../../dsl/parsers/genericLangParser';

Promise.promisifyAll(fs);
const debug = _debug('df:cli:commands:generateByObjectType');

export const command = 'generate-by-objecttype';
export const describe = 'Generate object types from raw file(s)';
export function builder(yargs) {
	return yargs
		.option('raws', {
			alias: 'r',
			default: '**/*.txt'
		})
		.option('template', {
			alias: 't',
			default: path.resolve(__dirname, '../../templates/objectTypeOrBlock.js.dust')
		})
		.option('filename', {
			alias: 'f',
			demandOption: true
		});
}

export async function handler(argv) {
	try {
		const {raws, template, filename} = argv;
		const rawFileNames = await Promise.fromCallback((callback) => glob(raws, {nodir: true}, callback));
		const templateContents = await fs.readFileAsync(template, 'utf8');
		const compiled = dust.compile(templateContents, 'generateByObjectTemplate');
		dust.loadSource(compiled);

		const lexer = new BaseLexer();

		const allTokens = await Promise.map(rawFileNames, (filePath) =>
			fs.readFileAsync(filePath, {encoding: 'utf8'}).then((fileContents) => {
				const {tokens} = lexer.tokenize(fileContents);
				debug('there were %d tokens in %s', tokens.length, filePath);
				return tokens;
			})
		).then((nestedAllTokens) => _.flatten(nestedAllTokens));

		debug('found %d tokens in %d raw files', allTokens.length, rawFileNames.length);

		const parser = new GenericLangParser(allTokens, lexer.allTokens);
		debug('created a parser %o', parser);
		const genericLangTokens = parser.genericLanguageTokens();

		const objectTypes = _.chain(genericLangTokens)
			.reduce((accumulated, token, idx, tokensCollection) => {
				if (token.tokenName.image === 'OBJECT' && tokensCollection.length > idx) {
					const nextToken = tokensCollection[idx + 1];
					const objectType = nextToken.tokenName.image;
					const className = _.upperFirst(_.camelCase(objectType));
					accumulated.push({objectType, className});
				}

				return accumulated;
			}, [])
			.uniqBy('objectType')
			.value();

		const renderedTemplate = await Promise.fromCallback((callback) =>
			dust.render('generateByObjectTemplate', {objectTypes, tab: '\t'}, callback)
		);

		await fs.writeFileAsync(filename, renderedTemplate);
		process.exit(0);
	} catch (err) {
		debug(err);
		process.exit(1);
	}
}
