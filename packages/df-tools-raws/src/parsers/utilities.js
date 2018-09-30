import P from 'parsimmon';
import {flip, contains, reject} from 'ramda';

export const colon = P.string(':');
export const tokenArgument = P.alt(P.regexp(/[^:\]]+/), P.optWhitespace);
export const lbracket = P.string('[');
export const rbracket = P.string(']');
export const isLanguageToken = flip(contains)(['[', ']', ':']);
export const rejectLanguageTokens = reject(isLanguageToken);
export const untilLeftBracket = P.takeWhile((c) => c !== '[');
export const noise = P.alt(untilLeftBracket, P.optWhitespace);

export const comment = P.regexp(
	/(?:[^\][\r\n]+(?!.*(?:]|\[))|[^\]\s]+(?![^[]*]))/
);

export const commentOrWhitespace = comment.many().trim(P.optWhitespace);
