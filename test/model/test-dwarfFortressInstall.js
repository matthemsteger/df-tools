import {expect} from 'chai';
import DwarfFortressInstall from './../../src/model/dwarfFortressInstall';

const validInput = {
	path: 'C:\\df\\',
	version: '0.43.05'
};

describe('main module', function () {
	it('should export a constructor by default', function () {
		expect(DwarfFortressInstall).to.be.a('function');
	});

	describe('DwarfFortressInstall', function () {
		it('should allow no input and initialize empty', function () {
			const install = new DwarfFortressInstall();
			['path', 'version'].forEach((prop) => {
				expect(install).to.have.property(prop, undefined);
			});
		});

		['path', 'version'].forEach((prop) => {
			it(`should have a property ${prop} assigned based on input object`, function () {
				const install = new DwarfFortressInstall(validInput);
				expect(install).to.have.property(prop, validInput[prop], `invalid ${prop}`);
			});
		});
	});
});
