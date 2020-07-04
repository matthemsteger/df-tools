import {expect} from 'chai';
import fs from 'fs';
import path from 'path';
import Promise from 'bluebird';
// import _debug from 'debug';
import WorldGenLexer from './../../../src/dsl/lexers/worldGenLexer';

Promise.promisifyAll(fs);
// const debug = _debug('df:test:dsl:int-worldGenLexer');

describe.skip('WorldGenLexer integration tests', function () {
	it('should lex properly a world gen file', async function () {
		const fakeWorldGen = await fs.readFileAsync(
			path.resolve(__dirname, './../data/world_gen.txt'),
			'utf8'
		);
		const lexer = new WorldGenLexer();

		const result = lexer.tokenize(fakeWorldGen);
		expect(result).to.have.property('tokens');
		expect(result.tokens).to.be.an('array');
		expect(result.tokens).to.have.lengthOf(1252);
	});
});
