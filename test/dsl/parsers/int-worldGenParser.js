import {expect} from 'chai';
import fs from 'fs';
import path from 'path';
import Promise from 'bluebird';
import _ from 'lodash';
import _debug from 'debug';
import WorldGenLexer from './../../../src/dsl/lexers/worldGenLexer';
import WorldGenParser from './../../../src/dsl/parsers/worldGenParser';
import {WorldGenConfiguration} from './../../../src/model/worldGen';

Promise.promisifyAll(fs);
const debug = _debug('df:test:dsl:int-worldGenParser');

describe.skip('RegionWorldSitesPopsParser integration tests', function () {
	it('should parse properly a world sites file', async function () {
		const worldGenText = await fs.readFileAsync(path.resolve(__dirname, './../data/world_gen.txt'), 'utf8');
		const lexer = new WorldGenLexer();
		const {tokens} = lexer.tokenize(worldGenText);
		debug('lexed %d tokens, and providing parser with %d token constructors', tokens.length, lexer.allTokens.length);
		const parser = new WorldGenParser(tokens, lexer.allTokens);

		const result = parser.parseWorldGenFile();
		debug('result is %O', result);
		debug('parser is %O', parser.errors);
		expect(result).to.be.an('array');
		expect(result).to.satisfy(_.partialRight(_.every, (config) => config instanceof WorldGenConfiguration));
		expect(parser).to.have.property('errors').that.is.an('array').with.lengthOf(0);
	});
});
