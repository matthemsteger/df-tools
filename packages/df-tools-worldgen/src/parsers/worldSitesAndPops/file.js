import {seqMap} from 'parsimmon';

export default function fileParser(lang) {
	return seqMap(
		lang.civilizedWorldPopulation,
		lang.sites,
		lang.outdoorAnimalPopulations,
		lang.undergroundAnimalPopulations,
		(
			civilizedWorldPopulation,
			sites,
			outdoorAnimalPopulations,
			undergroundAnimalPopulations
		) => ({
			civilizedWorldPopulation,
			sites,
			outdoorAnimalPopulations,
			undergroundAnimalPopulations
		})
	);
}
