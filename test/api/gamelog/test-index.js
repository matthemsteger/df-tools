import proxyquire from 'proxyquire';
import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import {setupModuleDependency, ensureModuleFunctionExport} from './../../helpers';

chai.use(sinonChai);

const sandbox = sinon.sandbox.create();
const fakeModule = setupModuleDependency(sandbox);
const fsModule = fakeModule(['createReadStream']);
const {createReadStream: createReadStreamStub} = fsModule;
const iconvModule = fakeModule(['decodeStream']);
const streamStub = fakeModule(['pipe', 'collect']);
const {pipe: pipeStub, collect: collectStub} = streamStub;

const gamelogModule = proxyquire('./../../../src/api/gamelog', {
	fs: fsModule,
	'iconv-lite': iconvModule
});

const {default: readGameLogFromPosition} = gamelogModule;

describe('api/gamelog/index', function () {
	beforeEach(function () {
		pipeStub.returnsThis();
		collectStub.returnsThis();
	});

	afterEach(function () {
		sandbox.reset();
	});

	ensureModuleFunctionExport(gamelogModule, 'default');

	describe('readGameLogFromPosition', function () {
		const gamelogPath = 'c:/df/gamelog.txt';
		const start = 42;

		it('should read the game log from a start position', function (done) {
			const fakeLogText = 'blah blah';
			createReadStreamStub.returns(streamStub);
			collectStub.yields(null, fakeLogText);

			readGameLogFromPosition(gamelogPath, start).fork(
				done,
				(result) => {
					expect(result).to.be.equal(fakeLogText);
					done();
				}
			);
		});

		it('should pass a rejected future if the read errors', function (done) {
			const error = new Error('no');
			createReadStreamStub.returns(streamStub);
			collectStub.yields(error);

			readGameLogFromPosition(gamelogPath, start).fork(
				(err) => {
					expect(err).to.equal(error);
					done();
				},
				done
			);
		});
	});
});
