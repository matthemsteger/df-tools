import {expect} from 'chai';
import * as languageTokens from './../../../src/dsl/tokens/languageTokens';

describe('main module', function () {
	['Comment', 'TokenOpen', 'TokenClose', 'TokenArgSeperator', 'TokenArgument', 'WhiteSpace']
		.forEach((tokenName) => {
			it(`should export a constructor named ${tokenName}`, function () {
				expect(languageTokens).to.have.property(tokenName);
				expect(languageTokens[tokenName]).to.be.a('function');
			});
		});
});
