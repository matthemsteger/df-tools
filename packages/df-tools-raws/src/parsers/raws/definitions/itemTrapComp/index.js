import {
	ADJECTIVE,
	HITS,
	IS_SCREW,
	IS_SPIKE,
	ITEM_TRAPCOMP,
	MATERIAL_SIZE,
	METAL,
	NAME,
	SIZE,
	WOOD
} from '../generatedDefinitions';
import {withChildren, isRequired} from '../definitionUtils';
import attack from '../shared/attack';

export default withChildren(ITEM_TRAPCOMP, [
	NAME,
	ADJECTIVE,
	SIZE,
	HITS,
	isRequired(MATERIAL_SIZE),
	IS_SCREW,
	IS_SPIKE,
	WOOD,
	METAL,
	attack
]);
