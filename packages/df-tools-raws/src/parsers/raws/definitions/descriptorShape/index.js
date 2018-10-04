import {
	ADJ,
	GEMS_USE_ADJ,
	GEMS_USE_ADJ_NOUN,
	GEMS_USE_NOUN,
	NAME,
	SHAPE,
	TILE,
	WORD
} from '../generatedDefinitions';
import {withChildren} from '../definitionUtils';

export default withChildren(SHAPE, [
	ADJ,
	GEMS_USE_ADJ,
	GEMS_USE_ADJ_NOUN,
	GEMS_USE_NOUN,
	NAME,
	TILE,
	WORD
]);
