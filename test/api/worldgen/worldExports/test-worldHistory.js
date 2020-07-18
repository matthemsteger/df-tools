import proxyquire from 'proxyquire';
import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import {EventEmitter} from 'events';
import {
	setupModuleDependency,
	ensureModuleFunctionExport
} from './../../../helpers';

chai.use(sinonChai);

const sandbox = sinon.sandbox.create();
const fakeModule = setupModuleDependency(sandbox);
const pathModule = fakeModule(['resolve']);
const iconvLiteModule = fakeModule(['decodeStream']);
const fsModule = fakeModule(['createReadStream']);
const {createReadStream: createReadStreamStub} = fsModule;
const readlineModule = fakeModule(['createInterface']);
const {createInterface: createInterfaceStub} = readlineModule;
const streamStub = fakeModule(['pipe']);

const worldHistoryModule = proxyquire(
	'./../../../../src/api/worldgen/worldExports/worldHistory',
	{
		path: pathModule,
		'iconv-lite': iconvLiteModule,
		fs: fsModule,
		readline: readlineModule
	}
);

const {default: parseWorldHistory} = worldHistoryModule;

describe('api/worldgen/worldExports/worldHistory', function () {
	let fakeLineReader;

	beforeEach(function () {
		fakeLineReader = new EventEmitter();
	});

	afterEach(function () {
		sandbox.reset();
	});

	ensureModuleFunctionExport(worldHistoryModule, 'default');

	describe('parseWorldHistory', function () {
		const filePath = 'c:/df/whatever';

		it('should parse the world history for the worldName and friendlyWorldName', function (done) {
			const worldName = 'weird world name';
			const friendlyWorldName = 'the world name';
			createReadStreamStub.returns(streamStub);
			createInterfaceStub.returns(fakeLineReader);

			parseWorldHistory({filePath}).fork(done, (result) => {
				expect(result).to.be.deep.equal({
					worldName,
					friendlyWorldName
				});
				done();
			});

			fakeLineReader.emit('line', worldName);
			fakeLineReader.emit('line', friendlyWorldName);
			fakeLineReader.emit('close');
		});
	});
});
