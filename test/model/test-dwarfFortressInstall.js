import proxyquire from 'proxyquire';
import {expect} from 'chai';
import sinon from 'sinon';

const validInput = {
	path: 'C:\\df\\',
	version: '0.43.05'
};

const pathModule = sinon.stub({resolve: () => undefined});

const dwarfFortressInstallModule = proxyquire(
	'./../../src/model/install/dwarfFortressInstall',
	{
		path: pathModule
	}
);

const {default: createDwarfFortressInstall} = dwarfFortressInstallModule;

describe('model/install/dwarfFortressInstall', function () {
	it('should export a constructor by default', function () {
		expect(createDwarfFortressInstall).to.be.a('function');
	});

	describe('DwarfFortressInstall', function () {
		it('should allow no input and initialize empty', function () {
			const install = createDwarfFortressInstall();
			['path', 'version'].forEach((prop) => {
				expect(install).to.have.property(prop, undefined);
			});
		});

		['path', 'version'].forEach((prop) => {
			it(`should have a property ${prop} assigned based on input object`, function () {
				const install = createDwarfFortressInstall(validInput);
				expect(install).to.have.property(
					prop,
					validInput[prop],
					`invalid ${prop}`
				);
			});
		});
	});
});
