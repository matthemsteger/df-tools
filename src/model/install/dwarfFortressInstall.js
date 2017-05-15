import sysPath from 'path';

export default class DwarfFortressInstall {
	constructor({path, version, osType} = {}) {
		this.path = path;
		this.version = version;
		this.osType = osType;

		switch (osType) {
			case 'Windows_NT':
				this.executablePath = sysPath.resolve(path, 'Dwarf Fortress.exe');
				break;
			case 'Linux':
			case 'Darwin':
			default:
				this.executablePath = sysPath.resolve(path, 'df');
		}
	}
}
