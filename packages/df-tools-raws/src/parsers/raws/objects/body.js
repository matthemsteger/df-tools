import P from 'parsimmon';
import createParserFromDefinition from '../createParserFromDefinition';
import {body, bodyGloss} from '../definitions/body';

export default P.alt(
	createParserFromDefinition(body),
	createParserFromDefinition(bodyGloss)
);
