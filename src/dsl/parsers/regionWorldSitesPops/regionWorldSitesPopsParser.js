import P from 'parsimmon';
import {spaced, spacedAll} from './../raws/generic';

const civilizedWorldHeaderParser = P.regexp(/Civilized World Population/);

// ideally these are not hardcoded and come out of the raws
const dwarfParser = P.regexp(/(dwarves\b|dwarf\b)/i);
const humanParser = P.regexp(/(humans\b|human\b)/i);
const elfParser = P.regexp(/(elves\b|elf\b)/i);
const goblinParser = P.regexp(/(goblins\b|goblin\b)/i);
const koboldParser = P.regexp(/(kobolds\b|kobold\b)/i);

function civilizationPopulation(parser) {
	return P.seqMap(
		P.digits.thru(spaced),
		parser.true(spaced),
		(population, civName) => ({civName, population})
	);
}

export default function createRegionWorldSitesParser(creatures) {
	// civilized creatures have CAN_LEARN(?) and/or INTELLIGENT (CAN_SPEAK and CAN_LEARN)
	// for now just hard code

	return P.createLanguage({
		file(lang) {
			//
		},
		civilizedWorldPopulation(lang) {
			return P.seqMap(
				civilizedWorldHeaderParser.thru(spaced),
				lang.civilizationPopulation.many(),
				(header, populations) => ({civilizedWorldPopulation: populations})
			);
		},
		civilizationPopulation() {
			const civsParsers = [dwarfParser, humanParser, elfParser, goblinParser, koboldParser].map(civilizationPopulation);
			return P.alt(
				...civsParsers
			);
		}
	});
}
