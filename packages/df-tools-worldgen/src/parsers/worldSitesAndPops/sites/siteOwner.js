import {seqMap, alt, regexp, string} from 'parsimmon';
import {map, always} from 'ramda';

const nameParser = string('\tOwner: ').then(regexp(/(.+),/, 1));

const ownerNoRaceRegex = / (?:\r\n?|\n)/;

const ownerNoRaceParser = map(always(undefined), regexp(ownerNoRaceRegex));
const ownerRaceParser = (ownerRaceCreatureParser) =>
	alt(ownerRaceCreatureParser, ownerNoRaceParser);

export default function siteOwnerParser(lang) {
	return seqMap(
		nameParser,
		ownerRaceParser(lang.ownerRaceCreatureParser),
		(ownerName, ownerRace) => ({
			ownerName,
			ownerRace
		})
	);
}
