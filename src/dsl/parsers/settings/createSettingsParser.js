import P from 'parsimmon';
import R from 'ramda';
import _debug from 'debug';
import {convertDefinition, numRequiredInDefinitions, spacedWithComments} from './../tokenLanguage';

const debug = _debug('df:dsl:parsers:settings:createSettingsParser');

/**
 * This creates a parser suitable for a settings file that consists of tokens and their
 * possible children
 */

export default function createSettingsParser(definition) {
	return P.createLanguage({
		file(lang) {
			debug('in file');
			return lang.settings.map(R.objOf('settings'));
		},
		settings(lang) {
			debug('in settings');
			return lang.setting.many();
		},
		setting() {
			debug('in setting');
			return spacedWithComments(convertDefinition(definition));
			// const numRequired = numRequiredInDefinitions(definitions);
			// debug('numRequired %d', numRequired);
			// const childTokenParsers = spaceAllWithComments(definitions.map(convertDefinition));
			// debug('childTokenParsers %o', childTokenParsers);
			// if (childTokenParsers.length > 1) {
			// 	return P.alt(...childTokenParsers).atLeast(numRequired);
			// }

			// return childTokenParsers[0];
		}
	});
}
