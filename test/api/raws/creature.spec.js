import {describe, it, beforeEach, afterEach} from 'mocha';
import proxyquire from 'proxyquire';
import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import {of as futureOf} from 'fluture';
import {
	setupModuleDependency,
	ensureModuleFunctionExport,
	fakeFuturifiedFs
} from './../../helpers';

chai.use(sinonChai);

const sandbox = sinon.createSandbox();
const fakeModule = setupModuleDependency(sandbox);
const fsModule = fakeModule(['glob']);
fsModule.fs = fakeFuturifiedFs(sandbox);
const {readFileFuture: readFileFutureStub} = fsModule.fs;
const rawCreaturesParserModule = {default: {file: fakeModule(['parse'])}};
const {parse: creatureFileParseStub} = rawCreaturesParserModule.default.file;
const rawFilesModule = {default: fakeModule(['creature'])};
const {creature: rawFilesCreatureStub} = rawFilesModule.default;

const creatureRawsModule = proxyquire('./../../../src/api/raws/creature', {
	'./../../utility/fs': fsModule,
	'./../../dsl/parsers/raws/creatures/rawCreaturesParser': rawCreaturesParserModule,
	'./rawFiles': rawFilesModule
});

const {
	parseCreatureRawText,
	parseCreatureRawFile,
	parseCreatureRaws
} = creatureRawsModule;

describe('api/raws/creature', function () {
	const ensureFunction = ensureModuleFunctionExport(creatureRawsModule);
	[
		'parseCreatureRawText',
		'parseCreatureRawFile',
		'parseCreatureRaws'
	].forEach(ensureFunction);

	const creatureRawFilePaths = [
		'c:/df/raw/objects/creature_birds.txt',
		'c:/df/raw/objects/creature_other.txt'
	];
	const rawFileContents = '[BLAH:1]';
	const parseResult = {something: 3};

	beforeEach(function () {
		rawFilesCreatureStub.returns(futureOf(creatureRawFilePaths));
		readFileFutureStub.returns(futureOf(rawFileContents));
		creatureFileParseStub.returns(parseResult);
	});

	afterEach(function () {
		sandbox.reset();
	});

	describe('parseCreatureRawText', function () {
		it('should return the result of parsing', function () {
			const result = parseCreatureRawText(rawFileContents);
			expect(result).to.equal(parseResult);
		});
	});

	describe('parseCreatureRawFile', function () {
		it('should take a path and return the result of parsing', function (done) {
			parseCreatureRawFile(creatureRawFilePaths[0]).fork(
				done,
				(result) => {
					expect(result).to.equal(parseResult);
					expect(readFileFutureStub).to.have.been.calledOnce;
					expect(creatureFileParseStub).to.have.been.calledOnce;
					done();
				}
			);
		});
	});

	describe('parseCreatureRaws', function () {
		it('should take a dwarf fortress root path and parse all creature files', function (done) {
			parseCreatureRaws('c:/df').fork(done, (result) => {
				const resultLength = creatureRawFilePaths.length;
				expect(result)
					.to.be.an('array')
					.that.has.lengthOf(resultLength);
				expect(readFileFutureStub).to.have.callCount(resultLength);
				expect(creatureFileParseStub).to.have.callCount(resultLength);
				done();
			});
		});
	});
});
