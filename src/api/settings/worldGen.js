import path from 'path';
import R from 'ramda';
import {fileMeta, readUtf8File} from './../../utility/fs';
import worldGenSettingsParser from './../../dsl/parsers/settings/worldGen';
import {fromParser} from './../../model/settings/worldGen';

/**
 * Get the world gen settings file meta
 * @param {string} installPath
 * @returns {Future<FileMeta>}
 */
export function getWorldGenSettingsFile(installPath) {
	return R.compose(fileMeta, (p) =>
		path.resolve(p, 'data/init/world_gen.txt')
	)(installPath);
}

/**
 * Get parsed world gen settings from an install path
 * @param {string} worldGenSettingsFileContents
 * @returns {WorldGenSettings}
 */
export const parseWorldGenSettings = R.compose(
	fromParser,
	R.prop('value'),
	(contents) => worldGenSettingsParser.file.parse(contents)
);

/**
 * Get parsed world gen settings from an install path
 * @param {string} installPath
 * @returns {Future<WorldGenSettings>}
 */
export function getWorldGenSettings(installPath) {
	return R.compose(
		R.map(parseWorldGenSettings),
		R.chain(R.compose(readUtf8File, R.prop('filePath'))),
		getWorldGenSettingsFile
	)(installPath);
}
