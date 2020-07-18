import {expect} from 'chai';
import sinon from 'sinon';
import proxyquire from 'proxyquire';

const sandbox = sinon.createSandbox();
const noop = () => undefined;
const parsimmonModule = sandbox.stub({createLanguage: noop, seqMap: noop});

const rawFileModule = proxyquire('../../../src/parsers/raws/rawFile', {
	parsimmon: parsimmonModule
});

const {default: createRawFileParser} = rawFileModule;

describe('src/parsers/raws/rawFile', () => {
	it('should export a function as default', () => {
		expect(createRawFileParser).to.be.a('function').with.lengthOf(0);
	});

	describe('createRawFileParser', () => {
		beforeEach(() => {
			parsimmonModule.createLanguage.returnsArg(0);
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
			parsimmonModule.seqMap.returns(fakeResult);

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
