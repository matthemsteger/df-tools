import P from 'parsimmon';
import creatureParser from '../objects/creature';
import bodyDetailPlanParser from '../objects/bodyDetailPlan';
import bodyParser from '../objects/body';
import buildingParser from '../objects/building';
import creatureVariationParser from '../objects/creatureVariation';
import descriptorColorParser from '../objects/descriptorColor';
import descriptorPatternParser from '../objects/descriptorPattern';
import descriptorShapeParser from '../objects/descriptorShape';
import entityParser from '../objects/entity';
import inorganicParser from '../objects/inorganic';
import interactionParser from '../objects/interaction';
import itemParser from '../objects/item';
import languageParser from '../objects/language';
import materialTemplateParser from '../objects/materialTemplate';
import plantParser from '../objects/plant';
import reactionParser from '../objects/reaction';
import tissueTemplateParser from '../objects/tissueTemplate';

/**
 * Create an object parser based on the type
 * @param {string} objectType
 */
export default function createObjectParser(objectType) {
	switch (objectType) {
		case 'BODY_DETAIL_PLAN':
			return bodyDetailPlanParser;
		case 'BODY':
			return bodyParser;
		case 'BUILDING':
			return buildingParser;
		case 'CREATURE':
			return creatureParser;
		case 'CREATURE_VARIATION':
			return creatureVariationParser;
		case 'DESCRIPTOR_COLOR':
			return descriptorColorParser;
		case 'DESCRIPTOR_PATTERN':
			return descriptorPatternParser;
		case 'DESCRIPTOR_SHAPE':
			return descriptorShapeParser;
		case 'ENTITY':
			return entityParser;
		case 'INORGANIC':
			return inorganicParser;
		case 'INTERACTION':
			return interactionParser;
		case 'ITEM':
			return itemParser;
		case 'LANGUAGE':
			return languageParser;
		case 'MATERIAL_TEMPLATE':
			return materialTemplateParser;
		case 'PLANT':
			return plantParser;
		case 'REACTION':
			return reactionParser;
		case 'TISSUE_TEMPLATE':
			return tissueTemplateParser;
		default:
			return P.fail(`Unknown objectType ${objectType}`);
	}
}
