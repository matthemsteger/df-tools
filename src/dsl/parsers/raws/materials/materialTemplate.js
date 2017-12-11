import R from 'ramda';
import {createRawFileParser} from './../generic';
import syndromeDefinition from './syndrome';

const materialUsageDefinition = [
	['ALCOHOL'],
	['ALCOHOL_CREATURE'],
	['ALCOHOL_PLANT'],
	['BONE'],
	['CHEESE'],
	['CHEESE_CREATURE'],
	['CHEESE_PLANT'],
	['CRYSTAL_GLASSABLE'],
	['DISPLAY_UNGLAZED'],
	['DO_NOT_CLEAN_GLOB'],
	['EDIBLE_COOKED'],
	['EDIBLE_RAW'],
	['EDIBLE_VERMIN'],
	['ENTERS_BLOOD'],
	['EVAPORATES'],
	['GENERATES_MIASMA'],
	['HORN'],
	['IF_EXISTS_SET_BOILING_POINT', 1], // creature_next_underground
	['IF_EXISTS_SET_HEATDAM_POINT', 1], // creature_next_underground
	['IF_EXISTS_SET_IGNITE_POINT', 1], // creature_next_underground
	['IF_EXISTS_SET_MELTING_POINT', 1], // creature_next_underground
	['IMPLIES_ANIMAL_KILL'],
	['IS_GLASS'],
	['IS_METAL'],
	['IS_STONE'],
	['ITEMS_AMMO'],
	['ITEMS_ANVIL'],
	['ITEMS_ARMOR'],
	['ITEMS_BARRED'],
	['ITEMS_DELICATE'],
	['ITEMS_DIGGER'],
	['ITEMS_HARD'],
	['ITEMS_LEATHER'],
	['ITEMS_METAL'],
	['ITEMS_QUERN'],
	['ITEMS_SCALED'],
	['ITEMS_SIEGE_ENGINE'],
	['ITEMS_SOFT'],
	['ITEMS_WEAPON'],
	['ITEMS_WEAPON_RANGED'],
	['LEATHER'],
	['LIQUID_MISC'],
	['LIQUID_MISC_CREATURE'],
	['LIQUID_MISC_OTHER'],
	['LIQUID_MISC_PLANT'],
	['MEAT'],
	['NO_STONE_STOCKPILE'],
	['PEARL'],
	['POWDER_MISC'],
	['POWDER_MISC_CREATURE'],
	['POWDER_MISC_PLANT'],
	['ROTS'],
	['SEED_MAT'],
	['SHELL'],
	['SILK'],
	['SOAP'],
	['STOCKPILE_GLOB'],
	['STOCKPILE_GLOB_PASTE'],
	['STOCKPILE_GLOB_PRESSED'],
	['STOCKPILE_GLOB_SOLID'],
	['STOCKPILE_PLANT_GROWTH'],
	['STOCKPILE_THREAD_METAL'],
	['STRUCTURAL_PLANT_MAT'],
	['THREAD_PLANT'],
	['TOOTH'],
	['UNDIGGABLE'],
	['WOOD'],
	['YARN'],
	...R.map((contaminant) =>
		[`${contaminant}_MAP_DISCRIPTOR`]
	)([
		'BLOOD',
		'ICHOR',
		'GOO',
		'SLIME',
		'PUS',
		'SWEAT',
		'TEARS',
		'SPIT'
	])
];

export const definition = [
	['ABSORPTION', 1],
	['BASIC_COLOR', 2],
	['BLOCK_NAME', 2],
	['BOILING_POINT', 1],
	['BUILD_COLOR', 3],
	['BUTCHER_SPECIAL', 2],
	['COLDDAM_POINT', 1],
	['DISPLAY_COLOR', 3],
	['EXTRACT_STORAGE', 1],
	['HARDENS_WITH_WATER', 2],
	['HEATDAM_POINT', 1],
	['IGNITE_POINT', 1],
	['IS_GEM', 3],
	['ITEM_REACTION_PRODUCT', 5],
	['ITEM_SYMBOL', 1],
	['LIQUID_DENSITY', 1],
	['MAT_FIXED_TEMP', 1],
	['MATERIAL_REACTION_PRODUCT', 3],
	['MATERIAL_VALUE', 1],
	['MAX_EDGE', 1],
	['MEAT_NAME', 3],
	['MELTING_POINT', 1],
	['METAL_ORE', 2],
	['MOLAR_MASS', 1],
	['MULTIPLY_VALUE', 1],
	['POWDER_DYE', 1],
	['PREFIX', 1],
	['REACTION_CLASS', 1],
	['SOAP_LEVEL', 1],
	['SOLID_DENSITY', 1],
	['SPEC_HEAT', 1],
	['STATE_ADJ', 2],
	['STATE_COLOR', 2],
	['STATE_NAME', 2],
	['STATE_NAME_ADJ', 2],
	['STONE_NAME', 1],
	['TEMP_DIET_INFO', 1],
	['THREAD_METAL', 2],
	['TILE', 1],
	['TILE_COLOR', 3],
	['WAFERS'],
	...R.compose(
		R.unnest,
		R.map((modifier) =>
			[
				[`${modifier}_YIELD`, 1],
				[`${modifier}_ELASTICITY`, 1],
				[`${modifier}_FRACTURE`, 1],
				[`${modifier}_STRAIN_AT_YIELD`, 1]
			]
		)
	)([
		'IMPACT',
		'COMPRESSIVE',
		'TENSILE',
		'TORSION',
		'SHEAR',
		'BENDING'
	]),
	...materialUsageDefinition,
	syndromeDefinition
];

export default createRawFileParser({
	rawObject: 'MATERIAL_TEMPLATE',
	children: definition
});
