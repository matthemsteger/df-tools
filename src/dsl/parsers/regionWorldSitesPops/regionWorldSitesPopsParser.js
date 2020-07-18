import P from 'parsimmon';
import R from 'ramda';
import _ from 'lodash';
import _debug from 'debug';
import worldSitesAndPops, {
	civRuler,
	site,
	civilizedPopulation,
	civilizedWorldPopulation as createCivilizedWorldPopulation
} from './../../../model/worldSitesAndPops';

const debug = _debug(
	'df:dsl:parsers:regionWorldSitesPops:regionWorldSitesPopsParser'
);

const findById = R.curry((id, list) => R.find(R.propEq('id', id), list));
const makeRegexOr = R.compose(R.join('|'), R.sort(R.descend));

// ideally these are not hardcoded and come out of the raws
const civilizedCreatures = ['DWARF', 'HUMAN', 'ELF', 'GOBLIN', 'KOBOLD'];
const rulerLabels = ['lady', 'lord', 'administrator'];
const creatureSiteStates = ['outcast', 'prisoner', 'visitor'];
const demonModifiers = [
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
const demonModifiersRegexOr = makeRegexOr(
	demonModifiers.map((modifier) => `${modifier}s?`)
);

const forgottenBeastCreature = {
	id: 'GENERATED_FORGOTTEN_BEAST',
	singularName: 'forgotten beast',
	isGenerated: true
};
const makeOtherWorldlyCreature = (generatedName) => ({
	creature: {
		id: `GENERATED_${R.compose(R.toUpper, _.snakeCase)(generatedName)}`,
		isGenerated: true,
		generatedName
	}
});
const exactCreatureDefaultRegex = /^(.+)(?:\r\n|\n)/i;

function makeCivilizationPopulationParser(parser) {
	return P.seqMap(
		P.digits.trim(P.optWhitespace),
		parser.trim(P.optWhitespace),
		(population, civName) => ({civName, population})
	);
}

function makeCreature({creature, demonModifier, siteStateModifier}) {
	return {
		creatureId: creature.id,
		name: creature.singularName,
		demonModifier,
		siteStateModifier
	};
}

function makeLineRegexParser(str, captureGroup = 1) {
	return P.regexp(new RegExp(`(${str})(?:\\r\\n?|\\n)`), captureGroup);
}

// all creatures, even generated ones, can be sitestate
// makeParseableCreature -> adds parsing info
// array of parsers, {parseString, parser} sorted by order, largest strings first
//
// probably want to go in order of probability
// -> regular animals
// -> outcasts
// -> demon animals
// -> other
// order doesnt matter anymore since we are looking for exact matches

function makeCreaturePopulationParser(creature) {
	const {adjectiveName, pluralName, singularName} = creature;
	const singularOrPlural = makeRegexOr([singularName, pluralName]);
	const exactMatches = new Map();

	const result = {creature};

	const normalParser = makeLineRegexParser(singularOrPlural).map(
		R.always(result)
	);
	exactMatches.set(singularName, result);
	exactMatches.set(pluralName, result);

	const stateParsers = creatureSiteStates.map((state) => {
		const stateResult = {...result, siteStateModifier: state};
		exactMatches.set(`${singularName} ${state}`, stateResult);
		exactMatches.set(`${singularName} ${state}s`, stateResult);
		return makeLineRegexParser(`${singularName} ${state}s?`).map(
			R.always(stateResult)
		);
	});

	const demonParsers = [
		P.regexp(
			new RegExp(
				`(${demonModifiersRegexOr}) (${singularOrPlural})(?:\\r\\n?|\\n)`
			),
			1
		).map((demonModifier) => ({...result, demonModifier})),
		P.regexp(
			new RegExp(
				`${adjectiveName} (${demonModifiersRegexOr})(?:\\r\\n?|\\n)`
			),
			1
		).map((demonModifier) => ({...result, demonModifier}))
	];

	demonModifiers.forEach((demonModifier) => {
		const demonResult = {...result, demonModifier};
		exactMatches.set(`${adjectiveName} ${demonModifier}`, demonResult);
		exactMatches.set(`${adjectiveName} ${demonModifier}s`, demonResult);
		[singularName, pluralName].forEach((name) => {
			exactMatches.set(`${demonModifier} ${name}`, demonResult);
		});
	});

	return {
		creature,
		normalParser,
		siteStateParsers: stateParsers,
		demonParsers,
		exactMatches
	};
}

export default function createRegionWorldSitesParser(creatures) {
	debug(
		'creating region world sites parser with %d creatures defined',
		creatures.length
	);
	// civilized creatures have CAN_LEARN(?) and/or INTELLIGENT (CAN_SPEAK and CAN_LEARN)
	// for now just hard code
	const creatureParsers = R.map(makeCreaturePopulationParser, creatures);
	const creatureMap = creatureParsers.reduce((acc, creatureParser) => {
		const {exactMatches} = creatureParser;
		return new Map([...acc, ...exactMatches]);
	}, new Map());

	/**
	 * A parser that gets the rest of the line input and looks for that EXACT
	 * string in a hash of all possible exact creature matches
	 */
	function exactCreature(re = exactCreatureDefaultRegex) {
		return P((input, i) => {
			// get the rest of the line
			// match that string against the hash
			// if match, then we have parsed, return value is creature
			// if not, failure
			const match = re.exec(input.slice(i));
			if (match) {
				const creatureMatch = R.toLower(match[1]);
				const creatureHashMatch = creatureMap.get(creatureMatch);
				if (creatureHashMatch) {
					return P.makeSuccess(
						i + match[0].length,
						creatureHashMatch
					);
				}
			}

			return P.makeFailure(i, 'expected creature hash');
		});
	}

	return P.createLanguage({
		file(lang) {
			return P.seqMap(
				lang.civilizedWorldPopulation,
				lang.sites,
				lang.outdoorAnimalPopulations,
				lang.undergroundAnimalPopulations,
				(
					civilizedWorldPopulation,
					sites,
					outdoorAnimalPopulations,
					undergroundAnimalPopulations
				) =>
					worldSitesAndPops({
						civilizedWorldPopulation,
						sites,
						outdoorAnimalPopulations,
						undergroundAnimalPopulations
					})
			);
		},
		civilizedWorldPopulation(lang) {
			return P.seqMap(
				P.regexp(/Civilized World Population(?:\r\n?|\n)+/)
					.then(lang.creaturePopulation.many())
					.trim(P.optWhitespace),
				P.string('Total:').then(P.digits.trim(P.optWhitespace)),
				(populations, total) => {
					const civilizedPopulations = populations.map(
						({creature, population}) =>
							civilizedPopulation({race: creature, population})
					);
					return createCivilizedWorldPopulation({
						civilizedPopulations,
						total
					});
				}
			);
		},
		civilizationPopulation() {
			const civNameParsers = R.compose(
				R.map((creature) =>
					P.string(_.upperFirst(creature.pluralName))
				),
				R.map(R.flip(findById)(creatures))
			)(civilizedCreatures);
			const civsParsers = civNameParsers.map(
				makeCivilizationPopulationParser
			);

			return P.alt(...civsParsers);
		},
		sites(lang) {
			return P.string('Sites')
				.trim(P.optWhitespace)
				.then(lang.site.many());
		},
		site(lang) {
			return P.seqMap(
				lang.siteInfo,
				lang.siteOwner.many(),
				lang.siteParentCiv.many(),
				lang.siteRuler.many(),
				lang.creaturePopulation.many(),
				(
					{siteNumber, name, friendlyName, siteType},
					siteOwners,
					siteParentCivs,
					siteRulers,
					populations
				) =>
					site({
						siteNumber,
						name,
						friendlyName,
						siteType,
						ownerName: R.path(['0', 'ownerName'], siteOwners),
						ownerRace: R.path(['0', 'ownerRace'], siteOwners),
						parentCivName: R.path(
							['0', 'parentCivName'],
							siteParentCivs
						),
						parentCivRace: R.path(
							['0', 'parentCivRace'],
							siteParentCivs
						),
						siteRulers,
						populations
					})
			);
		},
		siteInfo() {
			return P.seqMap(
				P.digits,
				P.string(': ').then(P.regexp(/(.+?),/, 1)),
				P.regexp(/"(.+?)",/, 1).trim(P.optWhitespace),
				P.regexp(/(.+)(?:\r\n?|\n)/, 1),
				(siteNumber, name, friendlyName, siteType) => ({
					siteNumber,
					name,
					friendlyName,
					siteType
				})
			);
		},
		siteOwner() {
			return P.seqMap(
				P.string('\tOwner: ').then(P.regexp(/(.+),/, 1)),
				P.alt(
					exactCreature(/[ ]*(.+)(?:\r\n?|\n)/i),
					P.regexp(/ (?:\r\n?|\n)/).map(R.always(undefined))
				),
				// P.regexp(/[ ]*(.+)(?:\r\n?|\n)/, 1),
				(ownerName, ownerRace) => ({
					ownerName,
					ownerRace
				})
			);
		},
		siteParentCiv() {
			return P.seqMap(
				P.string('\tParent Civ: ').then(P.regexp(/(.+?),/, 1)),
				P.alt(
					exactCreature(/[ ]*(.+)(?:\r\n?|\n)/i),
					P.regexp(/ (?:\r\n?|\n)/).map(R.always(undefined))
				),
				// P.regexp(/[ ]*(.+)(?:\r\n?|\n)/, 1),
				(parentCivName, parentCivRace) => ({
					parentCivName,
					parentCivRace
				})
			);
		},
		siteRuler() {
			// lady, lord, administrator
			return P.seqMap(
				P.alt(
					...rulerLabels.map((label) =>
						P.regexp(new RegExp(`\\t(${label}): `), 1)
					)
				),
				P.regexp(/(.+?),/, 1),
				P.alt(
					exactCreature(/[ ]*(.+)(?:\r\n?|\n)/i),
					P.regexp(/ (?:\r\n?|\n)/).map(R.always(undefined))
				),
				// P.regexp(/[ ]*(.+)(?:\r\n?|\n)/, 1),
				(title, name, race) =>
					civRuler({
						title,
						name,
						race
					})
			);
		},
		creaturePopulation() {
			return P.seqMap(
				P.regexp(/\t(\d+|Unnumbered) /, 1).map((popNumber) =>
					popNumber === 'Unnumbered'
						? Number.NaN
						: Number.parseInt(popNumber, 10)
				),
				P.alt(
					exactCreature(),
					P.regexp(/(forgotten beasts?)(?:\r\n?|\n)/i).map(
						R.always(
							makeCreature({
								creature: forgottenBeastCreature
							})
						)
					),
					P.regexp(/(.+)(?:\r\n?|\n)/, 1).map(
						makeOtherWorldlyCreature
					)
				),
				(population, creature) => ({
					population,
					...creature
				})
			);
		},
		outdoorAnimalPopulations(lang) {
			return P.regexp(
				/Outdoor Animal Populations \(Including Undead\)(?:\r\n?|\n)/
			)
				.then(lang.creaturePopulation.many())
				.trim(P.optWhitespace);
		},
		undergroundAnimalPopulations(lang) {
			return P.regexp(
				/Underground Animal Populations \(Including Undead\)(?:\r\n?|\n)/
			)
				.then(lang.creaturePopulation.many())
				.trim(P.optWhitespace);
		}
	});
}
