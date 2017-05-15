import {Token} from 'chevrotain';

export class Comment extends Token {
	static PATTERN = /[^\]\s]+(?![^[]*])/;
}

export class TokenOpen extends Token {
	static PATTERN = /\[/;
}

export class TokenClose extends Token {
	static PATTERN = /]/;
}

export class TokenArgSeperator extends Token {
	static PATTERN = /:/;
}

export class TokenArgument extends Token {
	static PATTERN = /[^:\]]+/;
}

export class WhiteSpace extends Token {
	static PATTERN = /\s+/;
}

export class TokenName extends Token {
	static PATTERN = /[^:\s[\]]+[^\]:]/;
}
