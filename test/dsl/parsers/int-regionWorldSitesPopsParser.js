import {expect} from 'chai';
import fs from 'fs';
import path from 'path';
import Promise from 'bluebird';
import iconv from 'iconv-lite';
import _debug from 'debug';
import RegionWorldSitesPopsLexer from './../../../src/dsl/lexers/regionWorldSitesPopsLexer';
import RegionWorldSitesPopsParser from './../../../src/dsl/parsers/regionWorldSitesPopsParser';
import WorldSitesAndPops from './../../../src/model/worldSitesAndPops';

Promise.promisifyAll(fs);
const debug = _debug('df:test:dsl:int-regionWorldSitesPopsParser');

describe('RegionWorldSitesPopsParser integration tests', function () {
	it('should parse properly a world sites file', async function () {
		const fakeRegionBuffer = await fs.readFileAsync(path.resolve(__dirname, './../data/world_sites_and_pops_test.txt'));
		const fakeRegionText = iconv.decode(fakeRegionBuffer, 'cp437');
		const lexer = new RegionWorldSitesPopsLexer();
		const {tokens} = lexer.tokenize(fakeRegionText);
		debug('lexed %d tokens, and providing parser with %d token constructors', tokens.length, lexer.allTokens.length);
		const parser = new RegionWorldSitesPopsParser(tokens, lexer.allTokens);

		const result = parser.parseWorldPopFile();
		debug('result is %O', result);
		debug('parser is %O', parser.errors);
		expect(parser).to.have.property('errors').that.is.an('array').with.lengthOf(0);
		expect(result).to.be.an.instanceof(WorldSitesAndPops);
	});
});
