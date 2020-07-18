import {expect} from 'chai';
import _debug from 'debug';
import {genWorld} from './../../../src/api/worldgen';
import creatures from './../../dsl/data/creatures.json';

const debug = _debug('df:test:api:worldgen');

const {DF_TEST_PATH} = process.env;

describe('integration:api/worldgen', function () {
	it('should generate a dwarf fortress world and return the result', function (done) {
		this.timeout(5 * 60 * 1000); // 5 minutes
		genWorld({
			dfRootPath: DF_TEST_PATH,
			config: 'MATT SMALL',
			creatures
		}).fork(done, (result) => {
			debug('result is %O', result);
			expect(result).to.be.an('object').that.does.exist;
			done();
		});
	});

	it('should be able to cancel a world generation', function (done) {
		this.timeout(3 * 60 * 1000); // 3 minutes
		const cancel = genWorld({
			dfRootPath: DF_TEST_PATH,
			config: 'MATT SMALL',
			creatures
		}).fork(done, (result) => {
			debug('result is %O', result);
			expect.fail(0, 1, 'Expected cancel, but got result');
			done();
		});

		setTimeout(() => {
			cancel();
			done();
		}, 2000);
	});
});
