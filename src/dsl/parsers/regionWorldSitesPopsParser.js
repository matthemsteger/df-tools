import {Parser, tokenMatcher} from 'chevrotain';
import _ from 'lodash';
import _debug from 'debug';
import * as worldSitesTokens from './../tokens/regionWorldSitesPopsTokens';
import WorldSitesAndPops, {CivilizedWorldPopulation, Site} from './../../model/worldSitesAndPops';

const debug = _debug('df:dsl:parsers:regionWorldSitesPopsParser');

export default class RegionWorldSitesPopsParser extends Parser {
	constructor(tokens, tokenConstructors = []) {
		super(tokens, tokenConstructors);

		this.RULE('parseWorldPopFile', () => {
			const civilizedWorldPopulation = this.SUBRULE(this.civilizedWorldPopulationSection);
			debug('civilizedWorldPopulation is %o', civilizedWorldPopulation);
			const sites = this.SUBRULE(this.sitesSection);
			debug('sites is %o', sites);
			const outdoorAnimalPopulations = this.SUBRULE(this.outdoorAnimalPopSection);
			debug('outdoorAnimalPopulations is %o', outdoorAnimalPopulations);
			const undergroundAnimalPopulations = this.SUBRULE(this.undergroundAnimalPopSection);
			debug('undergroundAnimalPopulations is %o', undergroundAnimalPopulations);

			return new WorldSitesAndPops({
				civilizedWorldPopulation,
				sites,
				outdoorAnimalPopulations,
				undergroundAnimalPopulations
			});
		});

		this.civilizedWorldPopulationSection = this.RULE('civilizedWorldPopulationSection', () => {
			this.CONSUME(worldSitesTokens.CivilizedWorldPopulationHeader);
			const rawCivPops = {};
			this.MANY(() => {
				const pop = this.CONSUME(worldSitesTokens.PopulationNumber);
				let race;
				this.OR([
					{
						ALT: () => {
							this.CONSUME(worldSitesTokens.Dwarf);
							race = 'dwarf';
						}
					},
					{
						ALT: () => {
							this.CONSUME(worldSitesTokens.Human);
							race = 'human';
						}
					},
					{
						ALT: () => {
							this.CONSUME(worldSitesTokens.Elf);
							race = 'elf';
						}
					},
					{
						ALT: () => {
							this.CONSUME(worldSitesTokens.Goblin);
							race = 'goblin';
						}
					},
					{
						ALT: () => {
							this.CONSUME(worldSitesTokens.Kobold);
							race = 'kobold';
						}
					}
				]);

				_.assign(rawCivPops, {[race]: _.parseInt(pop.image)});
			});

			this.CONSUME(worldSitesTokens.TotalLabel);
			const totalToken = this.CONSUME(worldSitesTokens.TotalCivilizedPopulationNumber);
			_.assign(rawCivPops, {total: _.parseInt(totalToken.image)});

			return new CivilizedWorldPopulation(rawCivPops);
		});

		this.sitesSection = this.RULE('sitesSection', () => {
			this.CONSUME(worldSitesTokens.SitesHeader);
			const sites = [];
			this.MANY(() => {
				const site = this.SUBRULE(this.site);
				debug('site is %o', site);
				sites.push(site);
			});

			return sites;
		});

		this.site = this.RULE('site', () => {
			const siteNumberToken = this.CONSUME(worldSitesTokens.SiteNumber);
			debug('siteNumberToken is %o', siteNumberToken);
			const properNameToken = this.CONSUME1(worldSitesTokens.RawText);
			debug('properNameToken is %o', properNameToken);
			this.CONSUME1(worldSitesTokens.Comma);
			this.CONSUME1(worldSitesTokens.DoubleQuotes);
			const nameToken = this.CONSUME2(worldSitesTokens.RawText);
			debug('nameToken is %o', nameToken);
			this.CONSUME2(worldSitesTokens.DoubleQuotes);
			this.CONSUME2(worldSitesTokens.Comma);
			const siteTypeToken = this.CONSUME3(worldSitesTokens.RawText);
			debug('siteType is %o', siteTypeToken);

			const siteOwnership = {};
			this.MANY1({
				GATE() {
					const nextToken = this.LA(1);
					return tokenMatcher(nextToken, worldSitesTokens.OwnerLabel) || tokenMatcher(nextToken, worldSitesTokens.ParentCivLabel) || tokenMatcher(nextToken, worldSitesTokens.SiteRulerLabel);
				},
				DEF: () => {
					this.OR1([
						{
							ALT: () => {
								const owner = this.SUBRULE(this.siteOwner);
								_.assign(siteOwnership, {owner});
							}
						},
						{
							ALT: () => {
								const parentCiv = this.SUBRULE(this.siteParentCiv);
								_.assign(siteOwnership, {parentCiv});
							}
						},
						{
							ALT: () => {
								const ruler = this.SUBRULE(this.siteRuler);
								_.assign(siteOwnership, {ruler});
							}
						}
					]);
				}
			});

			const {owner, parentCiv, ruler} = siteOwnership;
			debug('site owner is %o, parentCiv %o, ruler %o', owner, parentCiv, ruler);

			debug('ready for populations, next token is %o', this.LA(1));
			const populations = {};
			this.MANY2(() => {
				const creaturePopulation = this.CONSUME(worldSitesTokens.PopulationNumber);
				const {creatureName, creatureTypeModifiers, creatureSiteStateModifiers} = this.SUBRULE(this.creatureInfo);
				debug('in site %s there are %d %s with type modifiers %o and states %o', siteNumberToken.image, _.parseInt(creaturePopulation.image), creatureName, creatureTypeModifiers, creatureSiteStateModifiers);

				_.assign(populations, {[creatureName]: _.parseInt(creaturePopulation.image)});
			});

			const siteNumber = _.parseInt(_.trimEnd(siteNumberToken.image, ':'));

			return new Site({
				siteNumber,
				properName: properNameToken.image,
				name: nameToken.image,
				siteType: siteTypeToken.image,
				ownerName: _.get(owner, 'name'),
				ownerRace: _.get(owner, 'race'),
				parentCivName: _.get(parentCiv, 'name'),
				parentCivRace: _.get(parentCiv, 'race'),
				siteRulerName: _.get(ruler, 'name'),
				siteRulerRace: _.get(ruler, 'race'),
				populations
			});
		});

		this.siteOwner = this.RULE('siteOwner', () => {
			this.CONSUME(worldSitesTokens.OwnerLabel);
			const ownerNameToken = this.CONSUME(worldSitesTokens.RawText);
			this.CONSUME(worldSitesTokens.Comma);
			let race;
			this.OPTION(() => {
				const ownerRaceToken = this.CONSUME(worldSitesTokens.CreatureNameToken);
				race = ownerRaceToken.image;
			});

			debug('ownerRace is %o', race);

			return {name: ownerNameToken.image, race};
		});

		this.siteParentCiv = this.RULE('siteParentCiv', () => {
			this.CONSUME(worldSitesTokens.ParentCivLabel);
			const parentCivNameToken = this.CONSUME(worldSitesTokens.RawText);
			this.CONSUME(worldSitesTokens.Comma);
			const parentCivRaceToken = this.CONSUME(worldSitesTokens.CreatureNameToken);
			debug('parentCivRace is %o', parentCivRaceToken);

			return {name: parentCivNameToken.image, race: parentCivRaceToken.image};
		});

		this.siteRuler = this.RULE('siteRuler', () => {
			this.CONSUME(worldSitesTokens.SiteRulerLabel);
			const siteRulerNameToken = this.CONSUME(worldSitesTokens.RawText);
			this.CONSUME(worldSitesTokens.Comma);
			const siteRulerRaceToken = this.CONSUME(worldSitesTokens.CreatureNameToken);
			debug('siteRulerRace is %o', siteRulerRaceToken);

			return {name: siteRulerNameToken.image, race: siteRulerRaceToken.image};
		});

		this.outdoorAnimalPopSection = this.RULE('outdoorAnimalPopSection', () => {
			this.CONSUME(worldSitesTokens.OutdoorAnimalPopulationsHeader);
			const populations = {};
			this.MANY(() => {
				let creaturePopulation;
				this.OR([
					{
						ALT: () => {
							this.CONSUME(worldSitesTokens.PopulationUnnumbered);
							creaturePopulation = Number.NaN;
						}
					},
					{
						ALT: () => {
							const populationToken = this.CONSUME(worldSitesTokens.PopulationNumber);
							creaturePopulation = _.parseInt(populationToken.image);
						}
					}
				]);

				const {creatureName} = this.SUBRULE(this.creatureInfo);

				_.assign(populations, {[creatureName]: creaturePopulation});
			});

			return populations;
		});

		this.undergroundAnimalPopSection = this.RULE('undergroundAnimalPopSection', () => {
			this.CONSUME(worldSitesTokens.UndergroundAnimalPopulationsHeader);
			const populations = {};
			this.MANY(() => {
				let creaturePopulation;
				this.OR([
					{
						ALT: () => {
							this.CONSUME(worldSitesTokens.PopulationUnnumbered);
							creaturePopulation = Number.NaN;
						}
					},
					{
						ALT: () => {
							const populationToken = this.CONSUME(worldSitesTokens.PopulationNumber);
							creaturePopulation = _.parseInt(populationToken.image);
						}
					}
				]);

				const {creatureName} = this.SUBRULE(this.creatureInfo);

				_.assign(populations, {[creatureName]: creaturePopulation});
			});

			return populations;
		});

		this.creatureInfo = this.RULE('creatureInfo', () => {
			const creatureTypeModifiers = [];
			const creatureSiteStateModifiers = [];

			this.OPTION1(() => {
				const creatureTypeToken = this.CONSUME1(worldSitesTokens.CreatureTypeModifier);
				debug('creature type modifier prefix found %s', creatureTypeToken.image);
				creatureTypeModifiers.push(creatureTypeToken.image);
			});

			const creatureToken = this.CONSUME(worldSitesTokens.CreatureNameToken);

			this.OPTION2(() => {
				const creatureTypeToken = this.CONSUME2(worldSitesTokens.CreatureTypeModifier);
				debug('creature type modifier suffix found %s', creatureTypeToken.image);
				creatureTypeModifiers.push(creatureTypeToken.image);
			});

			this.OPTION3(() => {
				const creatureSiteStateToken = this.CONSUME(worldSitesTokens.CreatureSiteState);
				debug('creature site status found %s', creatureSiteStateToken.image);
				creatureSiteStateModifiers.push(creatureSiteStateToken.image);
			});

			return {creatureName: creatureToken.image, creatureTypeModifiers, creatureSiteStateModifiers};
		});

		debug('performing self analysis');
		Parser.performSelfAnalysis(this);
		debug('finished self analysis');
	}
}
