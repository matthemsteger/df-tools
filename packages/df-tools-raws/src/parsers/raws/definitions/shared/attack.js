import {
	ATTACK,
	ATTACK_SKILL,
	ATTACK_VERB,
	ATTACK_CONTACT_PERC,
	ATTACK_PENETRATION_PERC,
	ATTACK_PRIORITY,
	ATTACK_VELOCITY_MODIFIER,
	ATTACK_FLAG_CANLATCH,
	ATTACK_FLAG_WITH,
	ATTACK_FLAG_EDGE,
	ATTACK_PREPARE_AND_RECOVER,
	ATTACK_FLAG_BAD_MULTIATTACK,
	ATTACK_FLAG_INDEPENDENT_MULTIATTACK,
	SPECIALATTACK_INJECT_EXTRACT,
	SPECIALATTACK_SUCK_BLOOD
} from '../generatedDefinitions';
import {withChildren} from '../definitionUtils';

export default withChildren(ATTACK, [
	ATTACK_SKILL,
	ATTACK_VERB,
	ATTACK_CONTACT_PERC,
	ATTACK_PENETRATION_PERC,
	ATTACK_PRIORITY,
	ATTACK_VELOCITY_MODIFIER,
	ATTACK_FLAG_CANLATCH,
	ATTACK_FLAG_WITH,
	ATTACK_FLAG_EDGE,
	ATTACK_PREPARE_AND_RECOVER,
	ATTACK_FLAG_BAD_MULTIATTACK,
	ATTACK_FLAG_INDEPENDENT_MULTIATTACK,
	SPECIALATTACK_INJECT_EXTRACT,
	SPECIALATTACK_SUCK_BLOOD
]);
