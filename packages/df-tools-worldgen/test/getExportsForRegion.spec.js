import {describe, it, afterEach} from 'mocha';
import {expect, use} from 'chai';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import proxyquire from 'proxyquire';
import {resolve, promise} from 'fluture';

import {createFnFsStubModule} from '../../../shared/test/fs';

use(sinonChai);
const sandbox = sinon.createSandbox();
const fsModule = createFnFsStubModule(sandbox);
const {glob: globStub} = fsModule;

const getExportsForRegionModule = proxyquire('../src/getExportsForRegion', {
	'@matthemsteger/utils-fn-fs': fsModule
});

const {
	REGION_EXPORT_TYPES,
	default: getExportsForRegion
} = getExportsForRegionModule;

describe('src/getExportsForRegion', () => {
	afterEach(() => {
		sandbox.reset();
	});

	it('should export getExportsForRegion as default', () => {
		expect(getExportsForRegion).to.be.a('function').with.lengthOf(1);
	});

	it('should export an object REGION_EXPORT_TYPES', () => {
		expect(REGION_EXPORT_TYPES).to.be.a('object');
	});

	describe('getExportsForRegion', () => {
		const installPath = '~/.dwarffortress';
		const region = 0;

		const files = [
			'region0-00030-01-01-detailed.bmp',
			'region0-00030-01-01-world_history.txt',
			'region0-00030-01-01-world_map.bmp',
			'region0-00030-01-01-world_sites_and_pops.txt',
			'region0-world_gen_param.txt'
		];

		it('gets the exports for a region', async () => {
			globStub.returns(resolve(files));

			const result = await promise(
				getExportsForRegion({installPath, region})
			);

			expect(result).to.deep.equal({
				detailedMap: 'region0-00030-01-01-detailed.bmp',
				worldHistory: 'region0-00030-01-01-world_history.txt',
				worldMap: 'region0-00030-01-01-world_map.bmp',
				worldSitesAndPops:
					'region0-00030-01-01-world_sites_and_pops.txt',
				worldGenParams: 'region0-world_gen_param.txt'
			});
		});
	});
});
