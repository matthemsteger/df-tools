import R from 'ramda';
import createSettingsParser from './createSettingsParser';
import {makeRequiredDefinition} from './../tokenLanguage';
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

export default createSettingsParser(definition);

