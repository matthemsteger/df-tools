import {COLOR, NAME, WORD, RGB} from '../generatedDefinitions';
import {withChildren, isRequired} from '../definitionUtils';

export default withChildren(COLOR, [WORD, ...[NAME, RGB].map(isRequired)]);
