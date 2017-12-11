import {expect} from 'chai';
import path from 'path';
import _debug from 'debug';
import {fs} from './../../../../src/utility/fs';
import worldGenSettingsParser from './../../../../src/dsl/parsers/settings/worldGen';

const debug = _debug('df:test:dsl:parsers:settings:worldGen');

describe('integration:dsl/parsers/settings/worldGen', function () {
	it('should parse a world gen settings file', function (done) {
		const testDataPath = path.resolve(__dirname, './../../data/world_gen.txt');
		fs.readFileFuture(testDataPath, 'utf8')
			.map((contents) => {
				debug('contents is %s', contents);
				const result = worldGenSettingsParser.file.parse(contents);
				debug('parser result is %O', result);
				debug('parser value is %O', result.value);
				return result;
			})
			.fork(
				done,
				(result) => {
					expect(result).to.be.an('object');
					expect(result).to.have.property('status', true);
					expect(result).to.have.property('value').that.is.an('object');
					const {settings} = result.value;
					expect(settings).to.be.an('array').with.lengthOf(2);
					expect(settings[0]).to.have.property('children').that.is.an('array').with.lengthOf(87);
					done();
				}
			);
	});
});
