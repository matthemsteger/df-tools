import {expect} from 'chai';
import fs from 'fs';
import path from 'path';
import Promise from 'bluebird';
import _debug from 'debug';
import RawLexer from './../../../src/dsl/lexers/rawLexer';
import GenericRawParser from './../../../src/dsl/parsers/raws/genericRawParser';

Promise.promisifyAll(fs);
const debug = _debug('df:test:dsl:int-worldGenLexer');

describe.skip('GenericRawParser integration tests', function () {
	it('should parse properly a raw file', async function () {
		const rawtext = await fs.readFileAsync(
			path.resolve(__dirname, './../data/creature_fanciful.txt'),
			'utf8'
		);
		const lexer = new RawLexer();
		const {tokens} = lexer.tokenize(rawtext);
		debug(
			'lexed %d tokens, and providing parser with %d token constructors',
			tokens.length,
			lexer.allTokens.length
		);
		const parser = new GenericRawParser(tokens, lexer.allTokens);

		const result = parser.rawFile();
		expect(result).to.not.be.null;
		expect(result)
			.to.have.property('rawObjects')
			.that.is.an('array')
			.with.lengthOf(2);
	});
});
