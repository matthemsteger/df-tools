import {Parser, tokenMatcher} from 'chevrotain';
import _ from 'lodash';
import {Comment, TokenOpen, TokenArgSeperator, TokenArgument, TokenClose} from './../../tokens/languageTokens';
import {BaseRawToken, ObjectToken, ObjectTypeToken} from './../../tokens/rawTokens';

export default class BaseRawParser extends Parser {
	constructor(tokens, tokenConstructors = []) {
		const filteredTokens = _.reject(tokens, (token, idx) => tokenMatcher(token, Comment) && idx !== 0);
		super(filteredTokens, tokenConstructors, {outputCst: true});

		this.RULE('parseRawFile', () => {
			this.SUBRULE(this.fileLabel);
			this.SUBRULE(this.objectType);
			this.SUBRULE(this.rawObjects);
		});

		this.fileLabel = this.RULE('fileLabel', () => {
			this.CONSUME(Comment);
		});

		this.objectType = this.RULE('objectType', () => {
			this.CONSUME(TokenOpen);
			this.CONSUME(ObjectToken);
			this.CONSUME(TokenArgSeperator);
			this.CONSUME(TokenArgument);
			this.CONSUME(TokenClose);
		});

		this.rawObjects = this.RULE('rawObjects', () => {
			this.MANY(() => {
				this.SUBRULE(this.rawObject);
			});
		});

		this.rawObject = this.RULE('rawObject', () => {
			this.SUBRULE(this.objectTag);
			this.MANY({
				GATE() {
					// if the next token is one of the objectType tokens, then we dont want to gobble it up
					let tokenCount = 1;
					let nextToken = this.LA(tokenCount);
					while (nextToken && (nextToken.image === '[' || tokenMatcher(nextToken, Comment) === true)) {
						tokenCount += 1;
						nextToken = this.LA(tokenCount);
					}

					return nextToken && tokenMatcher(nextToken, ObjectTypeToken) === false;
				},
				DEF: () => {
					this.SUBRULE(this.objectChildTag);
				}
			});
		});

		this.objectTag = this.RULE('objectTag', () => {
			this.CONSUME(TokenOpen);

			this.CONSUME(ObjectTypeToken);
			this.CONSUME(TokenArgSeperator);
			this.CONSUME(TokenArgument);
			this.CONSUME(TokenClose);
		});

		this.objectChildTag = this.RULE('objectChildTag', () => {
			this.CONSUME(TokenOpen);
			this.CONSUME(BaseRawToken);
			this.MANY(() => {
				this.CONSUME(TokenArgSeperator);
				this.CONSUME(TokenArgument);
			});

			this.CONSUME(TokenClose);
		});

		Parser.performSelfAnalysis(this);
	}
}
