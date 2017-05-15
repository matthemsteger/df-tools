import _ from 'lodash';
import {Lexer} from 'chevrotain';
import _debug from 'debug';
import {Comment, TokenOpen, TokenClose, TokenArgSeperator, TokenArgument, WhiteSpace, TokenName} from './../tokens/languageTokens';

const debug = _debug('df:dsl:baseLexer');

export const modes = {INSIDE: 'inside', OUTSIDE: 'outside', INSIDE_ARGS: 'inside_args'};
TokenOpen.PUSH_MODE = modes.INSIDE;
TokenClose.POP_MODE = true;
TokenArgSeperator.PUSH_MODE = modes.INSIDE_ARGS;
TokenArgument.POP_MODE = true;
WhiteSpace.GROUP = Lexer.SKIPPED;

export function createLexerDefinition(nameTokens = []) {
	debug('creating lexer definition with %d nameTokens', nameTokens.length);
	if (!_.isArray(nameTokens)) throw new Error('nameTokens is not an array');
	const calculatedNameTokens = nameTokens.length > 0 ? nameTokens : [TokenName];

	return {
		defaultMode: modes.OUTSIDE,
		modes: {
			[modes.OUTSIDE]: [
				WhiteSpace,
				TokenOpen,
				Comment
			],
			[modes.INSIDE]: [
				TokenClose,
				TokenArgSeperator,
				...calculatedNameTokens
			],
			[modes.INSIDE_ARGS]: [
				TokenArgument
			]
		}
	};
}

export default class BaseLexer extends Lexer {
	constructor(nameTokens = []) {
		const definition = createLexerDefinition(nameTokens);
		super(definition);

		this.allTokens = _.flatMap(definition.modes);
	}
}
