import {string, seqMap, optWhitespace, digits, alt} from 'parsimmon';
import {filter, flip, includes, compose, prop, map} from 'ramda';

const itemIsIn = flip(includes);
const civilizedCreatureIds = ['DWARF', 'HUMAN', 'ELF', 'GOBLIN', 'KOBOLD'];
const creatureIsCivilized = compose(itemIsIn(civilizedCreatureIds), prop('id'));
const upperFirst = ([first, ...rest]) =>
	[first.toUpperCase(), ...rest].join('');
const upperFirstStringParser = compose(string, upperFirst);

function makeCivilizationPopulationParser(nameParser) {
	return seqMap(
		digits.trim(optWhitespace),
		nameParser.trim(optWhitespace),
		(population, civName) => ({population, civName})
	);
}

export default function civilizationPopulationParser(creatures) {
	const civilizedCreatures = filter(creatureIsCivilized, creatures);
	const civilizedCreatureNameParsers = map(
		compose(upperFirstStringParser, prop('pluralName')),
		civilizedCreatures
	);

	const civilizationPopulationParsers = map(
		makeCivilizationPopulationParser,
		civilizedCreatureNameParsers
	);

	return alt(...civilizationPopulationParsers);
}
