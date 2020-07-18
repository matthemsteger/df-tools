import {
	CV_REMOVE_TAG,
	CV_CONVERT_TAG,
	CVCT_MASTER,
	CVCT_TARGET,
	CVCT_REPLACEMENT,
	CV_NEW_TAG,
	CV_ADD_TAG
} from '../generatedDefinitions';
import {withChildren} from '../definitionUtils';

export default [
	CV_REMOVE_TAG,
	withChildren(CV_CONVERT_TAG, [CVCT_MASTER, CVCT_TARGET, CVCT_REPLACEMENT]),
	CV_NEW_TAG,
	CV_ADD_TAG
];
