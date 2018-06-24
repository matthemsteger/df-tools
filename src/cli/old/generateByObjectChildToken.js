import path from 'path';
import glob from 'glob';
import Promise from 'bluebird';
import fs from 'fs';
import dust from 'dustjs-helpers';
import _ from 'lodash';
import _debug from 'debug';
import RawLexer from './../../dsl/lexers/rawLexer';
import GenericRawParser from './../../dsl/parsers/genericRawParser';

Promise.promisifyAll(fs);
const debug = _debug('df:cli:commands:generateByObjectChildToken');

export const command = 'generate-by-object-child';
export const describe = 'Generate from object type children in raw files(s)';
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
				'../../templates/tokenBlocks.js.dust'
			)
		})
		.option('filename', {
			alias: 'f',
			demandOption: true
		})
		.option('name', {
			alias: 'n',
			demandOption: true
		})
		.option('baseTokenClass', {
			alias: 'b',
			default: 'Token'
		})
		.option('longerAlt', {
			alias: 'a',
			describe: 'include a longer_alt with the specified class'
		});
}

export async function handler(argv) {
	try {
		const {
			raws,
			template,
			filename,
			name,
			baseTokenClass,
			longerAlt
		} = argv;
		const rawFileNames = await Promise.fromCallback((callback) =>
			glob(raws, {nodir: true}, callback)
		);
		const templateContents = await fs.readFileAsync(template, 'utf8');
		const compiled = dust.compile(
			templateContents,
			'generateByObjectChildTokenTemplate'
		);
		dust.loadSource(compiled);

		const lexer = new RawLexer();

		const allTokens = await Promise.map(rawFileNames, (filePath) =>
			fs
				.readFileAsync(filePath, {encoding: 'utf8'})
				.then((fileContents) => {
					const {tokens} = lexer.tokenize(fileContents);
					debug(
						'there were %d tokens in %s',
						tokens.length,
						filePath
					);
					const parser = new GenericRawParser(
						tokens,
						lexer.allTokens
					);
					const {
						fileLabel,
						objectType,
						rawObjects
					} = parser.rawFile();
					debug(
						'parsed %s with label %s and objectType %o with %d raw objects',
						filePath,
						fileLabel.image,
						_.get(objectType, 'args[0]'),
						rawObjects.length
					);
					const filteredTokens = _.flatMap(rawObjects, (rawObject) =>
						_.filter(
							rawObject.childTags,
							(childTag) => childTag.name === name
						)
					);
					return filteredTokens;
				})
		).then((nestedAllTokens) =>
			_.chain(nestedAllTokens)
				.flatten()
				.orderBy(['args[0]'], ['desc'])
				.value()
		);

		debug(
			'found %d tokens in %d raw files',
			allTokens.length,
			rawFileNames.length
		);

		const renderedTemplate = await Promise.fromCallback((callback) =>
			dust.render(
				'generateByObjectChildTokenTemplate',
				{
					allTokens,
					tab: '\t',
					baseTokenClass,
					includeLongerAlt: !_.isEmpty(_.trim(longerAlt)),
					longerAlt,
					makeClassName(chunk, context, bodies, params) {
						const text = dust.helpers.tap(
							params.text,
							chunk,
							context
						);
						const className = _.upperFirst(_.camelCase(text));
						return chunk.write(className);
					}
				},
				callback
			)
		);

		await fs.writeFileAsync(filename, renderedTemplate);
		process.exit(0);
	} catch (err) {
		debug(err);
		process.exit(1);
	}
}
