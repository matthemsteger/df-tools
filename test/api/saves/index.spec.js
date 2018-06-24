import {describe, it, afterEach} from 'mocha';
import proxyquire from 'proxyquire';
import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import {of as futureOf} from 'fluture';
import R from 'ramda';
import {
	setupModuleDependency,
	ensureModuleFunctionExport,
	fakeFuturifiedFs
} from './../../helpers';

chai.use(sinonChai);

const sandbox = sinon.createSandbox();
const fakeModule = setupModuleDependency(sandbox);
const pathModule = fakeModule(['resolve']);
const fsModule = {fs: fakeFuturifiedFs(sandbox)};
const {
	fs: {readdirFuture: readdirFutureStub}
} = fsModule;

const savesIndexModule = proxyquire('./../../../src/api/saves', {
	path: pathModule,
	'./../../utility/fs': fsModule
});

const {getAllSaveRegions, getAllSaves} = savesIndexModule;

describe('api/saves/index', function() {
	afterEach(function() {
		sandbox.reset();
	});

	const ensureFuncExport = ensureModuleFunctionExport(savesIndexModule);
	ensureFuncExport('getAllSaveRegions');
	ensureFuncExport('getAllSaves');

	describe('getAllSaveRegions', function() {
		const dfRootPath = 'c:/df';
		const regionNumbers = [4, 1, 5, 22, 7, 6];
		const regionFiles = R.compose(
			R.append('something'),
			R.map((n) => `region${n}`)
		)(regionNumbers);

		it('should get the numbered regions from the directory', function(done) {
			readdirFutureStub.returns(futureOf(regionFiles));
			getAllSaveRegions({dfRootPath}).fork(done, (regions) => {
				expect(regions).to.have.ordered.members([1, 4, 5, 6, 7, 22]);
				done();
			});
		});
	});

	describe('getAllSaves', function() {
		it('should return an empty array', function(done) {
			getAllSaves().fork(done, (allSaves) => {
				expect(allSaves).to.be.an('array').that.is.empty;
				done();
			});
		});
	});
});
