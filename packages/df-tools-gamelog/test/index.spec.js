import {expect, use} from 'chai';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import proxyquire from 'proxyquire';
import {promise} from 'fluture';
import {createFsStubModule} from '../../../shared/test/fs';

use(sinonChai);
const noop = () => undefined;
const sandbox = sinon.createSandbox();
const iconvModule = {decodeStream: noop};
const {decodeStream: decodeStreamStub} = sandbox.stub(iconvModule);
const fsModule = createFsStubModule(sandbox);
const {createReadStream: createReadStreamStub, Stream: streamStub} = fsModule;
const {collect: collectStub} = streamStub;

const gamelogModule = proxyquire('./../src', {
	fs: fsModule,
	'iconv-lite': iconvModule
});

const {default: readGameLogFromPosition} = gamelogModule;

describe('src/index', () => {
	it('should export a function as default', () => {
		expect(readGameLogFromPosition).to.be.a('function').with.lengthOf(2);
	});

	describe('readGameLogFromPosition', () => {
		const gamelogPath = 'c:/df/gamelog.txt';

		it('should return a future with the decoded text', async () => {
			const start = 33;
			const fakeResult = 'blah blah';
			collectStub.callsArgWith(0, null, fakeResult);

			const result = await promise(
				readGameLogFromPosition(gamelogPath, start)
			);
			expect(
				createReadStreamStub
			).to.have.been.calledWithMatch(gamelogPath, {start});
			expect(decodeStreamStub).to.have.been.calledWithExactly('cp437');
			expect(result).to.equal(fakeResult);
		});

		it('should reject the future if an error is encountered', async () => {
			const start = 33;
			const error = new Error('no!');
			collectStub.callsArgWith(0, error, null);

			try {
				const result = await promise(
					readGameLogFromPosition(gamelogPath, start)
				);
				expect(result).to.not.be.ok;
			} catch (err) {
				expect(err).to.equal(error);
			}

			expect(
				createReadStreamStub
			).to.have.been.calledWithMatch(gamelogPath, {start});
			expect(decodeStreamStub).to.have.been.calledWithExactly('cp437');
		});
	});
});
