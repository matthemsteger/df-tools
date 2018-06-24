import sysPath from 'path';

export default function createDwarfFortressInstall({
	path,
	version,
	osType
} = {}) {
	let executablePath;
	switch (osType) {
		case 'Windows_NT':
			executablePath = sysPath.resolve(path, 'Dwarf Fortress.exe');
			break;
		case 'Linux':
		case 'Darwin':
		default:
			executablePath = sysPath.resolve(path, 'df');
	}

	return {
		path,
		version,
		osType,
		executablePath
	};
}
