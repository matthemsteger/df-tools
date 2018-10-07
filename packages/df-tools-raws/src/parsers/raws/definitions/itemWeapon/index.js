import {
	ADJECTIVE,
	CAN_STONE,
	ITEM_WEAPON,
	MATERIAL_SIZE,
	MINIMUM_SIZE,
	NAME,
	RANGED,
	SHOOT_FORCE,
	SHOOT_MAXVEL,
	SIZE,
	SKILL,
	TRAINING,
	TWO_HANDED
} from '../generatedDefinitions';
import {withChildren, isRequired} from '../definitionUtils';
import attack from '../shared/attack';

export default withChildren(ITEM_WEAPON, [
	isRequired(NAME),
	ADJECTIVE,
	SIZE,
	SHOOT_FORCE,
	SHOOT_MAXVEL,
	SKILL,
	RANGED,
	TWO_HANDED,
	MINIMUM_SIZE,
	CAN_STONE,
	TRAINING,
	isRequired(MATERIAL_SIZE),
	isRequired(attack)
]);
