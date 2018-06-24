import createCivilizedWorldPopulation, {
	civilizedPopulation
} from './civilizedWorldPopulation';
import site from './site';

export default function worldSitesAndPops({
	civilizedWorldPopulation,
	sites,
	outdoorAnimalPopulations,
	undergroundAnimalPopulations
} = {}) {
	return {
		civilizedWorldPopulation: createCivilizedWorldPopulation(
			civilizedWorldPopulation
		),
		sites,
		outdoorAnimalPopulations,
		undergroundAnimalPopulations
	};
}

export {
	createCivilizedWorldPopulation as civilizedWorldPopulation,
	civilizedPopulation
};
export {site};
export {default as civRuler} from './civRuler';
