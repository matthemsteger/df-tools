import os from 'os';
import _ from 'lodash';
import fs from 'fs';
import Promise from 'bluebird';
import path from 'path';
import DwarfFortressInstall from './dwarfFortressInstall';

Promise.promisifyAll(fs);

export async function discoverInstallMeta(installPath) {
	const metadata = {installPath};

	const files = await fs.readdirAsync(installPath);
	if (_.includes(files, 'release notes.txt')) {
		const releaseNotesPath = path.resolve(installPath, 'release notes.txt');
		const releaseNotes = await fs.readFileAsync(releaseNotesPath, {encoding: 'utf8', flag: 'r'});
		const releaseVersionRegex = /Release notes for (\d+.\d+.\d+)/;
		const matches = releaseNotes.match(releaseVersionRegex);
		if (matches && matches.length >= 1) {
			metadata.version = matches[1];
		}
	}

	return metadata;
}

export default async function discoverInstall({dfRootPath} = {}) {
	const osType = os.type();
	const {version} = await discoverInstallMeta(dfRootPath);

	return new DwarfFortressInstall({path: dfRootPath, osType, version});
}
