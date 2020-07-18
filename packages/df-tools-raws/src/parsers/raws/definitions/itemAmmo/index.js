import {CLASS, ITEM_AMMO, NAME, SIZE} from '../generatedDefinitions';
import {withChildren, isRequired} from '../definitionUtils';
import attack from '../shared/attack';

export default withChildren(ITEM_AMMO, [NAME, CLASS, isRequired(SIZE), attack]);
