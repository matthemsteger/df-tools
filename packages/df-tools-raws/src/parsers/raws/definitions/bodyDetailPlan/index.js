import {
	BODY_DETAIL_PLAN,
	ADD_MATERIAL,
	ADD_TISSUE,
	BP_LAYERS,
	BP_POSITION,
	BP_RELATION,
	BP_RELSIZE
} from '../generatedDefinitions';
import {BP_LAYERS_OVER, BP_LAYERS_UNDER} from '../undeliveredDefinitions';
import {withChildren} from '../definitionUtils';

export default withChildren(BODY_DETAIL_PLAN, [
	ADD_MATERIAL,
	ADD_TISSUE,
	BP_LAYERS,
	BP_POSITION,
	BP_RELATION,
	BP_RELSIZE,
	BP_LAYERS_OVER,
	BP_LAYERS_UNDER
]);
