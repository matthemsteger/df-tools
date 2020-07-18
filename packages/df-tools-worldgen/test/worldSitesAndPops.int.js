import {describe, it} from 'mocha';
import {expect} from 'chai';
import fs from 'fs';
import path from 'path';
import util from 'util';
import {promise} from 'fluture';
import parseWorldSitesAndPops from '../src/worldSitesAndPops';

const readFileAsync = util.promisify(fs.readFile);

describe('(integration) src/worldSitesAndPops', () => {
	it('should parse a world settings and pops file', async () => {
		const creaturesRaw = await readFileAsync(
			path.resolve(__dirname, './data/creatures.json'),
			'utf8'
		);

		const creatures = JSON.parse(creaturesRaw);
		const filePath = path.resolve(
			__dirname,
			'./data/world_sites_and_pops_test_small.txt'
		);

		const result = await promise(
			parseWorldSitesAndPops({filePath, creatures})
		);

		expect(result)
			.to.have.property('civilizedWorldPopulation')
			.that.has.property('total')
			.equal(459993);

		expect(result)
			.to.have.property('civilizedWorldPopulation')
			.that.has.property('civilizedPopulations')
			.lengthOf(5);

		expect(result).to.have.property('sites');
		expect(result).to.have.property('outdoorAnimalPopulations');
		expect(result).to.have.property('undergroundAnimalPopulations');
	});
});
