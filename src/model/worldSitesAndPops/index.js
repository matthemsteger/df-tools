import CivilizedWorldPopulation from './civilizedWorldPopulation';
import Site from './site';

export default class WorldSitesAndPops {
	constructor({civilizedWorldPopulation, sites, outdoorAnimalPopulations, undergroundAnimalPopulations} = {}) {
		this.civilizedWorldPopulation = civilizedWorldPopulation || new CivilizedWorldPopulation();
		this.sites = sites;
		this.outdoorAnimalPopulations = outdoorAnimalPopulations;
		this.undergroundAnimalPopulations = undergroundAnimalPopulations;
	}
}

export {CivilizedWorldPopulation};
export {Site};
