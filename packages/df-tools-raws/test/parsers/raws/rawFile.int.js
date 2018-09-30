import {describe, it} from 'mocha';
import {expect} from 'chai';
import fs from 'fs';
import path from 'path';
import util from 'util';
import {path as atPath} from 'ramda';
import createRawFileParser from '../../../src/parsers/raws/rawFile';

const readFileAsync = util.promisify(fs.readFile);

describe('(integration) src/parsers/raws/rawFile', () => {
	it('should parse a normal creature raw file', async () => {
		const parser = createRawFileParser();
		const rawText = await readFileAsync(
			path.resolve(__dirname, '../../data/creature_fanciful.txt'),
			'utf8'
		);

		const result = parser.file.parse(rawText);
		expect(result).to.be.an('object');
		expect(result).to.have.property('status', true);
		expect(result)
			.to.have.property('value')
			.that.is.an('object');
		const {value} = result;
		expect(value).to.have.property('label', 'creature_fanciful');
		expect(value)
			.to.have.property('objectType')
			.that.is.an('object')
			.with.property('value', 'CREATURE');
		expect(value)
			.to.have.property('objects')
			.that.is.an('array')
			.with.lengthOf(2);
	});

	it('should parse a bugged creatures file', async () => {
		const parser = createRawFileParser();
		const rawText = await readFileAsync(
			path.resolve(__dirname, '../../data/creature_bugged.txt'),
			'utf8'
		);

		const result = parser.file.parse(rawText);
		expect(result).to.be.an('object');
		expect(result).to.have.property('status', true);
		expect(result)
			.to.have.property('value')
			.that.is.an('object');
		const {value} = result;
		expect(value).to.have.property('label', 'creature_standard');
		expect(value)
			.to.have.property('objectType')
			.that.is.an('object')
			.with.property('value', 'CREATURE');
		expect(value)
			.to.have.property('objects')
			.that.is.an('array')
			.with.lengthOf(1);
		const buggedEntry = atPath(['objects', 0, 'children', 155], value);
		expect(buggedEntry).to.have.property('name', 'SET_TL_GROUP');
		expect(buggedEntry)
			.to.have.property('start')
			.that.is.deep.equal({
				offset: 17638,
				line: 415,
				column: 3
			});
	});
});
