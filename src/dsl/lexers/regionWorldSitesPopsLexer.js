import _ from 'lodash';
import {Lexer} from 'chevrotain';
import _debug from 'debug';
import * as worldSitesTokens from './../tokens/regionWorldSitesPopsTokens';

const debug = _debug('df:dsl:regionWorldSitesPopsLexer');

function createTokenHierarchyCheckIterator(baseTokenConstructor) {
	return function checkHierarchy(tokenConstructor) {
		return Object.prototype.isPrototypeOf.call(
			baseTokenConstructor,
			tokenConstructor
		);
	};
}

// this is edited to not do the creature names

/*
_.chain(rawTokens)
			.map((tokenClass, key) => ({key, tokenClass}))
			.orderBy(['key'], ['desc'])
			.map('tokenClass')
			.value();

 */

const creatureNameTokens = _.chain(worldSitesTokens)
	.map((tokenClass, key) => ({key, tokenClass}))
	.orderBy(['key'], ['desc'])
	.map('tokenClass')
	.filter(
		createTokenHierarchyCheckIterator(worldSitesTokens.CreatureNameToken)
	)
	.value();

// const demonIdx = creatureNameTokens.indexOf(worldSitesTokens.DemonCreature);
const exoticDemonIdx = creatureNameTokens.indexOf(worldSitesTokens.ExoticDemon);
creatureNameTokens.splice(exoticDemonIdx, 1);

const otherWorldlyCreatureIdx = creatureNameTokens.indexOf(
	worldSitesTokens.OtherWorldlyCreature
);
creatureNameTokens.splice(otherWorldlyCreatureIdx, 1);
// creatureNameTokens.push(worldSitesTokens.DemonCreature);
// creatureNameTokens.push(worldSitesTokens.OtherWorldlyCreature);

debug('using %d creature name tokens', creatureNameTokens.length);
const siteRulerLabels = _.filter(
	_.values(worldSitesTokens),
	createTokenHierarchyCheckIterator(worldSitesTokens.SiteRulerLabel)
);
debug('using %d site ruler labels', siteRulerLabels.length);

const creatureSiteStates = _.filter(
	_.values(worldSitesTokens),
	createTokenHierarchyCheckIterator(worldSitesTokens.CreatureSiteState)
);
const creatureTypeModifiers = _.filter(
	_.values(worldSitesTokens),
	createTokenHierarchyCheckIterator(worldSitesTokens.CreatureTypeModifier)
);
// debug('creatureTypeModifiers is %o', creatureTypeModifiers);

export const modes = {
	CIVILIZED_POPS: 'civilized_pops',
	CIVILIZED_POPS_TOTAL: 'civilized_pops_total',
	OUTSIDE: 'outside',
	POP_COUNT: 'pop_count',
	SITE_ATTRIBUTES: 'site_attributes',
	SITE_NAME: 'site_name',
	SITE_ATTRIBUTE_NAME: 'site_attribute_name'
};

worldSitesTokens.WhiteSpace.GROUP = Lexer.SKIPPED;
worldSitesTokens.WhiteSpaceNoNewLine.GROUP = Lexer.SKIPPED;
worldSitesTokens.CivilizedWorldPopulationHeader.PUSH_MODE =
	modes.CIVILIZED_POPS;
worldSitesTokens.TotalLabel.PUSH_MODE = modes.CIVILIZED_POPS_TOTAL;
worldSitesTokens.TotalCivilizedPopulationNumber.POP_MODE = true;
worldSitesTokens.SitesHeader.POP_MODE = true;
worldSitesTokens.PopulationNumber.PUSH_MODE = modes.POP_COUNT;
worldSitesTokens.PopulationUnnumbered.PUSH_MODE = modes.POP_COUNT;
worldSitesTokens.PopsCountNewLine.POP_MODE = true;
worldSitesTokens.PopsCountNewLine.GROUP = Lexer.SKIPPED;
worldSitesTokens.OwnerLabel.PUSH_MODE = modes.SITE_ATTRIBUTES;
worldSitesTokens.ParentCivLabel.PUSH_MODE = modes.SITE_ATTRIBUTES;
worldSitesTokens.SiteRulerLabel.PUSH_MODE = modes.SITE_ATTRIBUTES;
worldSitesTokens.SiteAttributesComma.POP_MODE = true;
worldSitesTokens.SiteNumber.PUSH_MODE = modes.SITE_NAME;
worldSitesTokens.SiteNameNewLine.POP_MODE = true;
worldSitesTokens.SiteNameNewLine.GROUP = Lexer.SKIPPED;
worldSitesTokens.SiteAttributesSemiColon.PUSH_MODE = modes.SITE_ATTRIBUTE_NAME;
worldSitesTokens.SiteAttributesSemiColon.GROUP = Lexer.SKIPPED;
worldSitesTokens.SiteAttributesNewLine.POP_MODE = true;
worldSitesTokens.SiteAttributesNewLine.GROUP = Lexer.SKIPPED;

/*
TokenOpen.PUSH_MODE = modes.INSIDE;
TokenClose.POP_MODE = true;
TokenArgSeperator.PUSH_MODE = modes.INSIDE_ARGS;
TokenArgument.POP_MODE = true;
WhiteSpace.GROUP = Lexer.SKIPPED;
 */

// start outside
// when hit civ pop label, push into civ pops (civ pops allows pop#s, total label, sites header)
// when hit sites label, pop
// when hit a population number or unnumbered, push into pop count
// when hit a creature or unknown creature pop
// also could have creatures, status
//
// for sites after site number, push to site name mode (site name mode has raw text)
// when hit a new line in site name mode, then pop (goes to outside)
// when hit Owner/Parent Civ/ruler label, push into site attributes
// when hit : in site attributes push into attribute name mode
// when comma, pop (goes to site attributes)
// site attributes allows whitespace and creatures
// when hits new line, pops (goes to outside)
//
// add a demon modifier to population count, will pick up extra demon words, not picked up by creature (which comes first)
// warthog fiend -> gets modifier
// gila monster -> creature first, no modifier
//
// exotic demons -> last rule is any creature name with the demon strings in it
// gila monster -> won't hit because gila monster rule \b
// warthog fiend -> warthog +demon modifier
// silty clay demons -> will hit
// brutes fo clear diamon -> will hit
//
// catch all is other worldly creature -> narrow these down brute force later

export function createLexerDefinition() {
	return {
		defaultMode: modes.OUTSIDE,
		modes: {
			[modes.OUTSIDE]: [
				worldSitesTokens.WhiteSpace,
				worldSitesTokens.CivilizedWorldPopulationHeader,
				worldSitesTokens.OutdoorAnimalPopulationsHeader,
				worldSitesTokens.UndergroundAnimalPopulationsHeader,
				worldSitesTokens.SiteNumber,
				worldSitesTokens.OwnerLabel,
				worldSitesTokens.ParentCivLabel,
				...siteRulerLabels,
				worldSitesTokens.SiteRulerLabel,
				worldSitesTokens.PopulationNumber,
				worldSitesTokens.PopulationUnnumbered
			],
			[modes.CIVILIZED_POPS]: [
				worldSitesTokens.WhiteSpace,
				worldSitesTokens.SitesHeader,
				worldSitesTokens.PopulationNumber,
				worldSitesTokens.TotalLabel
			],
			[modes.CIVILIZED_POPS_TOTAL]: [
				worldSitesTokens.WhiteSpace,
				worldSitesTokens.TotalCivilizedPopulationNumber
			],
			[modes.POP_COUNT]: [
				worldSitesTokens.PopsCountNewLine,
				worldSitesTokens.WhiteSpace,
				worldSitesTokens.CreatureNameToken,
				...creatureNameTokens,
				worldSitesTokens.CreatureSiteState,
				...creatureSiteStates,
				worldSitesTokens.CreatureTypeModifier,
				...creatureTypeModifiers,
				worldSitesTokens.OtherWorldlyCreature
			],
			[modes.SITE_ATTRIBUTES]: [
				worldSitesTokens.SiteAttributesNewLine,
				worldSitesTokens.WhiteSpaceNoNewLine,
				worldSitesTokens.SemiColon,
				worldSitesTokens.SiteAttributesSemiColon,
				worldSitesTokens.CreatureNameToken,
				...creatureNameTokens
			],
			[modes.SITE_NAME]: [
				worldSitesTokens.SiteNameNewLine,
				worldSitesTokens.WhiteSpace,
				worldSitesTokens.Comma,
				worldSitesTokens.CommonComma,
				worldSitesTokens.DoubleQuotes,
				worldSitesTokens.RawText
			],
			[modes.SITE_ATTRIBUTE_NAME]: [
				worldSitesTokens.WhiteSpace,
				worldSitesTokens.SiteAttributesComma,
				worldSitesTokens.RawText
			]
		}
	};
}

// any raw text is last, raw text does not include comma or double quotes
// raw number after site number
// unnumbered
// comma
// double quotes
// owner labels
// site ruler labels
// creature name tokens
/*
const basicDef = [
	WhiteSpace,
	worldSitesTokens.CivilizedWorldPopulationHeader,
	worldSitesTokens.SitesHeader,
	worldSitesTokens.OutdoorAnimalPopulationsHeader,
	worldSitesTokens.UndergroundAnimalPopulationsHeader,
	worldSitesTokens.SiteNumber,
	worldSitesTokens.PopulationNumber,
	worldSitesTokens.PopulationUnnumbered,
	worldSitesTokens.TotalLabel,
	worldSitesTokens.Comma,
	worldSitesTokens.DoubleQuotes,
	worldSitesTokens.OwnerLabel,
	worldSitesTokens.ParentCivLabel,
	...siteRulerLabels,
	worldSitesTokens.SiteRulerLabel,
	worldSitesTokens.CreatureNameToken,
	...creatureNameTokens,
	worldSitesTokens.RawText
];

debug('basic def has %d token defs', basicDef.length);
*/

export default class RegionWorldSitesPopsLexer extends Lexer {
	constructor() {
		const def = createLexerDefinition();
		super(def, {debug: true});

		this.allTokens = _.chain(def.modes).flatMap().uniq().value();
	}
}
