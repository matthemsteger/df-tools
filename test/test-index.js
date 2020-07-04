import {expect} from 'chai';
import main from './../src';

describe('main module', function () {
	it('should export an empty object by default', function () {
		expect(main).to.be.an('object');
	});
});
