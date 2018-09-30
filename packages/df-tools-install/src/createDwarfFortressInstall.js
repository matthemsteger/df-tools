import sysPath from 'path';

/**
 * @module createDwarfFortressInstall
 */

const WINDOWS_EXEC = 'Dwarf Fortress.exe';
const NIX_EXEC = 'df';

/**
 * @typedef {object} DwarfFortressInstall
 * @property {string} path
 * @property {string} version
 * @property {string} osType
 * @property {string} executablePath
 */

/**
 * Create a dwarf fortress install
 * @param {object} options
 * @param {string} options.path
 * @param {string} [options.version]
 * @param {string} options.osType
 * @returns {DwarfFortressInstall}
 */
export default function createDwarfFortressInstall({path, version, osType}) {
	const executable = osType === 'Windows_NT' ? WINDOWS_EXEC : NIX_EXEC;
	const executablePath = sysPath.resolve(path, executable);

	return {
		path,
		version,
		osType,
		executablePath
	};
}
