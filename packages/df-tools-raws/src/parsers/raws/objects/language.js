import P from 'parsimmon';
import createParserFromDefinition from '../createParserFromDefinition';
import {translation, symbol, word} from '../definitions/language';

export default P.alt(
	createParserFromDefinition(translation),
	createParserFromDefinition(symbol),
	createParserFromDefinition(word)
);
