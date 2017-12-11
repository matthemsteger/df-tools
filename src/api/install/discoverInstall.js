import os from 'os';
import path from 'path';
import R from 'ramda';
import {of as futureOf} from 'fluture';
import {fs, maybeDirHasFile} from './../../utility/fs';
import createDwarfFortressInstall from './../../model/install/dwarfFortressInstall';

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
	return R.compose(
		R.chain(R.compose(
			R.invoker(1, 'getOrElse')(futureOf({installPath})),
			R.map(R.compose(
				R.map(R.compose(
					(version) => ({installPath, version}),
					R.nth(1),
					R.match(/Release notes for (\d+.\d+.\d+)/)
				)),
				(releaseNotesPath) => fs.readFileFuture(releaseNotesPath, {encoding: 'utf8', flag: 'r'}),
				(releaseNotesFileName) => path.resolve(installPath, releaseNotesFileName)
			))
		)),
		maybeDirHasFile('release notes.txt')
	)(installPath);
}

export const discoverInstall = R.compose(
	R.map(({installPath, version}) => createDwarfFortressInstall({
		path: installPath,
		version,
		osType: os.type()
	})),
	discoverInstallMeta,
	R.prop('dfRootPath')
);
