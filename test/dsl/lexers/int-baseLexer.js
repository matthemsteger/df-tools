import {expect} from 'chai';
import fs from 'fs';
import path from 'path';
import Promise from 'bluebird';
// import _debug from 'debug';
import BaseLexer from './../../../src/dsl/lexers/baseLexer';

Promise.promisifyAll(fs);
// const debug = _debug('df:test:dsl:test-baseLexer');

describe.skip('baseLexer integration tests', function() {
	it('should lex properly with no tokens provided as a language lexer', async function() {
		const fakeRaw = await fs.readFileAsync(
			path.resolve(__dirname, './../data/creature_fanciful.txt'),
			'utf8'
		);
		const lexer = new BaseLexer();

		const result = lexer.tokenize(fakeRaw);
		expect(result).to.have.property('tokens');
		expect(result.tokens).to.be.an('array');
		expect(result.tokens).to.have.lengthOf(124);
	});
});
