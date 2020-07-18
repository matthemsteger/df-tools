import {seqMap, alt, regexp, string} from 'parsimmon';
import {map, always} from 'ramda';

const nameParser = string('\tParent Civ: ').then(regexp(/(.+?),/, 1));

const parentCivNoRaceRegex = / (?:\r\n?|\n)/;
const parentCivNoRaceParser = map(
	always(undefined),
	regexp(parentCivNoRaceRegex)
);
const parentCivRaceParser = (parentCivRaceCreatureParser) =>
	alt(parentCivRaceCreatureParser, parentCivNoRaceParser);

export default function siteParentCivParser(lang) {
	return seqMap(
		nameParser,
		parentCivRaceParser(lang.parentCivRaceCreatureParser),
		(parentCivName, parentCivRace) => ({
			parentCivName,
			parentCivRace
		})
	);
}
