import _ from 'lodash';
import chai, {expect} from 'chai';
import chaiInterface from 'chai-interface';
import BaseLexer, {
	modes,
	createLexerDefinition
} from './../../../src/dsl/lexers/baseLexer';

chai.use(chaiInterface);

describe.skip('main module', function () {
	it('exports a constructor by default', function () {
		expect(BaseLexer).to.be.a('function');
	});

	it('exports a modes object', function () {
		expect(modes).to.be.an('object');
	});

	it('exports a createLexerDefinition function', function () {
		expect(createLexerDefinition).to.be.a('function');
	});

	describe('modes', function () {
		['INSIDE', 'OUTSIDE', 'INSIDE_ARGS'].forEach((prop) => {
			it(`has a property of ${prop}`, function () {
				expect(modes).to.have.property(prop);
			});
		});
	});

	describe('createLexerDefinition', function () {
		const fakeTokens = [_.noop, _.noop, _.noop];

		it('should throw an error if arg is not an array', function () {
			expect(() => {
				createLexerDefinition();
			}).to.throw(Error);
		});

		it('should return a lexer definition shape object', function () {
			const def = createLexerDefinition(fakeTokens);
			expect(def).to.have.interface({
				defaultMode: String,
				modes: Object
			});
		});
	});

	describe('BaseLexer', async function () {
		it('should extend Lexer from chevrotain');
	});
});
