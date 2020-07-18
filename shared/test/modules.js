import {curry, zipObj, repeat, length, always} from 'ramda';

export const noop = always();

export const setupFakeObj = curry((sandbox, fnNames) => {
	const fakeModule = zipObj(fnNames, repeat(noop, length(fnNames)));
	sandbox.stub(fakeModule);

	return fakeModule;
});
