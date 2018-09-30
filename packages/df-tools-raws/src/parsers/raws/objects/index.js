import P from 'parsimmon';
import creatureParser from '../objects/creature';
import bodyDetailPlanParser from '../objects/bodyDetailPlan';

/**
 * Create an object parser based on the type
 * @param {string} objectType
 */
export default function createObjectParser(objectType) {
	switch (objectType) {
		case 'BODY_DETAIL_PLAN':
			return bodyDetailPlanParser;
		case 'CREATURE':
			return creatureParser;
		default:
			return P.fail(`Unknown objectType ${objectType}`);
	}
}
