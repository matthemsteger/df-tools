import {COLOR, NAME, WORD, RGB} from '../generatedDefinitions';
import {withChildren, isRequired} from '../definitionUtils';

export default withChildren(COLOR, [NAME, WORD, RGB].map(isRequired));
