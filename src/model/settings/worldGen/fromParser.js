import R from 'ramda';
import _debug from 'debug';
import {definition} from './../../../dsl/parsers/settings/worldGen';

const debug = _debug('df:model:settings:worldGen:fromParser');

const transducer = R.compose(...R.map(R.prop('transform'), definition.children));

function worldGenSettingFromParse(worldGenSettingParseResult) {
	const {children} = worldGenSettingParseResult;
	return R.transduce(transducer, R.mergeDeepRight, {}, children);
}

export default function worldGenSettingsFromParse(parseResult) {
	debug('getting settings from parse %o', parseResult);
	const {settings = []} = parseResult;
	return R.map(worldGenSettingFromParse, settings);
}
