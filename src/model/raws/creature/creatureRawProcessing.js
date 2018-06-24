import R from 'ramda';
import createCreature from './creature';

const getTag = (name) => R.find(R.propEq('name', R.toUpper(name)));
const getTagValue = (valueIdx) => R.path(['value', valueIdx]);
const getCreatureId = getTagValue(0);
const reduceToObjectByIdx = R.curry((propToIdxMap, values) =>
	R.map((idx) => values[idx], propToIdxMap)
);

const getNames = R.compose(
	reduceToObjectByIdx({singularName: 0, pluralName: 1, adjectiveName: 2}),
	R.prop('value'),
	getTag('NAME')
);

export function modelRawCreatureObject(rawCreature) {
	return createCreature({
		id: getCreatureId(rawCreature),
		...getNames(rawCreature.children)
	});
}

export function modelCreatureRawFile(rawFile) {
	// expect label with creature_
	// objectType : value : ['CREATURE']
	// objects is an array of raw creatures
	const objectType = getTagValue(0)(rawFile.objectType);
	if (objectType !== 'CREATURE')
		throw new Error(
			`Expected object type of CREATURE but got ${objectType}`
		);

	return rawFile.objects.map(modelRawCreatureObject);
}
