import P from 'parsimmon';
import R from 'ramda';
import {convertDefinition, spacedWithComments} from './../tokenLanguage';

/**
 * This creates a parser suitable for a settings file that consists of tokens and their
 * possible children
 */

export default function createSettingsParser(definition) {
	return P.createLanguage({
		file(lang) {
			return lang.settings.map(R.objOf('settings'));
		},
		settings(lang) {
			return lang.setting.many();
		},
		setting() {
			return spacedWithComments(convertDefinition(definition));
		}
	});
}
