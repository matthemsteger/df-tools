import {expect} from 'chai';
import _debug from 'debug';
import getWorldGenSettings from './../../../src/api/settings/worldGen';

const debug = _debug('df:test:api:settings:worldGen');

const {DF_TEST_PATH} = process.env;

describe('integration:api/settings/worldGen', function() {
	it('should parse a world gen settings file and output an object', function(done) {
		this.timeout(10000);
		getWorldGenSettings({dfRootPath: DF_TEST_PATH}).fork(done, (result) => {
			debug('result is %O', result);
			expect(result).to.be.an('object');
			done();
		});
	});
});
