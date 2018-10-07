import {
	REACTION,
	NAME,
	BUILDING,
	REAGENT,
	CATEGORY,
	CATEGORY_NAME,
	CATEGORY_DESCRIPTION,
	PRODUCT,
	FORCE_EDGE,
	PRODUCT_PASTE,
	PRODUCT_PRESSED,
	PRODUCT_DIMENSION,
	PRODUCT_TO_CONTAINER,
	PRODUCT_TOKEN,
	FUEL,
	SKILL,
	AUTOMATIC,
	ADVENTURE_MODE_ENABLED,
	IMPROVEMENT,
	TRANSFER_ARTIFACT_STATUS
} from '../generatedDefinitions';
import {CATEGORY_PARENT, CATEGORY_KEY} from '../undeliveredDefinitions';
import {withChildren} from '../definitionUtils';
import reagentModifiers from '../shared/reagentModifiers';

export default withChildren(REACTION, [
	NAME,
	BUILDING,
	withChildren(REAGENT, reagentModifiers),
	CATEGORY,
	CATEGORY_NAME,
	CATEGORY_DESCRIPTION,
	CATEGORY_PARENT,
	CATEGORY_KEY,
	withChildren(PRODUCT, [
		FORCE_EDGE,
		PRODUCT_PASTE,
		PRODUCT_PRESSED,
		PRODUCT_DIMENSION,
		PRODUCT_TO_CONTAINER,
		PRODUCT_TOKEN,
		TRANSFER_ARTIFACT_STATUS
	]),
	FUEL,
	SKILL,
	AUTOMATIC,
	ADVENTURE_MODE_ENABLED,
	IMPROVEMENT
]);
