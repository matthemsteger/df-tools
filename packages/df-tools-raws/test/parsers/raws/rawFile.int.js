import {describe, it} from 'mocha';
import {expect} from 'chai';
import fs from 'fs';
import path from 'path';
import util from 'util';
import {path as atPath} from 'ramda';
import {glob} from '@matthemsteger/utils-fn-fs';
import {performance} from 'perf_hooks';
import {parallel, encaseP, promise} from 'fluture';
import createRawFileParser from '../../../src/parsers/raws/rawFile';
import parseSimpleRawFile from '../../../src/parsers/raws/simpleRawFile';
import createRegexParserFromDefinition from '../../../src/parsers/raws/createRegexParserFromDefinition';
import creatureDefinition from '../../../src/parsers/raws/definitions/creature';

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
		expect(result).to.have.property('value').that.is.an('object');
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
		expect(result).to.have.property('value').that.is.an('object');
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
		expect(buggedEntry).to.have.property('start').that.is.deep.equal({
			offset: 17224,
			line: 415,
			column: 3
		});
	});

	it.skip('**temp debug** should parse entire clean raws', async function debugParse() {
		this.timeout(0);
		const parser = createRawFileParser();
		const rawFiles = await promise(
			glob(
				'/home/mch-pc/.dwarffortress/raw/objects/creature_standard.txt',
				{
					nodir: true,
					absolute: true
				}
			)
		);

		const results = await promise(
			mapSeries(
				rawFiles.map((f) =>
					encaseP(async (file) => {
						const rawText = await readFileAsync(file, 'utf8');
						// eslint-disable-next-line no-console
						console.log(`start parse ${file}`);
						const startParse = performance.now();
						const result = parser.file.tryParse(rawText);
						const endParse = performance.now();
						// eslint-disable-next-line no-console
						console.log(
							`finished parsing ${file} in ${
								(endParse - startParse) / 1000
							}s`
						);
						fs.writeFileSync(
							'test.json',
							JSON.stringify(result),
							'utf8'
						);
						return result;
					})(f)
				)
			)
		);
		// eslint-disable-next-line no-console
		console.log(results);
		return results;
	});

	it.skip('**temp debug** should parse entire clean raws', async function debugParse() {
		this.timeout(0);
		const rawFiles = await promise(
			glob(
				'/home/mch-pc/.dwarffortress/raw/objects/creature_standard.txt',
				{
					nodir: true,
					absolute: true
				}
			)
		);

		const results = await promise(
			mapSeries(
				rawFiles.map((f) =>
					encaseP(async (file) => {
						const rawText = await readFileAsync(file, 'utf8');
						// eslint-disable-next-line no-console
						console.log(`start parse ${file}`);
						const startParse = performance.now();
						const result = parseSimpleRawFile(rawText);
						const endParse = performance.now();
						// eslint-disable-next-line no-console
						console.log(
							`finished parsing ${file} in ${
								(endParse - startParse) / 1000
							}s`
						);
						fs.writeFileSync(
							'test.json',
							JSON.stringify(result),
							'utf8'
						);
						return result;
					})(f)
				)
			)
		);
		// eslint-disable-next-line no-console
		console.log(results);
		return results;
	});

	it('**temp debug** should parse entire clean raws', async function debugParse() {
		this.timeout(0);
		const rawFiles = await promise(
			glob(
				'/home/mch-pc/.dwarffortress/raw/objects/creature_standard.txt',
				{
					nodir: true,
					absolute: true
				}
			)
		);

		const results = await promise(
			mapSeries(
				rawFiles.map((f) =>
					encaseP(async (file) => {
						const rawText = await readFileAsync(file, 'utf8');
						// eslint-disable-next-line no-console
						console.log(`start parse ${file}`);
						const startParse = performance.now();
						const parser = createRegexParserFromDefinition(
							creatureDefinition
						);
						const result = parser(rawText);
						console.log(result);
						const endParse = performance.now();
						// eslint-disable-next-line no-console
						console.log(
							`finished parsing ${file} in ${
								(endParse - startParse) / 1000
							}s`
						);
						fs.writeFileSync(
							'test.json',
							JSON.stringify(result),
							'utf8'
						);
						return result;
					})(f)
				)
			)
		);
		// eslint-disable-next-line no-console
		console.log(results);
		return results;
	});
});
