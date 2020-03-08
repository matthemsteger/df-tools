import {describe, it, afterEach} from 'mocha';
import {expect, use} from 'chai';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import proxyquire from 'proxyquire';
import {resolve} from 'fluture';
import Maybe from 'folktale/maybe';
import {curryN} from 'ramda';
import {createFnFsStubModule} from '../../../shared/test/fs';

use(sinonChai);
const noop = () => undefined;
const sandbox = sinon.createSandbox();
const osModule = sandbox.stub({type: noop});
const pathModule = sandbox.stub({resolve: noop});
const fsModule = createFnFsStubModule(sandbox);
const createInstallModule = sandbox.stub({default: noop});

const installModule = proxyquire('./../src', {
	os: osModule,
	path: pathModule,
	'@matthemsteger/utils-fn-fs': fsModule,
	'./createDwarfFortressInstall': createInstallModule
});

const {discoverInstallMeta, discoverInstall} = installModule;

describe('src/index', () => {
	it('should export a discoverInstallMeta function', () => {
		expect(discoverInstallMeta)
			.to.be.a('function')
			.with.lengthOf(1);
	});

	it('should export a discoverInstall function', () => {
		expect(discoverInstall)
			.to.be.a('function')
			.with.lengthOf(1);
	});

	describe('discoverInstallMeta', () => {
		const fakePath = '~/df';

		afterEach(() => {
			sandbox.reset();
		});

		it('should give the meta', (done) => {
			const version = '0.99.03';
			fsModule.maybeDirHasFile.callsFake(
				curryN(2, () => resolve(Maybe.of('release notes.txt')))
			);
			pathModule.resolve.returns(`${fakePath}/release notes.txt`);
			fsModule.fs.readFileFuture.returns(
				resolve(`Release notes for ${version}`)
			);

			discoverInstallMeta(fakePath).fork(done, (result) => {
				expect(result).to.deep.equal({
					installPath: fakePath,
					version
				});

				done();
			});
		});

		it('should give the meta without version if release notes not found', (done) => {
			fsModule.maybeDirHasFile.callsFake(
				curryN(2, () => resolve(Maybe.empty()))
			);

			discoverInstallMeta(fakePath).fork(done, (result) => {
				expect(result).to.deep.equal({
					installPath: fakePath
				});

				done();
			});
		});
	});

	describe('discoverInstall', () => {
		const fakePath = '~/df';

		it('should should get install information', (done) => {
			const version = '0.99.04';
			const osType = 'Linux';
			const fakeResult = {path: fakePath};
			fsModule.maybeDirHasFile.callsFake(
				curryN(2, () => resolve(Maybe.of('release notes.txt')))
			);
			pathModule.resolve.returns(`${fakePath}/release notes.txt`);
			fsModule.fs.readFileFuture.returns(
				resolve(`Release notes for ${version}`)
			);
			osModule.type.returns(osType);
			createInstallModule.default.returns(fakeResult);

			discoverInstall({dfRootPath: fakePath}).fork(done, (result) => {
				expect(
					createInstallModule.default
				).to.have.been.calledWithExactly({
					path: fakePath,
					version,
					osType
				});

				expect(result).to.equal(fakeResult);

				done();
			});
		});
	});
});
