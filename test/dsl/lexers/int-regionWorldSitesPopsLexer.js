import {expect} from 'chai';
import fs from 'fs';
import path from 'path';
import Promise from 'bluebird';
import iconv from 'iconv-lite';
import _debug from 'debug';
import _ from 'lodash';
import RegionWorldSitesPopsLexer from './../../../src/dsl/lexers/regionWorldSitesPopsLexer';

Promise.promisifyAll(fs);
const debug = _debug('df:test:dsl:int-regionWorldSitesPopsLexer');

describe.skip('RegionWorldSitesPopsLexer integration tests', function() {
	it('should lex properly a region world sites pops file', async function() {
		const fakeRegionBuffer = await fs.readFileAsync(
			path.resolve(__dirname, './../data/world_sites_and_pops_test.txt')
		);
		const fakeRegionText = iconv.decode(fakeRegionBuffer, 'cp437');

		const lexer = new RegionWorldSitesPopsLexer();

		const result = lexer.tokenize(fakeRegionText);
		if (_.get(result, 'errors.length') > 0)
			debug('lexer errors: %O', result.errors);
		expect(result)
			.to.have.property('tokens')
			.that.is.an('array')
			.with.lengthOf(2090);
		expect(result)
			.to.have.property('errors')
			.that.is.an('array')
			.with.lengthOf(0);
	});

	it('should lex properly a region world sites pops file small', async function() {
		const fakeRegionBuffer = await fs.readFileAsync(
			path.resolve(
				__dirname,
				'./../data/world_sites_and_pops_test_small.txt'
			)
		);
		const fakeRegionText = iconv.decode(fakeRegionBuffer, 'cp437');

		const lexer = new RegionWorldSitesPopsLexer();

		const result = lexer.tokenize(fakeRegionText);
		// debug('%O', result.tokens);
		if (_.get(result, 'errors.length') > 0)
			debug('lexer errors: %O', result.errors);
		expect(result)
			.to.have.property('errors')
			.that.is.an('array')
			.with.lengthOf(0);
	});
});
