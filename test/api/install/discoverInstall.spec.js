import {describe, it, beforeEach, afterEach} from 'mocha';
import proxyquire from 'proxyquire';
import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import {of as futureOf} from 'fluture';
import Maybe from 'folktale/maybe';
import R from 'ramda';
import {
	setupModuleDependency,
	ensureModuleFunctionExport,
	fakeFuturifiedFs
} from './../../helpers';

chai.use(sinonChai);

const sandbox = sinon.createSandbox();
const fakeModule = setupModuleDependency(sandbox);
const dwarfFortressInstallModule = fakeModule(['default']);
const {default: createDwarfFortressInstallStub} = dwarfFortressInstallModule;
const fsModule = fakeModule(['maybeDirHasFile']);
fsModule.fs = fakeFuturifiedFs(sandbox);
const {
	maybeDirHasFile: maybeDirHasFileStub,
	fs: {readFileFuture: readFileFutureStub}
} = fsModule;
const pathModule = fakeModule(['resolve']);
const osModule = fakeModule(['type']);
const {type: osTypeStub} = osModule;

const discoverInstallModule = proxyquire(
	'./../../../src/api/install/discoverInstall',
	{
		path: pathModule,
		os: osModule,
		'./../../utility/fs': fsModule,
		'./../../model/install/dwarfFortressInstall': dwarfFortressInstallModule
	}
);

const {discoverInstall, discoverInstallMeta} = discoverInstallModule;

describe('api/install/discoverInstall', function () {
	const version = '0.44.02';
	const releaseNotes = `Release notes for ${version}`;

	afterEach(function () {
		sandbox.reset();
	});

	const ensureFuncExport = ensureModuleFunctionExport(discoverInstallModule);
	ensureFuncExport('discoverInstall');
	ensureFuncExport('discoverInstallMeta');

	describe('discoverInstallMeta', function () {
		const installPath = 'c:/df';

		it('should get the meta of a df notes file', function (done) {
			maybeDirHasFileStub.returns(
				R.always(futureOf(Maybe.of('release notes.txt')))
			);
			readFileFutureStub.returns(futureOf(releaseNotes));
			discoverInstallMeta(installPath).fork(done, (meta) => {
				expect(meta).to.deep.equal({
					installPath,
					version
				});
				done();
			});
		});

		it('should get only the install path if no release notes', function (done) {
			maybeDirHasFileStub.returns(R.always(futureOf(Maybe.empty())));
			discoverInstallMeta(installPath).fork(done, (meta) => {
				expect(meta).to.deep.equal({installPath});
				expect(readFileFutureStub).to.not.have.been.called;
				done();
			});
		});

		it('should set the version to undefined if not found', function (done) {
			maybeDirHasFileStub.returns(
				R.always(futureOf(Maybe.of('release notes.txt')))
			);
			readFileFutureStub.returns(futureOf(''));
			discoverInstallMeta(installPath).fork(done, (meta) => {
				expect(meta).to.deep.equal({installPath, version: undefined});
				done();
			});
		});
	});

	describe('discoverInstall', function () {
		let discoverInstallMetaStub;
		const dfRootPath = 'c:/df';

		beforeEach(function () {
			discoverInstallMetaStub = sandbox.stub(
				discoverInstallModule,
				'discoverInstallMeta'
			);
		});

		afterEach(function () {
			discoverInstallMetaStub.restore();
		});

		it('should return a dwarf fortress install from a dfRootPath', function (done) {
			maybeDirHasFileStub.returns(
				R.always(futureOf(Maybe.of('release notes.txt')))
			);
			readFileFutureStub.returns(futureOf(releaseNotes));
			const installResult = {};
			createDwarfFortressInstallStub.returns(installResult);
			const osType = 'Windows_NT';
			osTypeStub.returns(osType);

			discoverInstall({dfRootPath}).fork(done, (install) => {
				expect(install).to.equal(installResult);
				expect(
					createDwarfFortressInstallStub
				).to.have.been.calledWithMatch({
					path: dfRootPath,
					version,
					osType
				});

				done();
			});
		});
	});
});
