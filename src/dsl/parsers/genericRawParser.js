import {Parser, tokenMatcher} from 'chevrotain';
import _ from 'lodash';
import _debug from 'debug';
import {Comment, TokenOpen, TokenArgSeperator, TokenArgument, TokenClose} from './../tokens/languageTokens';
import {BaseRawToken, ObjectToken, BodyDetailPlan, Body, BuildingWorkshop, CreatureVariation, Creature, Color, ColorPattern, Shape, Entity, Inorganic, Interaction, ItemAmmo, ItemArmor, ItemFood, ItemGloves, ItemHelm, ItemPants, ItemShield, ItemShoes, ItemSiegeammo, ItemTool, ItemToy, ItemTrapcomp, ItemWeapon, Translation, SymbolToken, Word, MaterialTemplate, Plant, Reaction, TissueTemplate} from './../tokens/rawTokens';
import DwarfFortressToken from './../../model/dwarfFortressToken';

const debug = _debug('df:dsl:parsers:genericRawParser');

export default class BaseRawParser extends Parser {
	constructor(tokens, tokenConstructors = []) {
		const filteredTokens = _.reject(tokens, (token, idx) => tokenMatcher(token, Comment) && idx !== 0);
		super(filteredTokens, tokenConstructors);

		this.rawParseResult = {};

		this.RULE('rawFile', () => {
			const fileLabel = this.SUBRULE(this.fileLabel);
			this.rawParseResult.fileLabel = fileLabel;
			const objectType = this.SUBRULE(this.objectType);
			this.rawParseResult.objectType = objectType;
			const rawObjects = this.SUBRULE(this.rawObjects);
			this.rawParseResult.rawObjects = rawObjects;

			return {
				fileLabel,
				objectType,
				rawObjects
			};
		});

		this.fileLabel = this.RULE('fileLabel', () => {
			debug('in fileLabel rule');
			const fileLabel = this.CONSUME(Comment);
			return fileLabel;
		});

		this.objectType = this.RULE('objectType', () => {
			this.CONSUME(TokenOpen);
			const nameTag = this.CONSUME(ObjectToken);
			this.CONSUME(TokenArgSeperator);
			const arg = this.CONSUME(TokenArgument);
			this.CONSUME(TokenClose);

			return DwarfFortressToken.fromParsedTokens(nameTag, [arg]);
		});

		this.rawObjects = this.RULE('rawObjects', () => {
			const rawObjects = [];
			this.MANY(() => {
				const rawObject = this.SUBRULE(this.rawObject);
				rawObjects.push(rawObject);
			});

			return rawObjects;
		});

		this.rawObject = this.RULE('rawObject', () => {
			const objectTag = this.SUBRULE(this.objectTag);
			const childTags = [];
			this.MANY({
				GATE() {
					// if the next token is one of the objectType tokens, then we dont want to gobble it up
					let tokenCount = 1;
					let nextToken = this.LA(tokenCount);
					while (nextToken && (nextToken.image === '[' || tokenMatcher(nextToken, Comment) === true)) {
						tokenCount += 1;
						nextToken = this.LA(tokenCount);
					}

					return nextToken && nextToken.image !== 'CREATURE';
				},
				DEF: () => {
					const childTag = this.SUBRULE(this.objectChildTag);
					childTags.push(childTag);
				}
			});

			return {
				objectTag,
				childTags
			};
		});

		this.objectTag = this.RULE('objectTag', () => {
			this.CONSUME(TokenOpen);

			let objectType = {};
			this.OR([
				{
					ALT: () => {
						objectType = this.CONSUME(BodyDetailPlan);
					}
				},
				{
					ALT: () => {
						objectType = this.CONSUME(Body);
					}
				},
				{
					ALT: () => {
						objectType = this.CONSUME(BuildingWorkshop);
					}
				},
				{
					ALT: () => {
						objectType = this.CONSUME(CreatureVariation);
					}
				},
				{
					ALT: () => {
						objectType = this.CONSUME(Creature);
					}
				},
				{
					ALT: () => {
						objectType = this.CONSUME(Color);
					}
				},
				{
					ALT: () => {
						objectType = this.CONSUME(ColorPattern);
					}
				},
				{
					ALT: () => {
						objectType = this.CONSUME(Shape);
					}
				},
				{
					ALT: () => {
						objectType = this.CONSUME(Entity);
					}
				},
				{
					ALT: () => {
						objectType = this.CONSUME(Inorganic);
					}
				},
				{
					ALT: () => {
						objectType = this.CONSUME(Interaction);
					}
				},
				{
					ALT: () => {
						objectType = this.CONSUME(ItemAmmo);
					}
				},
				{
					ALT: () => {
						objectType = this.CONSUME(ItemArmor);
					}
				},
				{
					ALT: () => {
						objectType = this.CONSUME(ItemFood);
					}
				},
				{
					ALT: () => {
						objectType = this.CONSUME(ItemGloves);
					}
				},
				{
					ALT: () => {
						objectType = this.CONSUME(ItemHelm);
					}
				},
				{
					ALT: () => {
						objectType = this.CONSUME(ItemPants);
					}
				},
				{
					ALT: () => {
						objectType = this.CONSUME(ItemShield);
					}
				},
				{
					ALT: () => {
						objectType = this.CONSUME(ItemShoes);
					}
				},
				{
					ALT: () => {
						objectType = this.CONSUME(ItemSiegeammo);
					}
				},
				{
					ALT: () => {
						objectType = this.CONSUME(ItemTool);
					}
				},
				{
					ALT: () => {
						objectType = this.CONSUME(ItemToy);
					}
				},
				{
					ALT: () => {
						objectType = this.CONSUME(ItemTrapcomp);
					}
				},
				{
					ALT: () => {
						objectType = this.CONSUME(ItemWeapon);
					}
				},
				{
					ALT: () => {
						objectType = this.CONSUME(Translation);
					}
				},
				{
					ALT: () => {
						objectType = this.CONSUME(SymbolToken);
					}
				},
				{
					ALT: () => {
						objectType = this.CONSUME(Word);
					}
				},
				{
					ALT: () => {
						objectType = this.CONSUME(MaterialTemplate);
					}
				},
				{
					ALT: () => {
						objectType = this.CONSUME(Plant);
					}
				},
				{
					ALT: () => {
						objectType = this.CONSUME(Reaction);
					}
				},
				{
					ALT: () => {
						objectType = this.CONSUME(TissueTemplate);
					}
				}
			]);
			this.CONSUME(TokenArgSeperator);
			const objectName = this.CONSUME(TokenArgument);
			this.CONSUME(TokenClose);

			return DwarfFortressToken.fromParsedTokens(objectType, [objectName]);
		});

		this.objectChildTag = this.RULE('objectChildTag', () => {
			this.CONSUME(TokenOpen);
			const nameToken = this.CONSUME(BaseRawToken);
			const args = [];
			this.MANY(() => {
				this.CONSUME(TokenArgSeperator);
				const arg = this.CONSUME(TokenArgument);
				args.push(arg);
			});

			this.CONSUME(TokenClose);

			return DwarfFortressToken.fromParsedTokens(nameToken, args);
		});

		debug('before self analysis');
		Parser.performSelfAnalysis(this);
		debug('after self analysis');
	}
}
