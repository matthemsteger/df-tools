import proxyquire from 'proxyquire';
import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import {of as futureOf} from 'fluture';
import {
	setupModuleDependency,
	ensureModuleFunctionExport,
	setupFakeFsModule
} from './../../../helpers';

chai.use(sinonChai);

const sandbox = sinon.sandbox.create();
const fakeModule = setupModuleDependency(sandbox);
const pathModule = fakeModule(['resolve']);
const iconvLiteModule = fakeModule(['decode']);
const {decode: decodeStub} = iconvLiteModule;
const fakeFsModule = setupFakeFsModule(sandbox);
const {
	fs: {readFileFuture: readFileFutureStub}
} = fakeFsModule;
const fakeParserModule = fakeModule(['default']);
const {default: createParserStub} = fakeParserModule;
const fileParser = fakeModule(['parse']);
const {parse: parseStub} = fileParser;
const fakeParser = {file: fileParser};

const worldSitesAndPopsModule = proxyquire(
	'./../../../../src/api/worldgen/worldExports/worldSitesAndPops',
	{
		path: pathModule,
		'iconv-lite': iconvLiteModule,
		'./../../../utility/fs': fakeFsModule,
		'./../../../dsl/parsers/regionWorldSitesPops': fakeParserModule
	}
);

const {default: parseWorldSitesAndPops} = worldSitesAndPopsModule;

describe('api/worldgen/worldExports/worldSitesAndPops', function() {
	beforeEach(function() {
		createParserStub.returns(fakeParser);
	});

	afterEach(function() {
		sandbox.reset();
	});

	ensureModuleFunctionExport(worldSitesAndPopsModule, 'default');

	describe('parseWorldSitesAndPops', function() {
		const fakeBuffer = {};
		const contents = 'blah';
		const filePath = 'c:/df/whatever';
		const creatures = {};

		it('should return the value of the parse', function(done) {
			const value = {blah: 'yes'};
			const parseResult = {status: true, value};
			readFileFutureStub.returns(futureOf(fakeBuffer));
			decodeStub.returns(contents);
			parseStub.returns(parseResult);

			parseWorldSitesAndPops({filePath, creatures}).fork(
				done,
				(result) => {
					expect(result).to.deep.equal(value);
					done();
				}
			);
		});

		it('should reject the future if status was false for parse', function(done) {
			const badParseResult = {status: false};
			readFileFutureStub.returns(futureOf(fakeBuffer));
			decodeStub.returns(contents);
			parseStub.returns(badParseResult);

			parseWorldSitesAndPops({filePath, creatures}).fork((err) => {
				expect(err)
					.to.have.property('message')
					.that.does.match(new RegExp(filePath));
				done();
			}, done);
		});
	});
});
