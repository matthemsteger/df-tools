const privates = {
	install: new WeakMap(),
	rawCollection: new WeakMap()
};

export default class DwarfyModel {
	get install() {
		return privates.install.get(this);
	}

	set install(install) {
		privates.install.set(this, install);
	}

	get rawCollection() {
		return privates.rawCollection.get(this);
	}

	set rawCollection(rawCollection) {
		privates.install.set(this, rawCollection);
	}
}
