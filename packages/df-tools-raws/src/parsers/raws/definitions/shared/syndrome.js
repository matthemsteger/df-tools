import {
	SYNDROME,
	SYN_AFFECTED_CLASS,
	SYN_AFFECTED_CREATURE,
	SYN_CONCENTRATION_ADDED,
	SYN_IMMUNE_CREATURE,
	SYN_CONTACT,
	SYN_IDENTIFIER,
	SYN_INGESTED,
	SYN_INHALED,
	SYN_INJECTED,
	SYN_NAME,
	SYN_NO_HOSPITAL,
	CE_BLEEDING,
	CE_BLISTERS,
	CE_BRUISING,
	CE_CHANGE_PERSONALITY,
	CE_COUGH_BLOOD,
	CE_DIZZINESS,
	CE_DROWSINESS,
	CE_ERRATIC_BEHAVIOR,
	CE_FEEL_EMOTION,
	CE_FEVER,
	CE_IMPAIR_FUNCTION,
	CE_NAUSEA,
	CE_NECROSIS,
	CE_NUMBNESS,
	CE_OOZING,
	CE_PAIN,
	CE_PARALYSIS,
	CE_SWELLING,
	CE_UNCONSCIOUSNESS
} from '../generatedDefinitions';
import {
	SYN_IMMUNE_CLASS,
	SYN_CLASS,
	CE_ADD_TAG,
	CE_BODY_APPEARANCE_MODIFIER,
	CE_BODY_MAT_INTERACTION,
	CE_BODY_TRANSFORMATION,
	CE_BP_APPEARANCE_MODIFIER,
	CE_CAN_DO_INTERACTION,
	CE_DISPLAY_NAME,
	CE_DISPLAY_TILE,
	CE_FLASH_TILE,
	CE_MATERIAL_FORCE_MULTIPLIER,
	CE_MENT_ATT_CHANGE,
	CE_PHYS_ATT_CHANGE,
	CE_REMOVE_TAG,
	CE_SENSE_CREATURE_CLASS,
	CE_SKILL_ROLL_ADJUST,
	CE_SPEED_CHANGE,
	CE_VOMIT_BLOOD
} from '../undeliveredDefinitions';
import {withChildren} from '../definitionUtils';

export default withChildren(SYNDROME, [
	SYN_AFFECTED_CLASS,
	SYN_AFFECTED_CREATURE,
	SYN_CONCENTRATION_ADDED,
	SYN_IMMUNE_CLASS,
	SYN_IMMUNE_CREATURE,
	SYN_CLASS,
	SYN_CONTACT,
	SYN_IDENTIFIER,
	SYN_INGESTED,
	SYN_INHALED,
	SYN_INJECTED,
	SYN_NAME,
	SYN_NO_HOSPITAL,
	CE_ADD_TAG,
	CE_BLEEDING,
	CE_BLISTERS,
	CE_BODY_APPEARANCE_MODIFIER,
	CE_BODY_MAT_INTERACTION,
	CE_BODY_TRANSFORMATION,
	CE_BP_APPEARANCE_MODIFIER,
	CE_BRUISING,
	CE_CAN_DO_INTERACTION,
	CE_CHANGE_PERSONALITY,
	CE_COUGH_BLOOD,
	CE_DISPLAY_NAME,
	CE_DISPLAY_TILE,
	CE_DIZZINESS,
	CE_DROWSINESS,
	CE_ERRATIC_BEHAVIOR,
	CE_FEEL_EMOTION,
	CE_FEVER,
	CE_FLASH_TILE,
	CE_IMPAIR_FUNCTION,
	CE_MATERIAL_FORCE_MULTIPLIER,
	CE_MENT_ATT_CHANGE,
	CE_NAUSEA,
	CE_NECROSIS,
	CE_NUMBNESS,
	CE_OOZING,
	CE_PAIN,
	CE_PARALYSIS,
	CE_PHYS_ATT_CHANGE,
	CE_REMOVE_TAG,
	CE_SENSE_CREATURE_CLASS,
	CE_SKILL_ROLL_ADJUST,
	CE_SPEED_CHANGE,
	CE_SWELLING,
	CE_UNCONSCIOUSNESS,
	CE_VOMIT_BLOOD
]);
