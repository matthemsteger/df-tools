import {expect} from 'chai';
import fs from 'fs';
import path from 'path';
import Promise from 'bluebird';
import _debug from 'debug';
import itemAmmoParser from './../../../src/dsl/parsers/raws/ammo/itemAmmoParser';

Promise.promisifyAll(fs);
const debug = _debug('df:test:dsl:int-itemAmmoParser');

describe('itemAmmoParser integration tests', function() {
	it('should parse properly a raw item ammo file', async function() {
		const rawtext = await fs.readFileAsync(
			path.resolve(__dirname, './../data/item_ammo.txt'),
			'utf8'
		);
		const result = itemAmmoParser.file.parse(rawtext);
		debug('parser result is %O', result);

		expect(result).to.be.an('object');
		expect(result).to.have.property('status', true);
		expect(result)
			.to.have.property('value')
			.that.is.an('object');
		const {value: parseValue} = result;
		expect(parseValue).to.have.property('label', 'item_ammo');
		expect(parseValue)
			.to.have.property('objects')
			.that.is.an('array')
			.with.lengthOf(3);
	});
});
