import {expect} from 'chai';
import fs from 'fs';
import path from 'path';
import Promise from 'bluebird';
import iconv from 'iconv-lite';
import _debug from 'debug';
import createRegionWorldSitesPopsParser from './../../../src/dsl/parsers/regionWorldSitesPops/regionWorldSitesPopsParser';
import creatures from './../data/creatures.json';

Promise.promisifyAll(fs);
const debug = _debug('df:test:dsl:int-regionWorldSitesPopsParser');

describe('createRegionWorldSitesPopsParser integration tests', function() {
	this.timeout(0);

	[
		'./../data/world_sites_and_pops_test_debug.txt',
		'./../data/world_sites_and_pops_test_small.txt',
		'./../data/world_sites_and_pops_test.txt'
	].forEach((testFile) => {
		it(`should parse properly a world sites file ${path.basename(
			testFile
		)}`, async function() {
			const start = Date.now();
			const fakeRegionBuffer = await fs.readFileAsync(
				path.resolve(__dirname, testFile)
			);
			const fakeRegionText = iconv.decode(fakeRegionBuffer, 'cp437');

			const result = createRegionWorldSitesPopsParser(
				creatures
			).file.parse(fakeRegionText);
			debug('parser result is %O', result);

			expect(result).to.be.an('object');
			expect(result).to.have.property('status', true);
			expect(result)
				.to.have.property('value')
				.that.is.an('object');
			debug('elapsed: %d', Date.now() - start);
		});
	});
});
