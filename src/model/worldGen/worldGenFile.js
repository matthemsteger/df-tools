
const privates = {
	configurations: new WeakMap()
};

export default class WorldGenFile {
	constructor({configurations = []} = {}) {
		privates.configurations.set(this, configurations);
	}

	get configurations() {
		return privates.configurations.get(this);
	}
}
