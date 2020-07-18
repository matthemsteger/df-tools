import {expect} from 'chai';
import sinon from 'sinon';
import proxyquire from 'proxyquire';

const sandbox = sinon.createSandbox();
const pathModule = {resolve: () => undefined};
const {resolve: resolveStub} = sandbox.stub(pathModule);

const createInstallModule = proxyquire('../src/createDwarfFortressInstall', {
	path: pathModule
});

const {default: createDwarfFortressInstall} = createInstallModule;

describe('src/createDwarfFortressInstall', () => {
	it('should export a function as default', () => {
		expect(createDwarfFortressInstall).to.be.a('function').with.lengthOf(1);
	});

	describe('createDwarfFortressInstall', () => {
		const path = 'whatever';
		const version = '0.44.1';
		['Windows_NT', 'MacOS', 'anything'].forEach((osType) => {
			const executablePath =
				osType === 'Windows_NT' ? 'Dwarf Fortress.exe' : 'df';
			it(`should return an object with executable ${executablePath}`, () => {
				resolveStub.returns(executablePath);

				const result = createDwarfFortressInstall({
					path,
					version,
					osType
				});

				expect(result).to.deep.equal({
					path,
					version,
					osType,
					executablePath
				});
			});
		});
	});
});
