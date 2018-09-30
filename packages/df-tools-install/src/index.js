import os from 'os';
import path from 'path';
import {of as futureOf} from 'fluture';
import {fs, maybeDirHasFile} from '@matthemsteger/utils-fn-fs';
import {compose, chain, invoker, curry, map, nth, match} from 'ramda';
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

	return chain(
		compose(
			maybeGetOrElse(futureOf({installPath})),
			discoverInstallVersion(installPath)
		),
		maybeReleaseNotesFileNameFuture
	);
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
