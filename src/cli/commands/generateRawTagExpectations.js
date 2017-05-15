import glob from 'glob';
import Promise from 'bluebird';
import fs from 'fs';
import _ from 'lodash';
import _debug from 'debug';
import BaseLexer from './../../dsl/lexers/baseLexer';
import GenericLangParser from './../../dsl/parsers/genericLangParser';

Promise.promisifyAll(fs);
const debug = _debug('df:cli:commands:generateRawTagExpectations');

export const command = 'generate-raw-tag-expectations';
export const describe = 'Generate raw tag expectations based on raw file(s)';
export function builder(yargs) {
	return yargs
		.option('raws', {
			alias: 'r',
			default: '**/*.txt'
		})
		.option('filename', {
			alias: 'f',
			demandOption: true
		})
		.option('between', {
			alias: 'b'
		})
		.option('first', {
			boolean: true
		});
}

export async function getExpectations(rawFileNames, between) {
	const lexer = new BaseLexer();

	return Promise.map(rawFileNames, async (filePath) => {
		const fileContents = await fs.readFileAsync(filePath, {encoding: 'utf8'});
		const {tokens} = lexer.tokenize(fileContents);
		debug('there were %d tokens in %s', tokens.length, filePath);

		const parser = new GenericLangParser(tokens, lexer.allTokens);
		let genericLangTokens = parser.genericLanguageTokens();

		if (!_.isEmpty(between)) {
			const firstItemIdx = _.findIndex(genericLangTokens, ['tokenName.image', between]);
			if (firstItemIdx > -1) {
				const slice = _.slice(genericLangTokens, firstItemIdx + 1);
				genericLangTokens = _.takeWhile(slice, (token) => token.tokenName.image !== between);
			}
		}

		const expectations = _.reduce(genericLangTokens, (accumulated, token) => {
			const name = token.tokenName.image;
			const args = _.map(token.args, 'image');
			const numArgs = args.length;
			const className = _.upperFirst(_.camelCase(name));
			const argNumVariations = [];
			let ocurrences = 1;

			let variableArgs = false;
			if (_.has(accumulated, name)) {
				ocurrences = _.get(accumulated, `${name}.ocurrences`) + 1;

				if (_.get(accumulated, `${name}.numArgs`) !== numArgs) {
					debug('there was already a expectation for %s and it has %d args != %d', name, _.get(accumulated, `${name}.numArgs`), numArgs);
					variableArgs = true;
					if (argNumVariations.length === 0) {
						argNumVariations.push(_.get(accumulated, `${name}.numArgs`));
					}

					argNumVariations.push(numArgs);
				}
			}

			return _.assign(accumulated, {[name]: {numArgs, args, className, variableArgs, argNumVariations, ocurrences}});
		}, {});

		return {filePath, expectations};
	});
}

export async function handler(argv) {
	try {
		const {raws, filename, between, first} = argv;

		const rawFileNames = await Promise.fromCallback((callback) => glob(raws, {nodir: true}, callback));
		const allExpectations = await getExpectations(rawFileNames, between);
		let expectationsToWrite = allExpectations;
		if (first) {
			expectationsToWrite = _.get(allExpectations, '[0].expectations');
		}
		await fs.writeFileAsync(filename, JSON.stringify(expectationsToWrite, null, '\t'));
		process.exit(0);
	} catch (err) {
		debug(err);
		process.exit(1);
	}
}
