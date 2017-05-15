import {Token, Lexer} from 'chevrotain';

export class LineEnding extends Token {
	static PATTERN = /\r\n?|\n/;
}

export class LineText extends Token {
	static PATTERN = /.*/;
}
