import R from 'ramda';
import {expect} from 'chai';

export const noop = R.always();

export const setupModuleDependency = R.curry((sandbox, fnNames) => {
	const fakeModule = R.zipObj(fnNames, R.repeat(noop, R.length(fnNames)));
	sandbox.stub(fakeModule);

	return fakeModule;
});

export function ensureFunctionExport(fn, fnName) {
	it(`should export a function ${
		fnName === 'default' ? 'as default' : fnName
	}`, function() {
		expect(fn).to.be.a('function');
	});
}

export const ensureModuleFunctionExport = R.curry((moduleObj, fnName) => {
	ensureFunctionExport(R.prop(fnName, moduleObj), fnName);
});

export function fakeFuturifiedFs(sandbox) {
	return setupModuleDependency(sandbox, ['readdirFuture', 'readFileFuture']);
}

export function setupFakeFsModule(sandbox) {
	const fsModule = setupModuleDependency(sandbox, ['glob']);
	fsModule.fs = fakeFuturifiedFs(sandbox);
	return fsModule;
}
