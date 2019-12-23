import {describe, it} from 'mocha';
import {expect} from 'chai';
import fs from 'fs';
import path from 'path';
import util from 'util';
import {path as atPath} from 'ramda';
import {glob} from '@matthemsteger/utils-fn-fs';
import {performance} from 'perf_hooks';
import {parallel, encaseP} from 'fluture';
import createRawFileParser from '../../../src/parsers/raws/rawFile';

const mapSeries = parallel(1);
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

	it('**temp debug** should parse entire clean raws', async function() {
		this.timeout(0);
		const parser = createRawFileParser();
		const rawFiles = await glob(
			'C:\\df\\df-clean\\raw\\objects\\creature_standard.txt',
			{
				nodir: true,
				absolute: true
			}
		).promise();

		const results = await mapSeries(
			rawFiles.map(
				encaseP(async (file) => {
					const rawText = await readFileAsync(file, 'utf8');
					console.log(`start parse ${file}`);
					const startParse = performance.now();
					const result = parser.file.tryParse(rawText);
					const endParse = performance.now();
					console.log(
						`finished parsing ${file} in ${(endParse - startParse) /
							1000}s`
					);
					fs.writeFileSync(
						'test.json',
						JSON.stringify(result),
						'utf8'
					);
					return result;
				})
			)
		).promise();
		return results;
	});
});
