import {expect} from 'chai';
import fs from 'fs';
import path from 'path';
import Promise from 'bluebird';
import _debug from 'debug';
import rawCreaturesParser from './../../../src/dsl/parsers/raws/creatures/rawCreaturesParser';

Promise.promisifyAll(fs);
const debug = _debug('df:test:dsl:int-rawCreaturesParser');

describe('rawCreaturesParser integration tests', function () {
	it('should parse properly a raw creatures file', async function () {
		const rawtext = await fs.readFileAsync(path.resolve(__dirname, './../data/creature_fanciful.txt'), 'utf8');
		const result = rawCreaturesParser.file.parse(rawtext);
		debug('parser result is %O', result);

		expect(result).to.not.be.null;
		expect(result).to.have.property('rawObjects').that.is.an('array').with.lengthOf(2);
	});
});
