import proxyquire from 'proxyquire';
import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import {of as futureOf} from 'fluture';
import {setupModuleDependency, ensureModuleFunctionExport, setupFakeFsModule} from './../../helpers';

chai.use(sinonChai);

const sandbox = sinon.sandbox.create();
const fakeModule = setupModuleDependency(sandbox);
const fsModule = setupFakeFsModule(sandbox);
const {readFileFuture: readFileFutureStub} = fsModule.fs;
const worldGenSettingsParserModule = {default: {file: fakeModule(['parse'])}};
const {parse: worldSettingsFileParseStub} = worldGenSettingsParserModule.default.file;
const worldGenSettingsModelModule = fakeModule(['fromParser']);
const {fromParser: fromParserStub} = worldGenSettingsModelModule;
const pathModule = fakeModule(['resolve']);

const worldGenSettingsModule = proxyquire('./../../../src/api/settings/worldGen', {
	path: pathModule,
	'./../../utility/fs': fsModule,
	'./../../dsl/parsers/settings/worldGen': worldGenSettingsParserModule,
	'./../../model/settings/worldGen': worldGenSettingsModelModule
});

const {default: getWorldGenSettings} = worldGenSettingsModule;

describe('api/raws/creature', function () {
	ensureModuleFunctionExport(worldGenSettingsModule, 'default');

	afterEach(function () {
		sandbox.reset();
	});

	it('should parse and return the world gen settings', function (done) {
		const dfRootPath = 'c:/df';
		const fileContents = '[YES:NO]';
		const parseResult = {value: {yes: false}};
		const modelResult = {yes: false};
		readFileFutureStub.returns(futureOf(fileContents));
		worldSettingsFileParseStub.returns(parseResult);
		fromParserStub.returns(modelResult);

		getWorldGenSettings({dfRootPath}).fork(
			done,
			(result) => {
				expect(result).to.equal(modelResult);
				done();
			}
		);
	});
});

