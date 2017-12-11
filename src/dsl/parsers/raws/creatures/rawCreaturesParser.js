import {createRawFileParser} from './../generic';
import {definition as materialTemplateDefinition} from './../materials/materialTemplate';
import {definition as creatureVariationDefinition} from './creatureVariation';
import {definition as tissueTemplateDefinition} from './tissueTemplate';

const appearanceModifiers = [
	['APP_MOD_DESC_RANGE', Number.NaN],
	['APP_MOD_GENETIC_MODEL', 3], // this is not in delivered raws
	['APP_MOD_IMPORTANCE', 1],
	['APP_MOD_NOUN', 2],
	['APP_MOD_RATE', 7]
];

const castDefinition = [
	['ADOPTS_OWNER'],
	['ALCOHOL_DEPENDENT'],
	['ALL_ACTIVE'],
	['AMBUSHPREDATOR'],
	['AMPHIBIOUS'],
	...appearanceModifiers,
	['AQUATIC'],
	['ARENA_RESTRICTED'],
	['AT_PEACE_WITH_WILDLIFE'],
	['ATTACK', Number.NaN, [
		['ATTACK_SKILL', 1],
		['ATTACK_VERB', 2],
		['ATTACK_CONTACT_PERC', 1],
		['ATTACK_PENETRATION_PERC', 1],
		['ATTACK_PRIORITY', 1],
		['ATTACK_VELOCITY_MODIFIER', 1],
		['ATTACK_FLAG_CANLATCH'],
		['ATTACK_FLAG_WITH'],
		['ATTACK_FLAG_EDGE'],
		['ATTACK_PREPARE_AND_RECOVER', 2],
		['ATTACK_FLAG_BAD_MULTIATTACK'],
		['ATTACK_FLAG_INDEPENDENT_MULTIATTACK'],
		['SPECIALATTACK_INJECT_EXTRACT', 5],
		['SPECIALATTACK_INTERATION', 1],
		['SPECIALATTACK_SUCK_BLOOD', 2]
	]],
	['ATTACK_TRIGGER', 3],
	['BABY', 1],
	['BABYNAME', 2],
	['BEACH_FREQUENCY', 1],
	['BENIGN'],
	['BLOOD', 3],
	['BLOODSUCKER'],
	['BODY', Number.NaN],
	['BODY_APPEARANCE_MODIFIER', 8],
	['BODY_DETAIL_PLAN', Number.NaN, [
		['USE_TISSUE_TEMPLATE', 2],
		['REMOVE_MATERIAL', 1],
		['REMOVE_TISSUE', 1],
		['SELECT_TISSUE', 1],
		...tissueTemplateDefinition
	]],
	['BODY_SIZE', 3],
	['BODYGLOSS', Number.NaN],
	['BONECARN'],
	['BUILDINGDESTROYER', 1],
	['CAN_DO_INTERACTION', 1, [
		['CDI', Number.NaN]
	]],
	['CAN_LEARN'],
	['CAN_SPEAK'],
	['CANNOT_CLIMB'],
	['CANNOT_JUMP'],
	['CANNOT_UNDEAD'],
	['CANOPENDOORS'],
	['CARNIVORE'],
	['CASTE_ALTTILE', 1],
	['CASTE_COLOR', 3],
	['CASTE_GLOWCOLOR', 3],
	['CASTE_GLOWTILE', 1],
	['CASTE_NAME', 3],
	['CASTE_PROFESSION_NAME', 3],
	['CASTE_SOLDIER_ALTTILE', 1],
	['CASTE_SOLDIER_TILE', 1],
	['CASTE_SPEECH', 1],
	['CASTE_TILE', 1],
	['CAVE_ADAPT'],
	['CHANGE_BODY_SIZE_PERC', 1],
	['CHANGE_FREQUENCE_PERC', 1],
	['CHILD', 1],
	['CHILDNAME', 2],
	['COLONY_EXTERNAL'],
	['COMMON_DOMESTIC'],
	['CONVERTED_SPOUSE'],
	['COOKABLE_LIVE'],
	['CRAZED'],
	['CREATURE_CLASS', 1],
	['CREPUSCULAR'],
	['CURIOUSBEAST_EATER'],
	['CURIOUSBEAST_GUZZLER'],
	['CURIOUSBEAST_ITEM'],
	['DEMON'],
	['DESCRIPTION', 1],
	['DIE_WHEN_VERMIN_BITE'],
	['DIFFICULTY', 1],
	['DIURNAL'],
	['DIVE_HUNTS_VERMIN'],
	['EQUIPS'],
	['EXTRA_BUTCHER_OBJECT', 2, [
		['EBO_ITEM', 3],
		['EBO_SHAPE', 1]
	]],
	['EXTRACT', 2],
	['EXTRAVISION'],
	['FEATURE_ATTACK_GROUP'],
	['FEATURE_BEAST'],
	['FEMALE'],
	['FIREIMMUNE'],
	['FIREIMMUNE_SUPER'],
	['FISHITEM'],
	['FIXED_TEMP', 1],
	['FLEEQUICK'],
	['FLIER'],
	['GAIT', Number.NaN],
	['GENERAL_MATERIAL_FORCE_MULTIPLIER', 2],
	['GETS_INFECTIONS_FROM_ROT'],
	['GETS_WOUND_INFECTIONS'],
	['GNAWER', 1],
	['GOBBLE_VERMIN_CLASS', 1],
	['GOBBLE_VERMIN_CREATURE', 2],
	['GO_TO_END'],
	['GO_TO_START'],
	['GO_TO_TAG', Number.NaN],
	['GRASSTRAMPLE', 1],
	['GRAVITATE_BODY_SIZE', 1],
	['GRAZER', 1],
	['HABIT', 2],
	['HABIT_NUM', 1],
	['HAS_NERVES'],
	['HASSHELL'],
	['HOMEOTHERM', 1],
	['HUNTS_VERMIN'],
	['IMMOBILE'],
	['IMMOBILE_LAND'],
	['IMMOLATE'],
	['INTELLIGENT'],
	['ITEMCORPSE', 4],
	['ITEMCORPSE_QUALITY', 1],
	['LAIR', 2],
	['LAIR_CHARACTERISTIC', 2],
	['LAIR_HUNTER'],
	['LAIR_HUNTER_SPEECH', 1],
	['LARGE_PREDATOR'],
	['LAYS_EGGS', 0, [
		['EGG_MATERIAL', 3],
		['EGG_SIZE', 1],
		['CLUTCH_SIZE', 2]
	]],
	['LAYS_UNUSUAL_EGGS', 2],
	['LIGAMENTS', 3],
	['LIGHT_GEN'],
	['LIKES_FIGHTING'],
	['LISP'],
	['LITTERSIZE', 2],
	['LOCKPICKER'],
	['LOW_LIGHT_VISION', 1],
	['MAGICAL'],
	['MAGMA_VISION'],
	['MALE'],
	['MANNERISM_ARMS', 1],
	['MANNERISM_BREATH'],
	['MANNERISM_CHEEK', 1],
	['MANNERISM_EAR', 1],
	['MANNERISM_EYELIDS'],
	['MANNERISM_EYES', 1],
	['MANNERISM_FEET', 1],
	['MANNERISM_FINGERS', 2],
	['MANNERISM_HAIR', 1],
	['MANNERISM_HANDS', 1],
	['MANNERISM_HEAD', 1],
	['MANNERISM_KNUCKLES', 1],
	['MANNERISM_LAUGH'],
	['MANNERISM_LEG', 1],
	['MANNERISM_LIPS', 1],
	['MANNERISM_MOUTH', 1],
	['MANNERISM_NAILS', 1],
	['MANNERISM_NOSE', 1],
	['MANNERISM_POSTURE'],
	['MANNERISM_SIT'],
	['MANNERISM_SMILE'],
	['MANNERISM_STRETCH'],
	['MANNERISM_TONGUE', 1],
	['MANNERISM_WALK'],
	['MATERIAL_FORCE_MULTIPLIER', 5],
	['MATUTINAL'],
	['MAXAGE', 2],
	['MEANDERER'],
	['MEGABEAST'],
	['MENT_ATT_CAP_PERC', 2],
	['MENT_ATT_RANGE', 8],
	['MENT_ATT_RATES', 5],
	['MILKABLE', 3],
	['MISCHIEVIOUS'],
	['MISCHIEVOUS'],
	['MODVALUE'],
	['MOUNT'],
	['MOUNT_EXOTIC'],
	['MULTIPART_FULL_VISION'],
	['MULTIPLE_LITTER_RARE'],
	['NATURAL'],
	['NATURAL_ANIMAL'],
	['NATURAL_SKILL', 2],
	['NIGHT_CREATURE_BOGEYMAN'],
	['NIGHT_CREATURE_HUNTER'],
	['NO_AUTUMN'],
	['NO_CONNECTIONS_FOR_MOVEMENT'],
	['NO_DIZZINESS'],
	['NO_DRINK'],
	['NO_EAT'],
	['NO_FEVERS'],
	['NO_GENDER'],
	['NO_PHYS_ATT_GAIN'],
	['NO_PHYS_ATT_RUST'],
	['NO_SLEEP'],
	['NO_SPRING'],
	['NO_SUMMER'],
	['NO_THOUGHT_CENTER_FOR_MOVEMENT'],
	['NO_UNIT_TYPE_COLOR'],
	['NO_VEGETATION_PERTURB'],
	['NO_WINTER'],
	['NOBONES'],
	['NOBREATHE'],
	['NOCTURNAL'],
	['NOEMOTION'],
	['NOEXERT'],
	['NOFEAR'],
	['NOMEAT'],
	['NONAUSEA'],
	['NOPAIN'],
	['NOSKIN'],
	['NOSKULL'],
	['NOSMELLYROT'],
	['NOSTUCKINS'],
	['NOSTUN'],
	['NOT_BUTCHERABLE'],
	['NOT_LIVING'],
	['NOTHOUGHT'],
	['ODOR_LEVEL', 1],
	['ODOR_STRING', 1],
	['OPPOSED_TO_LIFE'],
	['ORIENTATION', 4],
	['PACK_ANIMAL'],
	['PARALYZEIMMUNE'],
	['PATTERNFLIER'],
	['PEARL'],
	['PENETRATEPOWER', 1],
	['PERSONALITY', 4],
	['PET'],
	['PET_EXOTIC'],
	['PETVALUE', 1],
	['PETVALUE_DIVISOR', 1],
	['PHYS_ATT_CAP_PERC', 2],
	['PHYS_ATT_RANGE', 8],
	['PHYS_ATT_RATES', 5],
	['POP_RATIO', 1],
	['POWER'],
	['PRONE_TO_RAGE', 1],
	['PUS', 3],
	['RELSIZE', 3],
	['REMAINS', 2],
	['REMAINS_COLOR', 1],
	['REMAINS_ON_VERMIN_BITE_DEATH'],
	['REMAINS_UNDETERMINED'],
	['RETRACT_INTO_BP', Number.NaN],
	['RETURNS_VERMIN_KILLS_TO_OWNER'],
	['ROOT_AROUND', 4],
	['SECRETION', Number.NaN],
	['SELECT_TISSUE_LAYER', Number.NaN, [
		['TL_RELATIVE_THICKNESS', 1],
		['TL_MAJOR_ARTERIES'], // TODO: refactor duplicate
		['TL_HEALING_RATE', 1],
		['PLUS_TISSUE_LAYER', 3, [
			['SET_LAYER_TISSUE', 1],
			['TL_CONNECTS'],
			['TL_HEALING_RATE'],
			['TL_MAJOR_ARTERIES'],
			['TL_PAIN_RECEPTORS'],
			['TL_RELATIVE_THICKNESS'],
			['TL_VASCULAR']
		]]
	]],
	['SEMIMEGABEAST'],
	['SENSE_CREATURE_CLASS', 3],
	['SET_BP_GROUP', 2, [
		['BP_ADD_TYPE', 1],
		['BP_APPEARANCE_MODIFIER', 8, [
			...appearanceModifiers
		]],
		['PLUS_BP_GROUP', 2]
	]],
	['SET_TL_GROUP', 3, [
		['SHEARABLE_TISSUE_LAYER', 2],
		['TL_COLOR_MODIFIER', Number.NaN, [
			['TLCM_GENETIC_MODEL'],
			['TLCM_IMPORTANCE', 1],
			['TLCM_NOUN', 2],
			['TLCM_TIMING', 5]
		]],
		['TISSUE_STYLE_UNIT', 2, [
			['TSU_NOUN', 2]
		]],
		['PLUS_TL_GROUP', 3],
		['TISSUE_LAYER_APPEARANCE_MODIFIER', 8, [
			...appearanceModifiers
		]]
	]],
	['SKILL_LEARN_RATE', 2],
	['SKILL_LEARN_RATES', 1],
	['SKILL_RATE', 5],
	['SKILL_RATES', 4],
	['SKILL_RUST_RATE', 4],
	['SKILL_RUST_RATES', 3],
	['SLOW_LEARNER'],
	['SMALL_REMAINS'],
	['SOUND', 7],
	['SPECIFIC_FOOD', 2],
	['SPOUSE_CONVERSION_TARGET'],
	['SPOUSE_CONVERTER'],
	['STANCE_CLIMBER'],
	['STANDARD_GRAZER'],
	['STRANGE_MOODS'],
	['SUPERNATURAL'],
	['SWIMS_INNATE'],
	['SWIMS_LEARNED'],
	['SYNDROME_DILUTION_FACTOR', 2],
	['TENDONS', 3],
	['THICKWEB'],
	['TISSUE_LAYER', Number.NaN, [
		['TL_RELATIVE_THICKNESS', 1] // TODO: refactor duplicate
	]],
	['TISSUE_LAYER_UNDER', 3],
	['TISSUE_LAYER_OVER', 4],
	['TITAN'],
	['TRADE_CAPACITY', 1],
	['TRAINABLE'],
	['TRAINABLE_HUNTING'],
	['TRAINABLE_WAR'],
	['TRANCES'],
	['TRAPAVOID'],
	['UNDERSWIM'],
	['UNIQUE_DEMON'],
	['UTTERANCES'],
	['VEGETATION'],
	['VERMIN_BITE', 5],
	['VERMIN_HATEABLE'],
	['VERMIN_MICRO'],
	['VERMIN_NOFISH'],
	['VERMIN_NOTRAP'],
	['VERMINHUNTER'],
	['VESPERTINE'],
	['VIEWRANGE', 1],
	['VISION_ARC', 2],
	['WAGON_PULLER'],
	['WEBBER', 2],
	['WEBIMMUNE']
];

export default createRawFileParser({
	rawObject: 'CREATURE',
	children: [
		['ALTTILE', 1],
		['APPLY_CREATURE_VARIATION', Number.NaN], // special ?
		['APPLY_CURRENT_CREATURE_VARIATION'], // special ?
		['ARTIFICIAL_HIVEABLE'],
		['BIOME', 1],
		['CASTE', 1],
		['CLUSTER_NUMBER', 2],
		['COLOR', 3],
		['COPY_TAGS_FROM', 1],
		['CREATURE_SOLDIER_TILE', 1],
		['CREATURE_TILE', 1],
		['CV_ADD_TAG', Number.NaN],
		['CV_REMOVE_TAG', Number.NaN],
		['DOES_NOT_EXIST'],
		['EQUIPMENT_WAGON'],
		['EVIL'],
		['FANCIFUL'],
		['FREQUENCY', 1],
		['GENERAL_BABY_NAME', 2],
		['GENERAL_CHILD_NAME', 2],
		['GENERATED'],
		['GLOWCOLOR', 3],
		['GLOWTILE', 1],
		['GOOD'],
		['HFID'],
		['HIVE_PRODUCT', 6],
		['ITEMCORPSE', 4],
		['LARGE_ROAMING'],
		['LOCAL_POPS_CONTROLLABLE'],
		['LOCAL_POPS_PRODUCE_HEROES'],
		['LOOSE_CLUSTERS'],
		['MATERIAL', 1],
		['MUNDANE'],
		['NAME', 3],
		['OUTSIDER_CONTROLLABLE'],
		['POPULATION_NUMBER', 2],
		['PREFSTRING', 1],
		['PROFESSION_NAME', 3],
		['SAVAGE'],
		['SELECT_CASTE', 1, [
			['SELECT_ADDITIONAL_CASTE', 1]
		]],
		['SELECT_MATERIAL', 1, [
			['PLUS_MATERIAL', 1],
			...materialTemplateDefinition
		]],
		['SMELL_TRIGGER', 1],
		['SOLDIER_ALTTILE', 1],
		['SPEECH', 1],
		['SPEECH_FEMALE', 1],
		['SPEECH_MALE', 1],
		['SPHERE', 1],
		['TISSUE', 1, [
			...tissueTemplateDefinition
		]],
		['TRIGGERABLE_GROUP', 2],
		['UBIQUITOUS'],
		['UNDERGROUND_DEPTH', Number.NaN],
		['USE_CASTE', 2],
		['USE_MATERIAL', 2],
		['USE_MATERIAL_TEMPLATE', 2, materialTemplateDefinition],
		['USE_TISSUE', 2],
		['USE_TISSUE_TEMPLATE', 2, [
			...tissueTemplateDefinition
		]],
		['VERMIN_EATER'],
		['VERMIN_FISH'],
		['VERMIN_GROUNDER'],
		['VERMIN_NOROAM'],
		['VERMIN_ROTTER'],
		['VERMIN_SOIL'],
		['VERMIN_SOIL_COLONY'],
		...creatureVariationDefinition,
		...castDefinition
	]
});
