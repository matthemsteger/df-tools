import {seqMap, alt, regexp} from 'parsimmon';
import {map, flip, curry, compose, always} from 'ramda';

const regexGroupParser = curry(flip(regexp));

const rulerLabels = ['lady', 'lord', 'administrator'];
const rulerNoRaceRegex = / (?:\r\n?|\n)/;
const makeRulerLabelRegex = (label) => new RegExp(`\\t(${label}): `);
const rulerLabelParser = alt(
	...map(compose(regexGroupParser(1), makeRulerLabelRegex), rulerLabels)
);

const nameParser = regexp(/(.+?),/, 1);

const rulerNoRaceParser = map(always(undefined), regexp(rulerNoRaceRegex));
const rulerRaceParser = (rulerRaceCreatureParser) =>
	alt(rulerRaceCreatureParser, rulerNoRaceParser);

export default function siteRulerParser(lang) {
	return seqMap(
		rulerLabelParser,
		nameParser,
		rulerRaceParser(lang.rulerRaceCreatureParser),
		(title, name, race) => ({
			title,
			name,
			race
		})
	);
}
