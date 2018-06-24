import {Parser} from 'chevrotain';
import _debug from 'debug';
import {
	Comment,
	TokenOpen,
	TokenArgSeperator,
	TokenArgument,
	TokenClose,
	TokenName
} from './../tokens/languageTokens';

const debug = _debug('df:dsl:parsers:genericLangParser');

export default class GenericLangParser extends Parser {
	constructor(tokens, tokenConstructors = []) {
		super(tokens, tokenConstructors);

		this.RULE('genericLanguageTokens', () => {
			const allTokens = [];
			this.MANY(() => {
				const genericToken = this.SUBRULE(this.possibleSubToken);
				if (genericToken) allTokens.push(genericToken);
			});

			return allTokens;
		});

		this.possibleSubToken = this.RULE('possibleSubToken', () => {
			let genericToken = null;
			this.OR([
				{ALT: () => this.CONSUME(Comment)},
				{
					ALT: () => {
						genericToken = this.SUBRULE(this.genericToken);
					}
				}
			]);

			return genericToken;
		});

		this.genericToken = this.RULE('genericToken', () => {
			this.CONSUME(TokenOpen);
			const tokenName = this.CONSUME(TokenName);
			const args = [];
			this.MANY(() => {
				this.CONSUME(TokenArgSeperator);
				const arg = this.CONSUME(TokenArgument);
				args.push(arg);
			});

			this.CONSUME(TokenClose);

			return {tokenName, args};
		});

		debug('performing self analysis');
		Parser.performSelfAnalysis(this);
	}
}
