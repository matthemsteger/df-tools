import {createLanguage} from 'parsimmon';

import file from './file';
import civilizedWorldPopulation from './civilizedWorldPopulation';
import civilizationPopulation from './civilizationPopulation';
import {
	sites,
	site,
	siteInfo,
	siteOwner,
	siteParentCiv,
	siteRuler
} from './sites';
import creaturePopulation from './creaturePopulation';
import {
	outdoorAnimalPopulations,
	undergroundAnimalPopulations
} from './animalPopulations';
import createExactCreatureParserFactory from './exactCreatureParser';

const ownerRaceRegex = /[ ]*(.+)(?:\r\n?|\n)/i;
const parentCivRaceRegex = /[ ]*(.+)(?:\r\n?|\n)/i;
const rulerRaceCreatureRegex = /[ ]*(.+)(?:\r\n?|\n)/i;

export default function createWorldSitesAndPopsParser(creatures) {
	const createExactCreatureParser = createExactCreatureParserFactory(
		creatures
	);
	return createLanguage({
		file,
		civilizedWorldPopulation,
		civilizationPopulation: () => civilizationPopulation(creatures),
		sites,
		site,
		siteInfo,
		siteOwner,
		siteParentCiv,
		siteRuler,
		creaturePopulation,
		outdoorAnimalPopulations,
		undergroundAnimalPopulations,
		exactCreatureParser: () => createExactCreatureParser(),
		ownerRaceCreatureParser: () =>
			createExactCreatureParser(ownerRaceRegex),
		parentCivRaceCreatureParser: () =>
			createExactCreatureParser(parentCivRaceRegex),
		rulerRaceCreatureParser: () =>
			createExactCreatureParser(rulerRaceCreatureRegex)
	});
}
