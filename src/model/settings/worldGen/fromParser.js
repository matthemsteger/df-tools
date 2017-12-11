import R from 'ramda';
import {transducer} from './transforms';

function worldGenSettingFromParse(worldGenSettingParseResult) {
	const {children} = worldGenSettingParseResult;
	return R.transduce(transducer, R.merge, {}, children);
}

export default function worldGenSettingsFromParse(parseResult) {
	const {settings = []} = parseResult;
	return R.map(worldGenSettingFromParse, settings);
}
