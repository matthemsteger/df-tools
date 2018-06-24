import {
	Parser,
	tokenMatcher,
	exceptions as chevrotainExceptions
} from 'chevrotain';
import _ from 'lodash';
import _debug from 'debug';
import {
	Comment,
	TokenOpen,
	TokenArgSeperator,
	TokenArgument,
	TokenClose
} from './../tokens/languageTokens';
import * as worldGenTokens from './../tokens/worldGenTokens';
// import worldGenSpecs from './worldGenSpecs.json';
import {
	WorldGenConfiguration,
	BeastEndYear,
	MinMaxVariance,
	MeshFrequency,
	TitanAttackTrigger,
	SquareCounts,
	MinimumSquareCounts,
	RiverMins,
	MinimumLowMedHighSquares
} from './../../model/worldGen';

const debug = _debug('df:dsl:parsers:worldGenParser');

export default class WorldGenParser extends Parser {
	constructor(tokens, tokenConstructors = []) {
		const filteredTokens = _.reject(tokens, (token) =>
			tokenMatcher(token, Comment)
		);
		super(filteredTokens, tokenConstructors);

		this.RULE('parseWorldGenFile', () => {
			const worldGenConfigurations = [];
			this.MANY(() => {
				const worldGenConfiguration = this.SUBRULE(
					this.worldGenConfiguration
				);
				worldGenConfigurations.push(worldGenConfiguration);
			});

			return worldGenConfigurations;
		});

		this.worldGenConfiguration = this.RULE('worldGenConfiguration', () => {
			this.CONSUME(TokenOpen);
			this.CONSUME(worldGenTokens.WorldGen);
			this.CONSUME(TokenClose);

			// could also use the inheritance here and just consume many
			// tokens with different names and args
			// then parse them all

			// const foundTokenNames = [];
			const dfTokens = [];
			this.MANY({
				GATE() {
					const nextNameToken = this.LA(2);
					return tokenMatcher(
						nextNameToken,
						worldGenTokens.WorldGenSettingToken
					);
				},
				DEF: () => {
					const worldGenSetting = this.SUBRULE(this.worldGenSetting);
					dfTokens.push(worldGenSetting);
				}
			});

			const tokensByName = _.groupBy(dfTokens, 'name');
			const rawWorldGenConfiguration = _.transform(
				tokensByName,
				(rawConf, dfTokensAtName, name) => {
					const propName = _.lowerFirst(_.camelCase(name));
					const dfToken = _.head(dfTokensAtName);
					const {args: tagArgs} = dfToken;
					switch (name) {
						case 'TITLE':
							_.assign(rawConf, {[propName]: tagArgs[0]});
							break;
						case 'DIM':
							_.assign(rawConf, {
								[propName]: {
									x: _.parseInt(tagArgs[0]),
									y: _.parseInt(tagArgs[1])
								}
							});
							break;
						// integers
						case 'EMBARK_POINTS':
						case 'END_YEAR':
						case 'MINERAL_SCARCITY':
						case 'MEGABEAST_CAP':
						case 'SEMIMEGABEAST_CAP':
						case 'TITAN_NUMBER':
						case 'DEMON_NUMBER':
						case 'NIGHT_TROLL_NUMBER':
						case 'BOGEYMAN_NUMBER':
						case 'VAMPIRE_NUMBER':
						case 'WEREBEAST_NUMBER':
						case 'SECRET_NUMBER':
						case 'REGIONAL_INTERACTION_NUMBER':
						case 'DISTURBANCE_INTERACTION_NUMBER':
						case 'EVIL_CLOUD_NUMBER':
						case 'EVIL_RAIN_NUMBER':
						case 'PEAK_NUMBER_MIN':
						case 'PARTIAL_OCEAN_EDGE_MIN':
						case 'COMPLETE_OCEAN_EDGE_MIN':
						case 'VOLCANO_MIN':
						case 'EROSION_CYCLE_COUNT':
						case 'SUBREGION_MAX':
						case 'CAVERN_LAYER_COUNT':
						case 'CAVERN_LAYER_OPENNESS_MIN':
						case 'CAVERN_LAYER_OPENNESS_MAX':
						case 'CAVERN_LAYER_PASSAGE_DENSITY_MIN':
						case 'CAVERN_LAYER_PASSAGE_DENSITY_MAX':
						case 'CAVERN_LAYER_WATER_MIN':
						case 'CAVERN_LAYER_WATER_MAX':
						case 'LEVELS_ABOVE_GROUND':
						case 'LEVELS_ABOVE_LAYER_1':
						case 'LEVELS_ABOVE_LAYER_2':
						case 'LEVELS_ABOVE_LAYER_3':
						case 'LEVELS_ABOVE_LAYER_4':
						case 'LEVELS_ABOVE_LAYER_5':
						case 'LEVELS_AT_BOTTOM':
						case 'CAVE_MIN_SIZE':
						case 'CAVE_MAX_SIZE':
						case 'MOUNTAIN_CAVE_MIN':
						case 'NON_MOUNTAIN_CAVE_MIN':
						case 'SHOW_EMBARK_TUNNEL':
						case 'TOTAL_CIV_NUMBER':
						case 'TOTAL_CIV_POPULATION':
						case 'SITE_CAP':
							_.assign(rawConf, {
								[propName]: _.parseInt(tagArgs[0])
							});
							break;
						case 'BEAST_END_YEAR':
							_.assign(rawConf, {
								[propName]: new BeastEndYear({
									startYear: _.parseInt(tagArgs[0]),
									percentage: _.parseInt(tagArgs[1])
								})
							});
							break;
						// booleans
						case 'REVEAL_ALL_HISTORY':
						case 'CULL_HISTORICAL_FIGURES':
						case 'GENERATE_DIVINE_MATERIALS':
						case 'PERIODICALLY_ERODE_EXTREMES':
						case 'OROGRAPHIC_PRECIPITATION':
						case 'HAVE_BOTTOM_LAYER_1':
						case 'HAVE_BOTTOM_LAYER_2':
						case 'ALL_CAVES_VISIBLE':
						case 'PLAYABLE_CIVILIZATION_REQUIRED':
							_.assign(rawConf, {[propName]: tagArgs[0] === '1'});
							break;
						case 'ELEVATION':
						case 'RAINFALL':
						case 'TEMPERATURE':
						case 'DRAINAGE':
						case 'VOLCANISM':
						case 'SAVAGERY':
							_.assign(rawConf, {
								[propName]: new MinMaxVariance({
									min: _.parseInt(tagArgs[0]),
									max: _.parseInt(tagArgs[1]),
									varianceX: _.parseInt(tagArgs[2]),
									varianceY: _.parseInt(tagArgs[3])
								})
							});
							break;
						case 'ELEVATION_FREQUENCY':
						case 'RAIN_FREQUENCY':
						case 'DRAINAGE_FREQUENCY':
						case 'TEMPERATURE_FREQUENCY':
						case 'SAVAGERY_FREQUENCY':
						case 'VOLCANISM_FREQUENCY':
							_.assign(rawConf, {
								[propName]: new MeshFrequency({
									mesh: _.parseInt(tagArgs[0]),
									weights: _.map(_.tail(tagArgs), _.parseInt)
								})
							});
							break;
						case 'POLE':
							_.assign(rawConf, {[propName]: tagArgs[0]});
							break;
						case 'TITAN_ATTACK_TRIGGER':
							_.assign(rawConf, {
								[propName]: new TitanAttackTrigger({
									population: _.parseInt(tagArgs[0]),
									exportedWealth: _.parseInt(tagArgs[1]),
									createdWealth: _.parseInt(tagArgs[2])
								})
							});
							break;
						case 'GOOD_SQ_COUNTS':
						case 'EVIL_SQ_COUNTS':
							_.assign(rawConf, {
								[propName]: new SquareCounts({
									smallRegion: _.parseInt(tagArgs[0]),
									mediumRegion: _.parseInt(tagArgs[1]),
									largeRegion: _.parseInt(tagArgs[2])
								})
							});
							break;
						case 'REGION_COUNTS':
							_.assign(rawConf, {
								[propName]: _.reduce(
									dfTokensAtName,
									(regionCounts, regionCountToken) => {
										const {
											args: regionCountsTokenArgs
										} = regionCountToken;
										return _.assign({}, regionCounts, {
											[regionCountsTokenArgs[0]]: new MinimumSquareCounts(
												{
													initial: _.parseInt(
														regionCountsTokenArgs[1]
													),
													initialRegion: _.parseInt(
														regionCountsTokenArgs[2]
													),
													final: _.parseInt(
														regionCountsTokenArgs[3]
													)
												}
											)
										});
									},
									{}
								)
							});
							break;
						case 'RIVER_MINS':
							_.assign(rawConf, {
								[propName]: new RiverMins({
									preErosion: _.parseInt(tagArgs[0]),
									postErosion: _.parseInt(tagArgs[1])
								})
							});
							break;
						case 'ELEVATION_RANGES':
						case 'RAIN_RANGES':
						case 'DRAINAGE_RANGES':
						case 'SAVAGERY_RANGES':
						case 'VOLCANISM_RANGES':
							_.assign(rawConf, {
								[propName]: new MinimumLowMedHighSquares({
									low: _.parseInt(tagArgs[0]),
									medium: _.parseInt(tagArgs[1]),
									high: _.parseInt(tagArgs[2])
								})
							});
							break;
						default:
							throw new Error(`Unknown tag ${name}`);
					}
				}
			);

			try {
				return new WorldGenConfiguration(rawWorldGenConfiguration);
			} catch (err) {
				throw this.SAVE_ERROR(
					new chevrotainExceptions.MismatchedTokenException(err)
				);
			}
		});

		this.worldGenSetting = this.RULE('worldGenSetting', () => {
			this.CONSUME(TokenOpen);
			const nameToken = this.CONSUME(worldGenTokens.WorldGenSettingToken);
			const argTokens = [];
			this.MANY(() => {
				this.CONSUME(TokenArgSeperator);
				const argToken = this.CONSUME(TokenArgument);
				argTokens.push(argToken);
			});

			this.CONSUME(TokenClose);

			return {
				nameToken,
				name: nameToken.image,
				argTokens,
				args: _.map(argTokens, 'image')
			};
		});

		debug('performing self analysis');
		Parser.performSelfAnalysis(this);
		debug('finished self analysis');
	}
}
