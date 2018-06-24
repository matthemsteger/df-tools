import {expect} from 'chai';
import fs from 'fs';
import path from 'path';
import Promise from 'bluebird';
import _debug from 'debug';

import rawCreaturesParser from './../../../../src/dsl/parsers/raws/creatures/rawCreaturesParser';
import {modelCreatureRawFile} from './../../../../src/model/raws/creature/creatureRawProcessing';

Promise.promisifyAll(fs);
const debug = _debug('df:test:model:raws:creature:int-creatureRawProcessing');

describe('creature raw processing integration tests', function() {
	it('should parse a raw creature file and return creature objects', async function() {
		const rawtext = await fs.readFileAsync(
			path.resolve(
				__dirname,
				'./../../../dsl/data/creature_fanciful.txt'
			),
			'utf8'
		);
		const {status, value: rawFile} = rawCreaturesParser.file.parse(rawtext);
		debug('parse result is %s', status);

		const result = modelCreatureRawFile(rawFile);
		debug('parseCreatureRawFile result is %O', result);

		expect(result)
			.to.be.an('array')
			.that.has.lengthOf(2);
		expect(result[0]).to.have.property('singularName', 'chimera');
	});
});
