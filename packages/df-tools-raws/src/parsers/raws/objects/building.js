import P from 'parsimmon';
import createParserFromDefinition from '../createParserFromDefinition';
import {buildingWorkshop, buildingFurnace} from '../definitions/building';

export default P.alt(
	createParserFromDefinition(buildingWorkshop),
	createParserFromDefinition(buildingFurnace)
);
