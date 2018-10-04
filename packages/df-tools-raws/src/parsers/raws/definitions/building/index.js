import {
	BUILDING_WORKSHOP,
	BLOCK,
	BUILD_ITEM,
	BUILD_KEY,
	BUILD_LABOR,
	COLOR,
	DIM,
	NAME,
	NAME_COLOR,
	TILE,
	WORK_LOCATION
} from '../generatedDefinitions';
import {BUILDING_FURNACE} from '../undeliveredDefinitions';
import {withChildren} from '../definitionUtils';
import reagentModifiers from '../shared/reagentModifiers';

const buildingProperties = [
	BLOCK,
	withChildren(BUILD_ITEM, reagentModifiers),
	BUILD_KEY,
	BUILD_LABOR,
	COLOR,
	DIM,
	NAME,
	NAME_COLOR,
	TILE,
	WORK_LOCATION
];

export const buildingWorkshop = withChildren(
	BUILDING_WORKSHOP,
	buildingProperties
);

export const buildingFurnace = withChildren(
	BUILDING_FURNACE,
	buildingProperties
);
