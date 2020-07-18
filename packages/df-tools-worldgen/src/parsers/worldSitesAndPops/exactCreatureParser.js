import Parsimmon, {makeSuccess, makeFailure} from 'parsimmon';
import {toLower} from 'ramda';

const DEFAULT_EXACT_CREATURE_REGEX = /^(.+)(?:\r\n|\n)/i;
const CREATURE_SITE_STATES = ['outcast', 'prisoner', 'visitor'];
const DEMON_MODIFIERS = [
	'demon',
	'devil',
	'fiend',
	'brute',
	'monster',
	'spirit',
	'ghost',
	'banshee',
	'haunt',
	'phantom',
	'specter',
	'wraith'
];

function makeCreatureMap(creatures) {
	const exactMatches = new Map();

	creatures.forEach((creature) => {
		const {adjectiveName, pluralName, singularName} = creature;
		const result = {creature};

		exactMatches.set(singularName, result);
		exactMatches.set(pluralName, result);
		CREATURE_SITE_STATES.forEach((siteState) => {
			const stateResult = {...result, siteStateModifier: siteState};
			exactMatches.set(`${singularName} ${siteState}`, stateResult);
			exactMatches.set(`${singularName} ${siteState}s`, stateResult);
		});

		DEMON_MODIFIERS.forEach((demonModifier) => {
			const demonResult = {...result, demonModifier};
			exactMatches.set(`${adjectiveName} ${demonModifier}`, demonResult);
			exactMatches.set(`${adjectiveName} ${demonModifier}s`, demonResult);
			exactMatches.set(`${demonModifier} ${singularName}`, demonResult);
			exactMatches.set(`${demonModifier} ${pluralName}`, demonResult);
		});
	});

	return exactMatches;
}

export default function createExactCreatureParserFactory(creatures) {
	const creatureMap = makeCreatureMap(creatures);

	return function createExactCreatureParser(
		regex = DEFAULT_EXACT_CREATURE_REGEX
	) {
		return Parsimmon((input, index) => {
			/**
			 * Get the rest of the line, match the string against the hash
			 * if match, we have parsed and return value is the creature
			 * if not, failure
			 */
			const match = regex.exec(input.slice(index));
			if (match) {
				const creatureMatch = toLower(match[1]);
				const creatureHashMatch = creatureMap.get(creatureMatch);
				if (creatureHashMatch) {
					return makeSuccess(
						index + match[0].length,
						creatureHashMatch
					);
				}
			}

			return makeFailure(index, 'expected creature hash');
		});
	};
}
