import R from 'ramda';
import createSettingsParser from './createSettingsParser';
import {makeDefinition, makeRequiredDefinition} from './../tokenLanguage';
import {
	makeCamelCaseTransducer,
	makeStringValueTransducer,
	makeIntegerValueTransducer,
	makeBooleanValueTransducer
} from './../../../model/modelHelpers';
import {
	dimTransducer,
	beastEndYearTransducer,
	minMaxVariance,
	meshFrequencyTransducer,
	titanAttackTriggerTransducer,
	squareCountTransducer,
	regionCountsTransducer,
	riverMinsTransducer,
	minLowMedHighSquaresTransducer
} from './../../../model/settings/worldGen/transforms';
import {parseBase10Int} from './../../../utility/numbers';

const makeRequiredStringDefinition = makeRequiredDefinition(makeStringValueTransducer);
const makeRequiredIntegerDefinition = makeRequiredDefinition(makeIntegerValueTransducer);
const makeRequiredBooleanDefinition = makeRequiredDefinition(makeBooleanValueTransducer);
const makeMinMaxVarianceDefinition = makeRequiredDefinition(
	makeCamelCaseTransducer(R.compose(
		minMaxVariance,
		R.zipObj(['min', 'max', 'varianceX', 'varianceY']),
		R.map(parseBase10Int)
	)),
	4
);

export const definition = {
	name: 'WORLD_GEN',
	args: 0,
	children: [
		makeRequiredStringDefinition(1, 'TITLE'),
		makeRequiredDefinition(dimTransducer, 2, 'DIM'),
		makeRequiredDefinition(beastEndYearTransducer, 2, 'BEAST_END_YEAR'),
		makeRequiredStringDefinition(1, 'POLE'),
		makeRequiredDefinition(titanAttackTriggerTransducer, 3, 'TITAN_ATTACK_TRIGGER'),
		makeRequiredDefinition(regionCountsTransducer, 4, 'REGION_COUNTS'), // there are a bunch of these
		makeRequiredDefinition(riverMinsTransducer, 2, 'RIVER_MINS'),
		...R.map(makeRequiredIntegerDefinition(1), [
			'EMBARK_POINTS',
			'END_YEAR',
			'MINERAL_SCARCITY',
			'MEGABEAST_CAP',
			'SEMIMEGABEAST_CAP',
			'TITAN_NUMBER',
			'DEMON_NUMBER',
			'NIGHT_TROLL_NUMBER',
			'BOGEYMAN_NUMBER',
			'VAMPIRE_NUMBER',
			'WEREBEAST_NUMBER',
			'SECRET_NUMBER',
			'REGIONAL_INTERACTION_NUMBER',
			'DISTURBANCE_INTERACTION_NUMBER',
			'EVIL_CLOUD_NUMBER',
			'EVIL_RAIN_NUMBER',
			'PEAK_NUMBER_MIN',
			'PARTIAL_OCEAN_EDGE_MIN',
			'COMPLETE_OCEAN_EDGE_MIN',
			'VOLCANO_MIN',
			'EROSION_CYCLE_COUNT',
			'SUBREGION_MAX',
			'CAVERN_LAYER_COUNT',
			'CAVERN_LAYER_OPENNESS_MIN',
			'CAVERN_LAYER_OPENNESS_MAX',
			'CAVERN_LAYER_PASSAGE_DENSITY_MIN',
			'CAVERN_LAYER_PASSAGE_DENSITY_MAX',
			'CAVERN_LAYER_WATER_MIN',
			'CAVERN_LAYER_WATER_MAX',
			'LEVELS_ABOVE_GROUND',
			'LEVELS_ABOVE_LAYER_1',
			'LEVELS_ABOVE_LAYER_2',
			'LEVELS_ABOVE_LAYER_3',
			'LEVELS_ABOVE_LAYER_4',
			'LEVELS_ABOVE_LAYER_5',
			'LEVELS_AT_BOTTOM',
			'CAVE_MIN_SIZE',
			'CAVE_MAX_SIZE',
			'MOUNTAIN_CAVE_MIN',
			'NON_MOUNTAIN_CAVE_MIN',
			'SHOW_EMBARK_TUNNEL',
			'TOTAL_CIV_NUMBER',
			'TOTAL_CIV_POPULATION',
			'SITE_CAP'
		]),
		...R.map(makeRequiredBooleanDefinition(1), [
			'REVEAL_ALL_HISTORY',
			'CULL_HISTORICAL_FIGURES',
			'GENERATE_DIVINE_MATERIALS',
			'PERIODICALLY_ERODE_EXTREMES',
			'OROGRAPHIC_PRECIPITATION',
			'HAVE_BOTTOM_LAYER_1',
			'HAVE_BOTTOM_LAYER_2',
			'ALL_CAVES_VISIBLE',
			'PLAYABLE_CIVILIZATION_REQUIRED'
		]),
		...R.map(makeMinMaxVarianceDefinition, [
			'ELEVATION',
			'RAINFALL',
			'TEMPERATURE',
			'DRAINAGE',
			'VOLCANISM',
			'SAVAGERY'
		]),
		...R.map(makeRequiredDefinition(meshFrequencyTransducer, 6), [
			'ELEVATION_FREQUENCY',
			'RAIN_FREQUENCY',
			'DRAINAGE_FREQUENCY',
			'TEMPERATURE_FREQUENCY',
			'SAVAGERY_FREQUENCY',
			'VOLCANISM_FREQUENCY'
		]),
		...R.map(makeRequiredDefinition(squareCountTransducer, 3), [
			'GOOD_SQ_COUNTS',
			'EVIL_SQ_COUNTS'
		]),
		...R.map(makeRequiredDefinition(minLowMedHighSquaresTransducer, 3), [
			'ELEVATION_RANGES',
			'RAIN_RANGES',
			'DRAINAGE_RANGES',
			'SAVAGERY_RANGES',
			'VOLCANISM_RANGES'
		])
	]
};

const definitionOld = [
	['WORLD_GEN', 0, [
		['TITLE', 1, true],
		['DIM', 2, true],
		['EMBARK_POINTS', 1, true],
		['END_YEAR', 1, true],
		['BEAST_END_YEAR', 2, true],
		['REVEAL_ALL_HISTORY', 1, true],
		['CULL_HISTORICAL_FIGURES', 1, true],
		['ELEVATION', 4, true],
		['RAINFALL', 4, true],
		['TEMPERATURE', 4, true],
		['DRAINAGE', 4, true],
		['VOLCANISM', 4, true],
		['SAVAGERY', 4, true],
		['ELEVATION_FREQUENCY', 6, true],
		['RAIN_FREQUENCY', 6, true],
		['DRAINAGE_FREQUENCY', 6, true],
		['TEMPERATURE_FREQUENCY', 6, true],
		['SAVAGERY_FREQUENCY', 6, true],
		['VOLCANISM_FREQUENCY', 6, true],
		['POLE', 1, true],
		['MINERAL_SCARCITY', 1, true],
		['MEGABEAST_CAP', 1, true],
		['SEMIMEGABEAST_CAP', 1, true],
		['TITAN_NUMBER', 1, true],
		['TITAN_ATTACK_TRIGGER', 3, true],
		['DEMON_NUMBER', 1, true],
		['NIGHT_TROLL_NUMBER', 1, true],
		['BOGEYMAN_NUMBER', 1, true],
		['VAMPIRE_NUMBER', 1, true],
		['WEREBEAST_NUMBER', 1, true],
		['SECRET_NUMBER', 1, true],
		['REGIONAL_INTERACTION_NUMBER', 1, true],
		['DISTURBANCE_INTERACTION_NUMBER', 1, true],
		['EVIL_CLOUD_NUMBER', 1, true],
		['EVIL_RAIN_NUMBER', 1, true],
		['GENERATE_DIVINE_MATERIALS', 1, true],
		['GOOD_SQ_COUNTS', 3, true],
		['EVIL_SQ_COUNTS', 3, true],
		['PEAK_NUMBER_MIN', 1, true],
		['PARTIAL_OCEAN_EDGE_MIN', 1, true],
		['COMPLETE_OCEAN_EDGE_MIN', 1, true],
		['VOLCANO_MIN', 1, true],
		['REGION_COUNTS', 4, true], // there are a bunch of these
		['EROSION_CYCLE_COUNT', 1, true],
		['RIVER_MINS', 2, true],
		['PERIODICALLY_ERODE_EXTREMES', 1, true],
		['OROGRAPHIC_PRECIPITATION', 1, true],
		['SUBREGION_MAX', 1, true],
		['CAVERN_LAYER_COUNT', 1, true],
		['CAVERN_LAYER_OPENNESS_MIN', 1, true],
		['CAVERN_LAYER_OPENNESS_MAX', 1, true],
		['CAVERN_LAYER_PASSAGE_DENSITY_MIN', 1, true],
		['CAVERN_LAYER_PASSAGE_DENSITY_MAX', 1, true],
		['CAVERN_LAYER_WATER_MIN', 1, true],
		['CAVERN_LAYER_WATER_MAX', 1, true],
		['HAVE_BOTTOM_LAYER_1', 1, true],
		['HAVE_BOTTOM_LAYER_2', 1, true],
		['LEVELS_ABOVE_GROUND', 1, true],
		['LEVELS_ABOVE_LAYER_1', 1, true],
		['LEVELS_ABOVE_LAYER_2', 1, true],
		['LEVELS_ABOVE_LAYER_3', 1, true],
		['LEVELS_ABOVE_LAYER_4', 1, true],
		['LEVELS_ABOVE_LAYER_5', 1, true],
		['LEVELS_AT_BOTTOM', 1, true],
		['CAVE_MIN_SIZE', 1, true],
		['CAVE_MAX_SIZE', 1, true],
		['MOUNTAIN_CAVE_MIN', 1, true],
		['NON_MOUNTAIN_CAVE_MIN', 1, true],
		['ALL_CAVES_VISIBLE', 1, true],
		['SHOW_EMBARK_TUNNEL', 1, true],
		['TOTAL_CIV_NUMBER', 1, true],
		['TOTAL_CIV_POPULATION', 1, true],
		['SITE_CAP', 1, true],
		['PLAYABLE_CIVILIZATION_REQUIRED', 1, true],
		['ELEVATION_RANGES', 3, true],
		['RAIN_RANGES', 3, true],
		['DRAINAGE_RANGES', 3, true],
		['SAVAGERY_RANGES', 3, true],
		['VOLCANISM_RANGES', 3, true]
	]]
];

export default createSettingsParser(definition);

