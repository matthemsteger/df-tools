import {Token, Lexer} from 'chevrotain';

export class WorldGenSettingToken extends Token {
	static PATTERN = Lexer.NA;
}

export class AllCavesVisible extends WorldGenSettingToken {
	static PATTERN = /ALL_CAVES_VISIBLE/;
}

export class BeastEndYear extends WorldGenSettingToken {
	static PATTERN = /BEAST_END_YEAR/;
}

export class BogeymanNumber extends WorldGenSettingToken {
	static PATTERN = /BOGEYMAN_NUMBER/;
}

export class CavernLayerCount extends WorldGenSettingToken {
	static PATTERN = /CAVERN_LAYER_COUNT/;
}

export class CavernLayerOpennessMax extends WorldGenSettingToken {
	static PATTERN = /CAVERN_LAYER_OPENNESS_MAX/;
}

export class CavernLayerOpennessMin extends WorldGenSettingToken {
	static PATTERN = /CAVERN_LAYER_OPENNESS_MIN/;
}

export class CavernLayerPassageDensityMax extends WorldGenSettingToken {
	static PATTERN = /CAVERN_LAYER_PASSAGE_DENSITY_MAX/;
}

export class CavernLayerPassageDensityMin extends WorldGenSettingToken {
	static PATTERN = /CAVERN_LAYER_PASSAGE_DENSITY_MIN/;
}

export class CavernLayerWaterMax extends WorldGenSettingToken {
	static PATTERN = /CAVERN_LAYER_WATER_MAX/;
}

export class CavernLayerWaterMin extends WorldGenSettingToken {
	static PATTERN = /CAVERN_LAYER_WATER_MIN/;
}

export class CaveMaxSize extends WorldGenSettingToken {
	static PATTERN = /CAVE_MAX_SIZE/;
}

export class CaveMinSize extends WorldGenSettingToken {
	static PATTERN = /CAVE_MIN_SIZE/;
}

export class CompleteOceanEdgeMin extends WorldGenSettingToken {
	static PATTERN = /COMPLETE_OCEAN_EDGE_MIN/;
}

export class CullHistoricalFigures extends WorldGenSettingToken {
	static PATTERN = /CULL_HISTORICAL_FIGURES/;
}

export class DemonNumber extends WorldGenSettingToken {
	static PATTERN = /DEMON_NUMBER/;
}

export class Dim extends WorldGenSettingToken {
	static PATTERN = /DIM/;
}

export class DisturbanceInteractionNumber extends WorldGenSettingToken {
	static PATTERN = /DISTURBANCE_INTERACTION_NUMBER/;
}

export class Drainage extends WorldGenSettingToken {
	static PATTERN = /DRAINAGE/;
}

export class DrainageFrequency extends WorldGenSettingToken {
	static PATTERN = /DRAINAGE_FREQUENCY/;
}

export class DrainageRanges extends WorldGenSettingToken {
	static PATTERN = /DRAINAGE_RANGES/;
}

export class Elevation extends WorldGenSettingToken {
	static PATTERN = /ELEVATION/;
}

export class ElevationFrequency extends WorldGenSettingToken {
	static PATTERN = /ELEVATION_FREQUENCY/;
}

export class ElevationRanges extends WorldGenSettingToken {
	static PATTERN = /ELEVATION_RANGES/;
}

export class EmbarkPoints extends WorldGenSettingToken {
	static PATTERN = /EMBARK_POINTS/;
}

export class EndYear extends WorldGenSettingToken {
	static PATTERN = /END_YEAR/;
}

export class ErosionCycleCount extends WorldGenSettingToken {
	static PATTERN = /EROSION_CYCLE_COUNT/;
}

export class EvilCloudNumber extends WorldGenSettingToken {
	static PATTERN = /EVIL_CLOUD_NUMBER/;
}

export class EvilRainNumber extends WorldGenSettingToken {
	static PATTERN = /EVIL_RAIN_NUMBER/;
}

export class EvilSqCounts extends WorldGenSettingToken {
	static PATTERN = /EVIL_SQ_COUNTS/;
}

export class GenerateDivineMaterials extends WorldGenSettingToken {
	static PATTERN = /GENERATE_DIVINE_MATERIALS/;
}

export class GoodSqCounts extends WorldGenSettingToken {
	static PATTERN = /GOOD_SQ_COUNTS/;
}

export class HaveBottomLayer1 extends WorldGenSettingToken {
	static PATTERN = /HAVE_BOTTOM_LAYER_1/;
}

export class HaveBottomLayer2 extends WorldGenSettingToken {
	static PATTERN = /HAVE_BOTTOM_LAYER_2/;
}

export class LevelsAboveGround extends WorldGenSettingToken {
	static PATTERN = /LEVELS_ABOVE_GROUND/;
}

export class LevelsAboveLayer1 extends WorldGenSettingToken {
	static PATTERN = /LEVELS_ABOVE_LAYER_1/;
}

export class LevelsAboveLayer2 extends WorldGenSettingToken {
	static PATTERN = /LEVELS_ABOVE_LAYER_2/;
}

export class LevelsAboveLayer3 extends WorldGenSettingToken {
	static PATTERN = /LEVELS_ABOVE_LAYER_3/;
}

export class LevelsAboveLayer4 extends WorldGenSettingToken {
	static PATTERN = /LEVELS_ABOVE_LAYER_4/;
}

export class LevelsAboveLayer5 extends WorldGenSettingToken {
	static PATTERN = /LEVELS_ABOVE_LAYER_5/;
}

export class LevelsAtBottom extends WorldGenSettingToken {
	static PATTERN = /LEVELS_AT_BOTTOM/;
}

export class MegabeastCap extends WorldGenSettingToken {
	static PATTERN = /MEGABEAST_CAP/;
}

export class MineralScarcity extends WorldGenSettingToken {
	static PATTERN = /MINERAL_SCARCITY/;
}

export class MountainCaveMin extends WorldGenSettingToken {
	static PATTERN = /MOUNTAIN_CAVE_MIN/;
}

export class NightTrollNumber extends WorldGenSettingToken {
	static PATTERN = /NIGHT_TROLL_NUMBER/;
}

export class NonMountainCaveMin extends WorldGenSettingToken {
	static PATTERN = /NON_MOUNTAIN_CAVE_MIN/;
}

export class OrographicPrecipitation extends WorldGenSettingToken {
	static PATTERN = /OROGRAPHIC_PRECIPITATION/;
}

export class PartialOceanEdgeMin extends WorldGenSettingToken {
	static PATTERN = /PARTIAL_OCEAN_EDGE_MIN/;
}

export class PeakNumberMin extends WorldGenSettingToken {
	static PATTERN = /PEAK_NUMBER_MIN/;
}

export class PeriodicallyErodeExtremes extends WorldGenSettingToken {
	static PATTERN = /PERIODICALLY_ERODE_EXTREMES/;
}

export class PlayableCivilizationRequired extends WorldGenSettingToken {
	static PATTERN = /PLAYABLE_CIVILIZATION_REQUIRED/;
}

export class Pole extends WorldGenSettingToken {
	static PATTERN = /POLE/;
}

export class Rainfall extends WorldGenSettingToken {
	static PATTERN = /RAINFALL/;
}

export class RainFrequency extends WorldGenSettingToken {
	static PATTERN = /RAIN_FREQUENCY/;
}

export class RainRanges extends WorldGenSettingToken {
	static PATTERN = /RAIN_RANGES/;
}

export class RegionalInteractionNumber extends WorldGenSettingToken {
	static PATTERN = /REGIONAL_INTERACTION_NUMBER/;
}

export class RegionCounts extends WorldGenSettingToken {
	static PATTERN = /REGION_COUNTS/;
}

export class RevealAllHistory extends WorldGenSettingToken {
	static PATTERN = /REVEAL_ALL_HISTORY/;
}

export class RiverMins extends WorldGenSettingToken {
	static PATTERN = /RIVER_MINS/;
}

export class Savagery extends WorldGenSettingToken {
	static PATTERN = /SAVAGERY/;
}

export class SavageryFrequency extends WorldGenSettingToken {
	static PATTERN = /SAVAGERY_FREQUENCY/;
}

export class SavageryRanges extends WorldGenSettingToken {
	static PATTERN = /SAVAGERY_RANGES/;
}

export class SecretNumber extends WorldGenSettingToken {
	static PATTERN = /SECRET_NUMBER/;
}

export class SemimegabeastCap extends WorldGenSettingToken {
	static PATTERN = /SEMIMEGABEAST_CAP/;
}

export class ShowEmbarkTunnel extends WorldGenSettingToken {
	static PATTERN = /SHOW_EMBARK_TUNNEL/;
}

export class SiteCap extends WorldGenSettingToken {
	static PATTERN = /SITE_CAP/;
}

export class SubregionMax extends WorldGenSettingToken {
	static PATTERN = /SUBREGION_MAX/;
}

export class Temperature extends WorldGenSettingToken {
	static PATTERN = /TEMPERATURE/;
}

export class TemperatureFrequency extends WorldGenSettingToken {
	static PATTERN = /TEMPERATURE_FREQUENCY/;
}

export class TitanAttackTrigger extends WorldGenSettingToken {
	static PATTERN = /TITAN_ATTACK_TRIGGER/;
}

export class TitanNumber extends WorldGenSettingToken {
	static PATTERN = /TITAN_NUMBER/;
}

export class Title extends WorldGenSettingToken {
	static PATTERN = /TITLE/;
}

export class TotalCivNumber extends WorldGenSettingToken {
	static PATTERN = /TOTAL_CIV_NUMBER/;
}

export class TotalCivPopulation extends WorldGenSettingToken {
	static PATTERN = /TOTAL_CIV_POPULATION/;
}

export class VampireNumber extends WorldGenSettingToken {
	static PATTERN = /VAMPIRE_NUMBER/;
}

export class Volcanism extends WorldGenSettingToken {
	static PATTERN = /VOLCANISM/;
}

export class VolcanismFrequency extends WorldGenSettingToken {
	static PATTERN = /VOLCANISM_FREQUENCY/;
}

export class VolcanismRanges extends WorldGenSettingToken {
	static PATTERN = /VOLCANISM_RANGES/;
}

export class VolcanoMin extends WorldGenSettingToken {
	static PATTERN = /VOLCANO_MIN/;
}

export class WerebeastNumber extends WorldGenSettingToken {
	static PATTERN = /WEREBEAST_NUMBER/;
}

export class WorldGen extends Token {
	static PATTERN = /WORLD_GEN/;
}
