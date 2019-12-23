import {describe, it, beforeEach, afterEach} from 'mocha';
import {expect} from 'chai';
import sinon from 'sinon';
import proxyquire from 'proxyquire';

const sandbox = sinon.createSandbox();
const noop = () => undefined;
const parsimmonModule = {createLanguage: noop, seqMap: noop};
const {createLanguage: createLanguageStub, seqMap: seqMapStub} = sandbox.stub(
	parsimmonModule
);

const rawFileModule = proxyquire('../../../src/parsers/raws/rawFile', {
	P: parsimmonModule
});

const {default: createRawFileParser} = rawFileModule;

describe('src/parsers/raws/rawFile', () => {
	it('should export a function as default', () => {
		expect(createRawFileParser)
			.to.be.a('function')
			.with.lengthOf(0);
	});

	describe('createRawFileParser', () => {
		beforeEach(() => {
			createLanguageStub.returnsArg(0);
		});

		afterEach(() => {
			sandbox.reset();
		});

		it('should create a parsing language', () => {
			const language = createRawFileParser();

			expect(language).to.be.an('object');
			expect(language).to.have.property('file');
			expect(language).to.have.property('fileLabel');
			expect(language).to.have.property('fileObjectType');
		});

		it('should have a language file', () => {
			const fakeResult = {};
			seqMapStub.returns(fakeResult);

			const language = createRawFileParser();
			const fileObjectType = {
				trim: sandbox.stub().returnsThis(),
				chain: sandbox.stub().returns({})
			};
			const fakeLang = {fileObjectType};

			const result = language.file(fakeLang);
			expect(result).to.equal(fakeResult);
		});
	});
});
