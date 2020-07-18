import {seqMap, regexp, optWhitespace, string, digits} from 'parsimmon';

const HEADER_REGEX = /Civilized World Population(?:\r\n?|\n)+/;

export default function civilizedWorldPopulationParser(lang) {
	return seqMap(
		regexp(HEADER_REGEX)
			.then(lang.creaturePopulation.many())
			.trim(optWhitespace),
		string('Total:')
			.then(digits.trim(optWhitespace))
			.map((number) => Number.parseInt(number, 10) || undefined),
		(populations, total = 0) => {
			const civilizedPopulations = populations.map(
				({creature, population = 0}) => ({race: creature, population})
			);

			return {
				civilizedPopulations,
				total
			};
		}
	);
}
