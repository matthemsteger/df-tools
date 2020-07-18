import {regexp, optWhitespace} from 'parsimmon';
import {curry} from 'ramda';

const createAnimalPopulationsParser = curry((regex, lang) => {
	const {creaturePopulation} = lang;
	return regexp(regex).then(creaturePopulation.many()).trim(optWhitespace);
});

export const outdoorAnimalPopulations = createAnimalPopulationsParser(
	/Outdoor Animal Populations \(Including Undead\)(?:\r\n?|\n)/
);

export const undergroundAnimalPopulations = createAnimalPopulationsParser(
	/Underground Animal Populations \(Including Undead\)(?:\r\n?|\n)/
);
