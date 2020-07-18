import {describe, it} from 'mocha';
import proxyquire from 'proxyquire';
import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import {of as futureOf} from 'fluture';
import {setupModuleDependency} from './../../helpers';

chai.use(sinonChai);

const sandbox = sinon.createSandbox();
const fakeModule = setupModuleDependency(sandbox);
const pathModule = fakeModule(['resolve']);
const fsModule = fakeModule(['glob', 'fileMeta']);
const {glob: globStub, fileMeta: fileMetaStub} = fsModule;

const rawFilesModule = proxyquire('./../../../src/api/raws/rawFiles', {
	path: pathModule,
	'./../../utility/fs': fsModule
});

const {typeToFilePrefixMap, default: rawFiles} = rawFilesModule;

describe('api/raws/rawFiles', function () {
	it('should export an object as typeToFilePrefixMap', function () {
		expect(typeToFilePrefixMap).to.be.an('object');
	});

	it('should export an object as default', function () {
		expect(rawFiles).to.be.an('object');
	});

	const expectedPrefixes = [
		'bodyDetailPlan',
		'body',
		'building',
		'creatureVariation',
		'creature',
		'descriptorColor',
		'descriptorPattern',
		'descriptorShape',
		'entity',
		'inorganic',
		'interaction',
		'itemAmmo',
		'itemArmor',
		'itemFood',
		'itemGloves',
		'itemHelmet',
		'itemPants',
		'itemShield',
		'itemShoes',
		'itemSiegeAmmo',
		'itemTool',
		'itemToy',
		'itemTrapComponent',
		'itemWeapon',
		'language',
		'materialTemplate',
		'plant',
		'reaction',
		'tissueTemplate'
	];

	describe('typeToFilePrefixMap', function () {
		expectedPrefixes.forEach((prefix) => {
			it(`should have a key ${prefix}`, function () {
				expect(typeToFilePrefixMap)
					.to.have.property(prefix)
					.that.is.a('string');
			});
		});
	});

	describe('rawFiles', function () {
		const installPath = 'c:/df';
		expectedPrefixes.forEach((prefix) => {
			it(`should have a function ${prefix}`, function () {
				expect(rawFiles).to.have.property(prefix).that.is.a('function');
			});

			it(`should have function ${prefix} produce a future of file meta`, function (done) {
				const fakeGlobResult = [`/tmp/fake/${prefix}.txt`];
				const fakeFileMetaResult = {
					hash: prefix,
					filePath: fakeGlobResult[0]
				};
				const globInnerStub = sinon
					.stub()
					.returns(futureOf(fakeGlobResult));
				globStub.returns(globInnerStub);
				fileMetaStub.returns(futureOf(fakeFileMetaResult));

				const future = rawFiles[prefix](installPath);
				future.fork(done, (result) => {
					expect(result).to.deep.equal([fakeFileMetaResult]);
					done();
				});
			});
		});
	});
});
