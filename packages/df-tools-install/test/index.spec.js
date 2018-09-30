import {describe, it} from 'mocha';
import {expect, use} from 'chai';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import proxyquire from 'proxyquire';
import {createFsStubModule} from '../../../shared/test/fs';

use(sinonChai);
const noop = () => undefined;
const sandbox = sinon.createSandbox();

const installModule = proxyquire('./../src', {
	os: null,
	path: null,
	'@matthemsteger/utils-fn-fs': null
});

const {discoverInstallMeta, discoverInstall} = installModule;
