import os from 'os';
import R from 'ramda';
import _fs from 'fs';
import path from 'path';
import {of as futureOf} from 'fluture';
import {futurifyAll} from './../../utility/futurify';
import createDwarfFortressInstall from './dwarfFortressInstall';

const fs = futurifyAll(_fs);

/**
 * figure out if a directory includes a fileName
 * @param {string} fileName
 * @param {string} dirPath
 * @returns {Future<boolean>}
 */
const directoryIncludesFile = R.curry((fileName, dirPath) =>
	R.compose(
		R.map(R.contains(fileName)),
		fs.readdirFuture
	)(dirPath)
);

/**
 * @typedef InstallMeta
 * @property {string} installPath
 * @property {string} version
 */

/**
 * discover the install meta data from the file system at the given path
 * @param {string} installPath - the install path
 * @returns {Future<InstallMeta>} 
 */
export function discoverInstallMeta(installPath) {
	const metadata = {installPath};
	const releaseNotesFileName = 'release notes.txt';
	const releaseVersionRegex = /Release notes for (\d+.\d+.\d+)/;

	return R.compose(
		R.chain((foundReleaseNotes) => {
			if (!foundReleaseNotes) return futureOf(metadata);

			const releaseNotesPath = path.resolve(installPath, releaseNotesFileName);
			return R.map((releaseNotes) => {
				const matches = releaseNotes.match(releaseVersionRegex);
				if (matches && matches.length >= 1) {
					metadata.version = matches[1];
				}

				return metadata;
			}, fs.readFileFuture(releaseNotesPath, {encoding: 'utf8', flag: 'r'}));
		}),
		directoryIncludesFile(releaseNotesFileName)
	)(installPath);
}

export default function discoverInstall({dfRootPath} = {}) {
	const osType = os.type();
	return R.map(
		({version}) => createDwarfFortressInstall({path: dfRootPath, osType, version}),
		discoverInstallMeta(dfRootPath)
	);
}

