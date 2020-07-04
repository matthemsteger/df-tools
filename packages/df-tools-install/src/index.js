import os from 'os';
import path from 'path';
import {resolve as futureOf} from 'fluture';
import {fs, maybeDirHasFile} from '@matthemsteger/utils-fn-fs';
import {parseBase10Int} from '@matthemsteger/utils-fn-numbers';
import {
	compose,
	chain,
	invoker,
	curry,
	map,
	nth,
	match,
	filter,
	startsWith,
	sort,
	subtract
} from 'ramda';
import createDwarfFortressInstall from './createDwarfFortressInstall';

const RELEASE_NOTES_FILENAME = 'release notes.txt';
const RELEASE_NOTES_REGEX = /Release notes for (\d+.\d+.\d+)/;

const maybeGetOrElse = invoker(1, 'getOrElse');

/**
 * @typedef {function(Error): void} ErrorCallback
 */

/**
 * @template T
 * @typedef {function(T): void} SuccessCallback
 */

/**
 * @typedef {function(): void} Cancellation
 */

/**
 * @template T
 * @typedef {object} Future
 * @property {function(ErrorCallback, SuccessCallback): Cancellation} fork
 */

/**
 * @typedef {import('./createDwarfFortressInstall').DwarfFortressInstall} DwarfFortressInstall
 */

/**
 * @typedef {object} InstallMeta
 * @property {string} installPath
 * @property {string} [version]
 */

const createMetadata = curry((installPath, version) => ({
	installPath,
	version
}));

const addVersionToMetadata = curry((installPath, contents) =>
	compose(
		createMetadata(installPath),
		nth(1),
		match(RELEASE_NOTES_REGEX)
	)(contents)
);

const discoverInstallVersion = curry((installPath, releaseNotesFileName) => {
	const releaseNotesPath = path.resolve(installPath, releaseNotesFileName);
	const releaseNotesContentsFuture = fs.readFileFuture(releaseNotesPath, {
		encoding: 'utf8',
		flag: 'r'
	});

	return map(addVersionToMetadata(installPath), releaseNotesContentsFuture);
});

/**
 * Discover the install meta data from the file system at install path
 * @param {string} installPath the dwarf fortress install path
 * @returns {Future<InstallMeta>}
 */
export function discoverInstallMeta(installPath) {
	const maybeReleaseNotesFileNameFuture = maybeDirHasFile(
		RELEASE_NOTES_FILENAME
	);

	return compose(
		chain(
			compose(
				maybeGetOrElse(futureOf({installPath})),
				map(discoverInstallVersion(installPath))
			)
		),
		maybeReleaseNotesFileNameFuture
	)(installPath);
}

/**
 * Discover an install and return its information
 * @param {object} options
 * @param {string} options.dfRootPath
 * @returns {Future<DwarfFortressInstall>}
 */
export function discoverInstall({dfRootPath}) {
	const installMetaFuture = discoverInstallMeta(dfRootPath);
	return map(
		({installPath, version}) =>
			createDwarfFortressInstall({
				path: installPath,
				version,
				osType: os.type()
			}),
		installMetaFuture
	);
}

/**
 * Parse a region dir name and return the number
 * @param {string} regionDir
 * @returns {number}
 */
function parseRegionDirName(regionDir) {
	return compose(parseBase10Int, nth(1), match(/^region(\d+)$/))(regionDir);
}

/**
 * Parse region dir names for nums
 * @param {string[]} dirNames
 * @returns {number[]}
 */
function parseRegionDirsForNums(dirNames) {
	return compose(
		sort(subtract),
		map(parseRegionDirName),
		filter(startsWith('region'))
	)(dirNames);
}

/**
 * Get all the region numbers for all saves in an install
 * @param {object} options
 * @param {string} options.dfRootPath
 * @returns {Future<number[]>}
 */
export function getAllSaveRegionNums({dfRootPath}) {
	const saveDir = path.resolve(dfRootPath, 'data/save');
	const saveDirFilesFuture = fs.readdirFuture(saveDir);

	return map(parseRegionDirsForNums, saveDirFilesFuture);
}
