import {describe, it, afterEach} from 'mocha';
import {expect, use} from 'chai';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import proxyquire from 'proxyquire';
import {resolve, promise} from 'fluture';
import {times} from 'ramda';
import {createFnFsStubModule} from '../../../shared/test/fs';

use(sinonChai);
const noop = () => undefined;
const sandbox = sinon.createSandbox();
const fsModule = createFnFsStubModule(sandbox);
const pathModule = sandbox.stub({resolve: noop});

const savesModule = proxyquire('../src', {
	'@matthemsteger/utils-fn-fs': fsModule,
	path: pathModule
});

const {getSavePath, getAllSaveRegions} = savesModule;

describe('src/index', () => {
	afterEach(() => {
		sandbox.reset();
	});

	it('should export a getSavePath function', () => {
		expect(getSavePath).to.be.a('function').with.lengthOf(1);
	});

	it('should export a getAllSaveRegions function', () => {
		expect(getAllSaveRegions).to.be.a('function').with.lengthOf(1);
	});

	const fakePath = '~/df';
	describe('getSavePath', () => {
		it('should get the path to the save folder', () => {
			pathModule.resolve.returns(`${fakePath}/data/save`);
			const savepath = getSavePath(fakePath);

			expect(savepath).to.equal(`${fakePath}/data/save`);
		});
	});

	describe('getAllSaveRegions', () => {
		const makeFakeDirEnt = (n) => ({
			isDirectory: () => true,
			name: `region${n}`
		});

		it('should get all save regions', async () => {
			pathModule.resolve.returns(`${fakePath}/data/save`);
			fsModule.fs.readdirFuture.returns(
				resolve(times(makeFakeDirEnt, 10))
			);

			const result = await promise(
				getAllSaveRegions({dfRootPath: fakePath})
			);
			expect(result).to.have.ordered.members([
				0,
				1,
				2,
				3,
				4,
				5,
				6,
				7,
				8,
				9
			]);
		});
	});
});
