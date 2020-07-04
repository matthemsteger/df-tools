import {expect} from 'chai';

import root from '../src';

describe('src/index', () => {
	it('should export an empty object', () => {
		expect(root).to.be.an('object').that.is.empty;
	});
});
