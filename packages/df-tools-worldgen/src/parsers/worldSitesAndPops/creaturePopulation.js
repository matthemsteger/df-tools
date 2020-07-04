import {seqMap, alt, regexp} from 'parsimmon';
import {
	map,
	always,
	o,
	toLower,
	join,
	reject,
	equals,
	split,
	toUpper,
	compose
} from 'ramda';

const splitByNonAlphaNumeric = o(reject(equals('')), split(/[^a-zA-Z0-9]+/g));
const toSnakeCase = o(join('_'), o(map(toLower), splitByNonAlphaNumeric));

const handleNumber = (popNumber) =>
	popNumber === 'Unnumbered' ? Number.NaN : Number.parseInt(popNumber, 10);
const populationParser = map(handleNumber, regexp(/\t(\d+|Unnumbered) /, 1));

const makeForgottenBeast = always({
	creatureId: 'GENERATED_FORGOTTEN_BEAST',
	name: 'forgotten beast',
	isGenerated: true
});

const forgottenBeastParser = regexp(/(forgotten beasts?)(?:\r\n?|\n)/i).map(
	makeForgottenBeast
);

const makeId = compose(toUpper, (name) => `GENERATED_${name}`, toSnakeCase);

const makeOtherWorldlyCreature = (generatedName) => {
	const id = makeId(generatedName);
	return {
		creatureId: id,
		name: generatedName,
		isGenerated: true
	};
};

const otherWordlyParser = regexp(/(.+)(?:\r\n?|\n)/, 1).map(
	makeOtherWorldlyCreature
);

const creatureParser = (exactCreatureParser) =>
	alt(exactCreatureParser, forgottenBeastParser, otherWordlyParser);

export default function creaturePopulationParser(lang) {
	return seqMap(
		populationParser,
		creatureParser(lang.exactCreatureParser),
		(population, creature) => ({
			population,
			...creature
		})
	);
}
