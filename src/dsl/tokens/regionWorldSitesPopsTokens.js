import {Token, Lexer} from 'chevrotain';

export class WhiteSpace extends Token {
	static PATTERN = /\s+/;
}

export class WhiteSpaceNoNewLine extends Token {
	static PATTERN = /[\t\f\v ]+/;
}

export class NewLine extends Token {
	static PATTERN = Lexer.NA;
}

export class CommonNewLine extends NewLine {
	static PATTERN = /[\r\n]+/;
}

export class PopsCountNewLine extends NewLine {
	static PATTERN = /[\r\n]+/;
}

export class SiteNameNewLine extends NewLine {
	static PATTERN = /[\r\n]+/;
}

export class SiteAttributesNewLine extends NewLine {
	static PATTERN = /[\r\n]+/;
}

export class CivilizedWorldPopulationHeader extends Token {
	static PATTERN = /Civilized World Population/;
}

export class SitesHeader extends Token {
	static PATTERN = /Sites/;
}

export class OutdoorAnimalPopulationsHeader extends Token {
	static PATTERN = /Outdoor Animal Populations \(Including Undead\)/;
}

export class UndergroundAnimalPopulationsHeader extends Token {
	static PATTERN = /Underground Animal Populations \(Including Undead\)/;
}

export class TotalCivilizedPopulationNumber extends Token {
	static PATTERN = /\d+/;
}

export class PopulationNumber extends Token {
	static PATTERN = /\d+/;
}

export class TotalLabel extends Token {
	static PATTERN = /Total:/;
}

export class SiteNumber extends Token {
	static PATTERN = /\d+:/;
}

export class Comma extends Token {
	static PATTERN = Lexer.NA;
}

export class CommonComma extends Comma {
	static PATTERN = /,/;
}

export class SiteAttributesComma extends Comma {
	static PATTERN = /,/;
}

export class DoubleQuotes extends Token {
	static PATTERN = /"/;
}

export class RawText extends Token {
	static PATTERN = /[^,"\t\n\r\0]*/;
}

export class LabelSeparator extends Token {
	static PATTERN = /:/;
}

export class SiteName extends Token {
	static PATTERN = /[^,"]*/;
}

export class SiteNameSeparator extends Token {
	static PATTERN = /,/;
}

export class SiteCommonNameQuotes extends Token {
	static PATTERN = /"/;
}

export class Tab extends Token {
	static PATTERN = /\t/;
}

export class SemiColon extends Token {
	static PATTERN = Lexer.NA;
}

export class CommonSemiColon extends SemiColon {
	static PATTERN = /:/;
}

export class SiteAttributesSemiColon extends SemiColon {
	static PATTERN = /:/;
}

export class OwnerLabel extends Token {
	static PATTERN = /Owner/;
}

export class ParentCivLabel extends Token {
	static PATTERN = /Parent Civ/;
}

export class SiteLabelText extends Token {
	static PATTERN = /[^,]*/;
}

export class SiteLabelSeparator extends Token {
	static PATTERN = /,/;
}

export class SiteRulerLabel extends Token {
	static PATTERN = Lexer.NA;
}

export class SiteRulerLordLabel extends SiteRulerLabel {
	static PATTERN = /lord/;
}

export class SiteRulerLadyLabel extends SiteRulerLabel {
	static PATTERN = /lady/;
}

export class SiteRulerAdministratorLabel extends SiteRulerLabel {
	static PATTERN = /administrator/;
}

export class PopulationUnnumbered extends Token {
	static PATTERN = /Unnumbered/;
}

// Creature Site States

export class CreatureSiteState extends Token {
	static PATTERN = Lexer.NA;
}

export class Outcast extends CreatureSiteState {
	static PATTERN = /(outcasts|outcast)/;
}

export class Visitor extends CreatureSiteState {
	static PATTERN = /(visitors|visitor)/;
}

export class Prisoner extends CreatureSiteState {
	static PATTERN = /(prisoners|prisoner)/;
}

// creature type modifiers

export class CreatureTypeModifier extends Token {
	static PATTERN = Lexer.NA;
}

export class DemonCreatureType extends CreatureTypeModifier {
	static PATTERN = Lexer.NA;
}

export class Demon extends DemonCreatureType {
	static PATTERN = /demons?/;
}

export class Devil extends DemonCreatureType {
	static PATTERN = /devils?/;
}

export class Fiend extends DemonCreatureType {
	static PATTERN = /fiends?/;
}

export class Brute extends DemonCreatureType {
	static PATTERN = /brutes?/;
}

export class Monster extends DemonCreatureType {
	static PATTERN = /monsters?/;
}

export class Spirit extends DemonCreatureType {
	static PATTERN = /spirits?/;
}

export class Ghost extends DemonCreatureType {
	static PATTERN = /ghosts?/;
}

export class Banshee extends DemonCreatureType {
	static PATTERN = /banshees?/;
}

export class Haunt extends DemonCreatureType {
	static PATTERN = /haunts?/;
}

export class Phantom extends DemonCreatureType {
	static PATTERN = /phantoms?/;
}

export class Specter extends DemonCreatureType {
	static PATTERN = /specters?/;
}

export class Wraith extends DemonCreatureType {
	static PATTERN = /wraiths?/;
}

// Creature Name Tokens

export class CreatureNameToken extends Token {
	static PATTERN = Lexer.NA;
}

// creatures not in the raws

export class ForgottenBeast extends CreatureNameToken {
	static PATTERN = /forgotten beast/i;
}

export class OtherWorldlyCreature extends CreatureNameToken {
	static PATTERN = /[^,"\t\n\r\0]*/;
}

// needs to be giant or .. either a word before demon
export class ExoticDemon extends CreatureNameToken {
	static PATTERN = /((demons?|devils?|fiends?|brutes?|monsters?|spirits?|ghosts?|banshees?|haunts?|phantoms?|specters?|wraiths?)[^\r\n\t\f\v ]+|[^\r\n\t\f\v ]+(demons?|devils?|fiends?|brutes?|monsters?|spirits?|ghosts?|banshees?|haunts?|phantoms?|specters?|wraiths?))/;
}

// generic creatures that are in the raws

export class Yeti extends CreatureNameToken {
	static PATTERN = /(yetis\b|yeti\b)/i;
}

export class YellowBullhead extends CreatureNameToken {
	static PATTERN = /(yellow bullheads\b|yellow bullhead\b)/i;
}

export class Yak extends CreatureNameToken {
	static PATTERN = /(yaks\b|yak\b)/i;
}

export class WrenMan extends CreatureNameToken {
	static PATTERN = /(wren men\b|wren man\b)/i;
}

export class Wren extends CreatureNameToken {
	static PATTERN = /(wrens\b|wren\b)/i;
}

export class WormMan extends CreatureNameToken {
	static PATTERN = /(worm men\b|worm man\b)/i;
}

export class Worm extends CreatureNameToken {
	static PATTERN = /(worms\b|worm\b)/i;
}

export class WombatMan extends CreatureNameToken {
	static PATTERN = /(wombat men\b|wombat man\b)/i;
}

export class Wombat extends CreatureNameToken {
	static PATTERN = /(wombats\b|wombat\b)/i;
}

export class WolverineMan extends CreatureNameToken {
	static PATTERN = /(wolverine men\b|wolverine man\b)/i;
}

export class Wolverine extends CreatureNameToken {
	static PATTERN = /(wolverines\b|wolverine\b)/i;
}

export class WolfMan extends CreatureNameToken {
	static PATTERN = /(wolf men\b|wolf man\b)/i;
}

export class Wolf extends CreatureNameToken {
	static PATTERN = /(wolves\b|wolf\b)/i;
}

export class WildBoarMan extends CreatureNameToken {
	static PATTERN = /(wild boar men\b|wild boar man\b)/i;
}

export class WildBoar extends CreatureNameToken {
	static PATTERN = /(wild boars\b|wild boar\b)/i;
}

export class WhitetipReefShark extends CreatureNameToken {
	static PATTERN = /(whitetip reef sharks\b|whitetip reef shark\b)/i;
}

export class WhiteSpottedPuffer extends CreatureNameToken {
	static PATTERN = /(white-spotted puffers\b|white-spotted puffer\b)/i;
}

export class WhiteHandedGibbon extends CreatureNameToken {
	static PATTERN = /(white-handed gibbons\b|white-handed gibbon\b)/i;
}

export class WhiteBrowedGibbon extends CreatureNameToken {
	static PATTERN = /(white-browed gibbons\b|white-browed gibbon\b)/i;
}

export class WhiteStorkMan extends CreatureNameToken {
	static PATTERN = /(white stork men\b|white stork man\b)/i;
}

export class WhiteStork extends CreatureNameToken {
	static PATTERN = /(white storks\b|white stork\b)/i;
}

export class WhaleShark extends CreatureNameToken {
	static PATTERN = /(whale sharks\b|whale shark\b)/i;
}

export class WeaselMan extends CreatureNameToken {
	static PATTERN = /(weasel men\b|weasel man\b)/i;
}

export class Weasel extends CreatureNameToken {
	static PATTERN = /(weasels\b|weasel\b)/i;
}

export class WaterBuffalo extends CreatureNameToken {
	static PATTERN = /(water buffalos\b|water buffalo\b)/i;
}

export class WarthogMan extends CreatureNameToken {
	static PATTERN = /(warthog men\b|warthog man\b)/i;
}

export class Warthog extends CreatureNameToken {
	static PATTERN = /(warthogs\b|warthog\b)/i;
}

export class WalrusMan extends CreatureNameToken {
	static PATTERN = /(walrus men\b|walrus man\b)/i;
}

export class Walrus extends CreatureNameToken {
	static PATTERN = /(walruses\b|walrus\b)/i;
}

export class Wagon extends CreatureNameToken {
	static PATTERN = /(wagons\b|wagon\b)/i;
}

export class VultureMan extends CreatureNameToken {
	static PATTERN = /(vulture men\b|vulture man\b)/i;
}

export class Vulture extends CreatureNameToken {
	static PATTERN = /(vultures\b|vulture\b)/i;
}

export class VoraciousCaveCrawler extends CreatureNameToken {
	static PATTERN = /(voracious cave crawlers\b|voracious cave crawler\b)/i;
}

export class Unicorn extends CreatureNameToken {
	static PATTERN = /(unicorns\b|unicorn\b)/i;
}

export class TwoLeggedRhinoLizard extends CreatureNameToken {
	static PATTERN = /(two-legged rhino lizards\b|two-legged rhino lizard\b)/i;
}

export class TwoHumpedCamelMan extends CreatureNameToken {
	static PATTERN = /(two-humped camel men\b|two-humped camel man\b)/i;
}

export class TwoHumpedCamel extends CreatureNameToken {
	static PATTERN = /(two-humped camels\b|two-humped camel\b)/i;
}

export class Turkey extends CreatureNameToken {
	static PATTERN = /(turkeys\b|turkey\b)/i;
}

export class Troll extends CreatureNameToken {
	static PATTERN = /(trolls\b|troll\b)/i;
}

export class Troglodyte extends CreatureNameToken {
	static PATTERN = /(troglodytes\b|troglodyte\b)/i;
}

export class ToadMan extends CreatureNameToken {
	static PATTERN = /(toad men\b|toad man\b)/i;
}

export class Toad extends CreatureNameToken {
	static PATTERN = /(toads\b|toad\b)/i;
}

export class Tigerfish extends CreatureNameToken {
	static PATTERN = /(tigerfish\b|tigerfish\b)/i;
}

export class TigerShark extends CreatureNameToken {
	static PATTERN = /(tiger sharks\b|tiger shark\b)/i;
}

export class TigerMan extends CreatureNameToken {
	static PATTERN = /(tiger men\b|tiger man\b)/i;
}

export class Tiger extends CreatureNameToken {
	static PATTERN = /(tigers\b|tiger\b)/i;
}

export class TickMan extends CreatureNameToken {
	static PATTERN = /(tick men\b|tick man\b)/i;
}

export class Tick extends CreatureNameToken {
	static PATTERN = /(ticks\b|tick\b)/i;
}

export class ThripsMan extends CreatureNameToken {
	static PATTERN = /(thrips men\b|thrips man\b)/i;
}

export class Thrips extends CreatureNameToken {
	static PATTERN = /(thrips\b|thrips\b)/i;
}

export class ThornbackRay extends CreatureNameToken {
	static PATTERN = /(thornback rays\b|thornback ray\b)/i;
}

export class Termite extends CreatureNameToken {
	static PATTERN = /(termites\b|termite\b)/i;
}

export class TapirMan extends CreatureNameToken {
	static PATTERN = /(tapir men\b|tapir man\b)/i;
}

export class Tapir extends CreatureNameToken {
	static PATTERN = /(tapirs\b|tapir\b)/i;
}

export class Swordfish extends CreatureNameToken {
	static PATTERN = /(swordfish\b|swordfish\b)/i;
}

export class SwanMan extends CreatureNameToken {
	static PATTERN = /(swan men\b|swan man\b)/i;
}

export class Swan extends CreatureNameToken {
	static PATTERN = /(swans\b|swan\b)/i;
}

export class Sturgeon extends CreatureNameToken {
	static PATTERN = /(sturgeons\b|sturgeon\b)/i;
}

export class Strangler extends CreatureNameToken {
	static PATTERN = /(stranglers\b|strangler\b)/i;
}

export class StoatMan extends CreatureNameToken {
	static PATTERN = /(stoat men\b|stoat man\b)/i;
}

export class Stoat extends CreatureNameToken {
	static PATTERN = /(stoats\b|stoat\b)/i;
}

export class Stingray extends CreatureNameToken {
	static PATTERN = /(stingrays\b|stingray\b)/i;
}

export class SteelheadTrout extends CreatureNameToken {
	static PATTERN = /(steelhead trout\b|steelhead trout\b)/i;
}

export class SquidMan extends CreatureNameToken {
	static PATTERN = /(squid men\b|squid man\b)/i;
}

export class Squid extends CreatureNameToken {
	static PATTERN = /(squids\b|squid\b)/i;
}

export class SpottedWobbegong extends CreatureNameToken {
	static PATTERN = /(spotted wobbegongs\b|spotted wobbegong\b)/i;
}

export class SpottedRatfish extends CreatureNameToken {
	static PATTERN = /(spotted ratfish\b|spotted ratfish\b)/i;
}

export class SpongeMan extends CreatureNameToken {
	static PATTERN = /(sponge men\b|sponge man\b)/i;
}

export class Sponge extends CreatureNameToken {
	static PATTERN = /(sponges\b|sponge\b)/i;
}

export class SpinyDogfish extends CreatureNameToken {
	static PATTERN = /(spiny dogfish\b|spiny dogfish\b)/i;
}

export class SpiderMonkeyMan extends CreatureNameToken {
	static PATTERN = /(spider monkey men\b|spider monkey man\b)/i;
}

export class SpiderMonkey extends CreatureNameToken {
	static PATTERN = /(spider monkeys\b|spider monkey\b)/i;
}

export class SpermWhaleMan extends CreatureNameToken {
	static PATTERN = /(sperm whale men\b|sperm whale man\b)/i;
}

export class SpermWhale extends CreatureNameToken {
	static PATTERN = /(sperm whales\b|sperm whale\b)/i;
}

export class SparrowMan extends CreatureNameToken {
	static PATTERN = /(sparrow men\b|sparrow man\b)/i;
}

export class Sparrow extends CreatureNameToken {
	static PATTERN = /(sparrows\b|sparrow\b)/i;
}

export class Sole extends CreatureNameToken {
	static PATTERN = /(sole\b|sole\b)/i;
}

export class SnowyOwlMan extends CreatureNameToken {
	static PATTERN = /(snowy owl men\b|snowy owl man\b)/i;
}

export class SnowyOwl extends CreatureNameToken {
	static PATTERN = /(snowy owls\b|snowy owl\b)/i;
}

export class SnappingTurtleMan extends CreatureNameToken {
	static PATTERN = /(snapping turtle men\b|snapping turtle man\b)/i;
}

export class SnailMan extends CreatureNameToken {
	static PATTERN = /(snail men\b|snail man\b)/i;
}

export class Snail extends CreatureNameToken {
	static PATTERN = /(snails\b|snail\b)/i;
}

export class SlugMan extends CreatureNameToken {
	static PATTERN = /(slug men\b|slug man\b)/i;
}

export class Slug extends CreatureNameToken {
	static PATTERN = /(slugs\b|slug\b)/i;
}

export class SlothMan extends CreatureNameToken {
	static PATTERN = /(sloth men\b|sloth man\b)/i;
}

export class SlothBearMan extends CreatureNameToken {
	static PATTERN = /(sloth bear men\b|sloth bear man\b)/i;
}

export class SlothBear extends CreatureNameToken {
	static PATTERN = /(sloth bears\b|sloth bear\b)/i;
}

export class Sloth extends CreatureNameToken {
	static PATTERN = /(sloths\b|sloth\b)/i;
}

export class SkunkMan extends CreatureNameToken {
	static PATTERN = /(skunk men\b|skunk man\b)/i;
}

export class Skunk extends CreatureNameToken {
	static PATTERN = /(skunks\b|skunk\b)/i;
}

export class SkinkMan extends CreatureNameToken {
	static PATTERN = /(skink men\b|skink man\b)/i;
}

export class Skink extends CreatureNameToken {
	static PATTERN = /(skinks\b|skink\b)/i;
}

export class SilveryGibbon extends CreatureNameToken {
	static PATTERN = /(silvery gibbons\b|silvery gibbon\b)/i;
}

export class Siamang extends CreatureNameToken {
	static PATTERN = /(siamangs\b|siamang\b)/i;
}

export class ShortfinMakoShark extends CreatureNameToken {
	static PATTERN = /(shortfin mako sharks\b|shortfin mako shark\b)/i;
}

export class Sheep extends CreatureNameToken {
	static PATTERN = /(sheep\b|sheep\b)/i;
}

export class Shad extends CreatureNameToken {
	static PATTERN = /(shads\b|shad\b)/i;
}

export class SerpentMan extends CreatureNameToken {
	static PATTERN = /(serpent men\b|serpent man\b)/i;
}

export class Seahorse extends CreatureNameToken {
	static PATTERN = /(seahorses\b|seahorse\b)/i;
}

export class SeaSerpent extends CreatureNameToken {
	static PATTERN = /(sea serpents\b|sea serpent\b)/i;
}

export class SeaOtter extends CreatureNameToken {
	static PATTERN = /(sea otters\b|sea otter\b)/i;
}

export class SeaNettleJellyfish extends CreatureNameToken {
	static PATTERN = /(sea nettle jellyfish\b|sea nettle jellyfish\b)/i;
}

export class SeaMonster extends CreatureNameToken {
	static PATTERN = /(sea monsters\b|sea monster\b)/i;
}

export class SeaLamprey extends CreatureNameToken {
	static PATTERN = /(sea lampreys\b|sea lamprey\b)/i;
}

export class Satyr extends CreatureNameToken {
	static PATTERN = /(satyrs\b|satyr\b)/i;
}

export class Sasquatch extends CreatureNameToken {
	static PATTERN = /(sasquatches\b|sasquatch\b)/i;
}

export class SaltwaterCrocodileMan extends CreatureNameToken {
	static PATTERN = /(saltwater crocodile men\b|saltwater crocodile man\b)/i;
}

export class SaltwaterCrocodile extends CreatureNameToken {
	static PATTERN = /(saltwater crocodiles\b|saltwater crocodile\b)/i;
}

export class Salmon extends CreatureNameToken {
	static PATTERN = /(salmon\b|salmon\b)/i;
}

export class SailfinMolly extends CreatureNameToken {
	static PATTERN = /(sailfin mollies\b|sailfin molly\b)/i;
}

export class Rutherer extends CreatureNameToken {
	static PATTERN = /(rutherers\b|rutherer\b)/i;
}

export class RodentMan extends CreatureNameToken {
	static PATTERN = /(rodent men\b|rodent man\b)/i;
}

export class Roc extends CreatureNameToken {
	static PATTERN = /(rocs\b|roc\b)/i;
}

export class RoachMan extends CreatureNameToken {
	static PATTERN = /(roach men\b|roach man\b)/i;
}

export class RiverOtter extends CreatureNameToken {
	static PATTERN = /(river otters\b|river otter\b)/i;
}

export class RhinocerosMan extends CreatureNameToken {
	static PATTERN = /(rhinoceros men\b|rhinoceros man\b)/i;
}

export class Rhinoceros extends CreatureNameToken {
	static PATTERN = /(rhinoceroses\b|rhinoceros\b)/i;
}

export class RhesusMacaqueMan extends CreatureNameToken {
	static PATTERN = /(rhesus macaque men\b|rhesus macaque man\b)/i;
}

export class RhesusMacaque extends CreatureNameToken {
	static PATTERN = /(rhesus macaques\b|rhesus macaque\b)/i;
}

export class ReptileMan extends CreatureNameToken {
	static PATTERN = /(reptile men\b|reptile man\b)/i;
}

export class Reindeer extends CreatureNameToken {
	static PATTERN = /(reindeer\b|reindeer\b)/i;
}

export class RedWingedBlackbirdMan extends CreatureNameToken {
	static PATTERN = /(red-winged blackbird men\b|red-winged blackbird man\b)/i;
}

export class RedWingedBlackbird extends CreatureNameToken {
	static PATTERN = /(red-winged blackbirds\b|red-winged blackbird\b)/i;
}

export class RedSquirrelMan extends CreatureNameToken {
	static PATTERN = /(red squirrel men\b|red squirrel man\b)/i;
}

export class RedSquirrel extends CreatureNameToken {
	static PATTERN = /(red squirrels\b|red squirrel\b)/i;
}

export class RedPandaMan extends CreatureNameToken {
	static PATTERN = /(red panda men\b|red panda man\b)/i;
}

export class RedPanda extends CreatureNameToken {
	static PATTERN = /(red pandas\b|red panda\b)/i;
}

export class Reacher extends CreatureNameToken {
	static PATTERN = /(reachers\b|reacher\b)/i;
}

export class RavenMan extends CreatureNameToken {
	static PATTERN = /(raven men\b|raven man\b)/i;
}

export class Raven extends CreatureNameToken {
	static PATTERN = /(ravens\b|raven\b)/i;
}

export class RattlesnakeMan extends CreatureNameToken {
	static PATTERN = /(rattlesnake men\b|rattlesnake man\b)/i;
}

export class Rattlesnake extends CreatureNameToken {
	static PATTERN = /(rattlesnakes\b|rattlesnake\b)/i;
}

export class RatMan extends CreatureNameToken {
	static PATTERN = /(rat men\b|rat man\b)/i;
}

export class Rat extends CreatureNameToken {
	static PATTERN = /(rats\b|rat\b)/i;
}

export class RainbowTrout extends CreatureNameToken {
	static PATTERN = /(rainbow trout\b|rainbow trout\b)/i;
}

export class RaccoonMan extends CreatureNameToken {
	static PATTERN = /(raccoon men\b|raccoon man\b)/i;
}

export class Raccoon extends CreatureNameToken {
	static PATTERN = /(raccoons\b|raccoon\b)/i;
}

export class Rabbit extends CreatureNameToken {
	static PATTERN = /(rabbits\b|rabbit\b)/i;
}

export class PythonMan extends CreatureNameToken {
	static PATTERN = /(python men\b|python man\b)/i;
}

export class Python extends CreatureNameToken {
	static PATTERN = /(pythons\b|python\b)/i;
}

export class PurringMaggot extends CreatureNameToken {
	static PATTERN = /(purring maggots\b|purring maggot\b)/i;
}

export class PuffinMan extends CreatureNameToken {
	static PATTERN = /(puffin men\b|puffin man\b)/i;
}

export class Puffin extends CreatureNameToken {
	static PATTERN = /(puffins\b|puffin\b)/i;
}

export class PorcupineMan extends CreatureNameToken {
	static PATTERN = /(porcupine men\b|porcupine man\b)/i;
}

export class Porcupine extends CreatureNameToken {
	static PATTERN = /(porcupines\b|porcupine\b)/i;
}

export class PondTurtleMan extends CreatureNameToken {
	static PATTERN = /(pond turtle men\b|pond turtle man\b)/i;
}

export class PondTurtle extends CreatureNameToken {
	static PATTERN = /(pond turtles\b|pond turtle\b)/i;
}

export class PondGrabber extends CreatureNameToken {
	static PATTERN = /(pond grabbers\b|pond grabber\b)/i;
}

export class PolarBearMan extends CreatureNameToken {
	static PATTERN = /(polar bear men\b|polar bear man\b)/i;
}

export class PolarBear extends CreatureNameToken {
	static PATTERN = /(polar bears\b|polar bear\b)/i;
}

export class PlumpHelmetMan extends CreatureNameToken {
	static PATTERN = /(plump helmet men\b|plump helmet man\b)/i;
}

export class PlatypusMan extends CreatureNameToken {
	static PATTERN = /(platypus men\b|platypus man\b)/i;
}

export class Platypus extends CreatureNameToken {
	static PATTERN = /(platypuses\b|platypus\b)/i;
}

export class Pixie extends CreatureNameToken {
	static PATTERN = /(pixies\b|pixie\b)/i;
}

export class PileatedGibbon extends CreatureNameToken {
	static PATTERN = /(pileated gibbons\b|pileated gibbon\b)/i;
}

export class Pike extends CreatureNameToken {
	static PATTERN = /(pike\b|pike\b)/i;
}

export class Pig extends CreatureNameToken {
	static PATTERN = /(pigs\b|pig\b)/i;
}

export class PhantomSpider extends CreatureNameToken {
	static PATTERN = /(phantom spiders\b|phantom spider\b)/i;
}

export class PeregrineFalconMan extends CreatureNameToken {
	static PATTERN = /(peregrine falcon men\b|peregrine falcon man\b)/i;
}

export class PeregrineFalcon extends CreatureNameToken {
	static PATTERN = /(peregrine falcons\b|peregrine falcon\b)/i;
}

export class Perch extends CreatureNameToken {
	static PATTERN = /(perch\b|perch\b)/i;
}

export class PenguinMan extends CreatureNameToken {
	static PATTERN = /(penguin men\b|penguin man\b)/i;
}

export class Penguin extends CreatureNameToken {
	static PATTERN = /(penguins\b|penguin\b)/i;
}

export class PeachFacedLovebirdMan extends CreatureNameToken {
	static PATTERN = /(peach-faced lovebird men\b|peach-faced lovebird man\b)/i;
}

export class PeachFacedLovebird extends CreatureNameToken {
	static PATTERN = /(peach-faced lovebirds\b|peach-faced lovebird\b)/i;
}

export class ParakeetMan extends CreatureNameToken {
	static PATTERN = /(parakeet men\b|parakeet man\b)/i;
}

export class Parakeet extends CreatureNameToken {
	static PATTERN = /(parakeets\b|parakeet\b)/i;
}

export class PangolinMan extends CreatureNameToken {
	static PATTERN = /(pangolin men\b|pangolin man\b)/i;
}

export class Pangolin extends CreatureNameToken {
	static PATTERN = /(pangolins\b|pangolin\b)/i;
}

export class PandaMan extends CreatureNameToken {
	static PATTERN = /(panda men\b|panda man\b)/i;
}

export class Panda extends CreatureNameToken {
	static PATTERN = /(pandas\b|panda\b)/i;
}

export class Oyster extends CreatureNameToken {
	static PATTERN = /(oysters\b|oyster\b)/i;
}

export class OtterMan extends CreatureNameToken {
	static PATTERN = /(otter men\b|otter man\b)/i;
}

export class OstrichMan extends CreatureNameToken {
	static PATTERN = /(ostrich men\b|ostrich man\b)/i;
}

export class Ostrich extends CreatureNameToken {
	static PATTERN = /(ostriches\b|ostrich\b)/i;
}

export class OspreyMan extends CreatureNameToken {
	static PATTERN = /(osprey men\b|osprey man\b)/i;
}

export class Osprey extends CreatureNameToken {
	static PATTERN = /(ospreys\b|osprey\b)/i;
}

export class OrioleMan extends CreatureNameToken {
	static PATTERN = /(oriole men\b|oriole man\b)/i;
}

export class Oriole extends CreatureNameToken {
	static PATTERN = /(orioles\b|oriole\b)/i;
}

export class OrcaMan extends CreatureNameToken {
	static PATTERN = /(orca men\b|orca man\b)/i;
}

export class Orca extends CreatureNameToken {
	static PATTERN = /(orcas\b|orca\b)/i;
}

export class Orangutan extends CreatureNameToken {
	static PATTERN = /(orangutans\b|orangutan\b)/i;
}

export class OpossumMan extends CreatureNameToken {
	static PATTERN = /(opossum men\b|opossum man\b)/i;
}

export class Opossum extends CreatureNameToken {
	static PATTERN = /(opossums\b|opossum\b)/i;
}

export class Opah extends CreatureNameToken {
	static PATTERN = /(opah\b|opah\b)/i;
}

export class OneHumpedCamelMan extends CreatureNameToken {
	static PATTERN = /(one-humped camel men\b|one-humped camel man\b)/i;
}

export class OneHumpedCamel extends CreatureNameToken {
	static PATTERN = /(one-humped camels\b|one-humped camel\b)/i;
}

export class OlmMan extends CreatureNameToken {
	static PATTERN = /(olm men\b|olm man\b)/i;
}

export class Olm extends CreatureNameToken {
	static PATTERN = /(olms\b|olm\b)/i;
}

export class Ogre extends CreatureNameToken {
	static PATTERN = /(ogres\b|ogre\b)/i;
}

export class OctopusMan extends CreatureNameToken {
	static PATTERN = /(octopus men\b|octopus man\b)/i;
}

export class Octopus extends CreatureNameToken {
	static PATTERN = /(octopuses\b|octopus\b)/i;
}

export class OcelotMan extends CreatureNameToken {
	static PATTERN = /(ocelot men\b|ocelot man\b)/i;
}

export class Ocelot extends CreatureNameToken {
	static PATTERN = /(ocelots\b|ocelot\b)/i;
}

export class OceanSunfish extends CreatureNameToken {
	static PATTERN = /(ocean sunfish\b|ocean sunfish\b)/i;
}

export class NurseShark extends CreatureNameToken {
	static PATTERN = /(nurse sharks\b|nurse shark\b)/i;
}

export class Nightwing extends CreatureNameToken {
	static PATTERN = /(nightwings\b|nightwing\b)/i;
}

export class NautilusMan extends CreatureNameToken {
	static PATTERN = /(nautilus men\b|nautilus man\b)/i;
}

export class Nautilus extends CreatureNameToken {
	static PATTERN = /(nautiluses\b|nautilus\b)/i;
}

export class NarwhalMan extends CreatureNameToken {
	static PATTERN = /(narwhal men\b|narwhal man\b)/i;
}

export class Narwhal extends CreatureNameToken {
	static PATTERN = /(narwhals\b|narwhal\b)/i;
}

export class NakedMoleDog extends CreatureNameToken {
	static PATTERN = /(naked mole dogs\b|naked mole dog\b)/i;
}

export class Mussel extends CreatureNameToken {
	static PATTERN = /(mussels\b|mussel\b)/i;
}

export class MuskoxMan extends CreatureNameToken {
	static PATTERN = /(muskox men\b|muskox man\b)/i;
}

export class Muskox extends CreatureNameToken {
	static PATTERN = /(muskoxen\b|muskox\b)/i;
}

export class Mule extends CreatureNameToken {
	static PATTERN = /(mules\b|mule\b)/i;
}

export class MudMan extends CreatureNameToken {
	static PATTERN = /(mud men\b|mud man\b)/i;
}

export class MountainGoatMan extends CreatureNameToken {
	static PATTERN = /(mountain goat men\b|mountain goat man\b)/i;
}

export class MountainGoat extends CreatureNameToken {
	static PATTERN = /(mountain goats\b|mountain goat\b)/i;
}

export class MountainGnome extends CreatureNameToken {
	static PATTERN = /(mountain gnomes\b|mountain gnome\b)/i;
}

export class MothMan extends CreatureNameToken {
	static PATTERN = /(moth men\b|moth man\b)/i;
}

export class Moth extends CreatureNameToken {
	static PATTERN = /(moths\b|moth\b)/i;
}

export class MosquitoMan extends CreatureNameToken {
	static PATTERN = /(mosquito men\b|mosquito man\b)/i;
}

export class Mosquito extends CreatureNameToken {
	static PATTERN = /(mosquitos\b|mosquito\b)/i;
}

export class MooseMan extends CreatureNameToken {
	static PATTERN = /(moose men\b|moose man\b)/i;
}

export class Moose extends CreatureNameToken {
	static PATTERN = /(moose\b|moose\b)/i;
}

export class MoonSnailMan extends CreatureNameToken {
	static PATTERN = /(moon snail men\b|moon snail man\b)/i;
}

export class MoonSnail extends CreatureNameToken {
	static PATTERN = /(moon snails\b|moon snail\b)/i;
}

export class MonitorLizardMan extends CreatureNameToken {
	static PATTERN = /(monitor lizard men\b|monitor lizard man\b)/i;
}

export class MonitorLizard extends CreatureNameToken {
	static PATTERN = /(monitor lizards\b|monitor lizard\b)/i;
}

export class MongooseMan extends CreatureNameToken {
	static PATTERN = /(mongoose men\b|mongoose man\b)/i;
}

export class Mongoose extends CreatureNameToken {
	static PATTERN = /(mongooses\b|mongoose\b)/i;
}

export class MonarchButterflyMan extends CreatureNameToken {
	static PATTERN = /(monarch butterfly men\b|monarch butterfly man\b)/i;
}

export class MonarchButterfly extends CreatureNameToken {
	static PATTERN = /(monarch butterflies\b|monarch butterfly\b)/i;
}

export class Molemarian extends CreatureNameToken {
	static PATTERN = /(molemarians\b|molemarian\b)/i;
}

export class Moghopper extends CreatureNameToken {
	static PATTERN = /(moghoppers\b|moghopper\b)/i;
}

export class Minotaur extends CreatureNameToken {
	static PATTERN = /(minotaurs\b|minotaur\b)/i;
}

export class MinkMan extends CreatureNameToken {
	static PATTERN = /(mink men\b|mink man\b)/i;
}

export class Mink extends CreatureNameToken {
	static PATTERN = /(minks\b|mink\b)/i;
}

export class Milkfish extends CreatureNameToken {
	static PATTERN = /(milkfish\b|milkfish\b)/i;
}

export class Merperson extends CreatureNameToken {
	static PATTERN = /(merpeople\b|merperson\b)/i;
}

export class MaskedLovebirdMan extends CreatureNameToken {
	static PATTERN = /(masked lovebird men\b|masked lovebird man\b)/i;
}

export class MaskedLovebird extends CreatureNameToken {
	static PATTERN = /(masked lovebirds\b|masked lovebird\b)/i;
}

export class Marlin extends CreatureNameToken {
	static PATTERN = /(marlins\b|marlin\b)/i;
}

export class MantisMan extends CreatureNameToken {
	static PATTERN = /(mantis men\b|mantis man\b)/i;
}

export class Mantis extends CreatureNameToken {
	static PATTERN = /(mantises\b|mantis\b)/i;
}

export class MantaRay extends CreatureNameToken {
	static PATTERN = /(manta rays\b|manta ray\b)/i;
}

export class Manera extends CreatureNameToken {
	static PATTERN = /(maneras\b|manera\b)/i;
}

export class MandrillMan extends CreatureNameToken {
	static PATTERN = /(mandrill men\b|mandrill man\b)/i;
}

export class Mandrill extends CreatureNameToken {
	static PATTERN = /(mandrills\b|mandrill\b)/i;
}

export class MagpieMan extends CreatureNameToken {
	static PATTERN = /(magpie men\b|magpie man\b)/i;
}

export class Magpie extends CreatureNameToken {
	static PATTERN = /(magpies\b|magpie\b)/i;
}

export class MagmaMan extends CreatureNameToken {
	static PATTERN = /(magma men\b|magma man\b)/i;
}

export class MagmaCrab extends CreatureNameToken {
	static PATTERN = /(magma crabs\b|magma crab\b)/i;
}

export class Mackerel extends CreatureNameToken {
	static PATTERN = /(mackerel\b|mackerel\b)/i;
}

export class LynxMan extends CreatureNameToken {
	static PATTERN = /(lynx men\b|lynx man\b)/i;
}

export class Lynx extends CreatureNameToken {
	static PATTERN = /(lynx\b|lynx\b)/i;
}

export class Lungfish extends CreatureNameToken {
	static PATTERN = /(lungfish\b|lungfish\b)/i;
}

export class LouseMan extends CreatureNameToken {
	static PATTERN = /(louse men\b|louse man\b)/i;
}

export class Louse extends CreatureNameToken {
	static PATTERN = /(lice\b|louse\b)/i;
}

export class LorikeetMan extends CreatureNameToken {
	static PATTERN = /(lorikeet men\b|lorikeet man\b)/i;
}

export class Lorikeet extends CreatureNameToken {
	static PATTERN = /(lorikeets\b|lorikeet\b)/i;
}

export class LoonMan extends CreatureNameToken {
	static PATTERN = /(loon men\b|loon man\b)/i;
}

export class Loon extends CreatureNameToken {
	static PATTERN = /(loons\b|loon\b)/i;
}

export class LongnoseGar extends CreatureNameToken {
	static PATTERN = /(longnose gars\b|longnose gar\b)/i;
}

export class LongfinMakoShark extends CreatureNameToken {
	static PATTERN = /(longfin mako sharks\b|longfin mako shark\b)/i;
}

export class Llama extends CreatureNameToken {
	static PATTERN = /(llamas\b|llama\b)/i;
}

export class LizardMan extends CreatureNameToken {
	static PATTERN = /(lizard men\b|lizard man\b)/i;
}

export class Lizard extends CreatureNameToken {
	static PATTERN = /(lizards\b|lizard\b)/i;
}

export class LittlePenguin extends CreatureNameToken {
	static PATTERN = /(little penguins\b|little penguin\b)/i;
}

export class LionTamarinMan extends CreatureNameToken {
	static PATTERN = /(lion tamarin men\b|lion tamarin man\b)/i;
}

export class LionTamarin extends CreatureNameToken {
	static PATTERN = /(lion tamarins\b|lion tamarin\b)/i;
}

export class LionMan extends CreatureNameToken {
	static PATTERN = /(lion men\b|lion man\b)/i;
}

export class Lion extends CreatureNameToken {
	static PATTERN = /(lions\b|lion\b)/i;
}

export class LeopardSealMan extends CreatureNameToken {
	static PATTERN = /(leopard seal men\b|leopard seal man\b)/i;
}

export class LeopardSeal extends CreatureNameToken {
	static PATTERN = /(leopard seals\b|leopard seal\b)/i;
}

export class LeopardMan extends CreatureNameToken {
	static PATTERN = /(leopard men\b|leopard man\b)/i;
}

export class LeopardGeckoMan extends CreatureNameToken {
	static PATTERN = /(leopard gecko men\b|leopard gecko man\b)/i;
}

export class LeopardGecko extends CreatureNameToken {
	static PATTERN = /(leopard geckos\b|leopard gecko\b)/i;
}

export class Leopard extends CreatureNameToken {
	static PATTERN = /(leopards\b|leopard\b)/i;
}

export class LeechMan extends CreatureNameToken {
	static PATTERN = /(leech men\b|leech man\b)/i;
}

export class Leech extends CreatureNameToken {
	static PATTERN = /(leeches\b|leech\b)/i;
}

export class LargeRoach extends CreatureNameToken {
	static PATTERN = /(large roaches\b|large roach\b)/i;
}

export class LargeRat extends CreatureNameToken {
	static PATTERN = /(large rats\b|large rat\b)/i;
}

export class Kobold extends CreatureNameToken {
	static PATTERN = /(kobolds\b|kobold\b)/i;
}

export class KoalaMan extends CreatureNameToken {
	static PATTERN = /(koala men\b|koala man\b)/i;
}

export class Koala extends CreatureNameToken {
	static PATTERN = /(koalas\b|koala\b)/i;
}

export class KnuckleWorm extends CreatureNameToken {
	static PATTERN = /(knuckle worms\b|knuckle worm\b)/i;
}

export class KiwiMan extends CreatureNameToken {
	static PATTERN = /(kiwi men\b|kiwi man\b)/i;
}

export class Kiwi extends CreatureNameToken {
	static PATTERN = /(kiwis\b|kiwi\b)/i;
}

export class KingsnakeMan extends CreatureNameToken {
	static PATTERN = /(kingsnake men\b|kingsnake man\b)/i;
}

export class Kingsnake extends CreatureNameToken {
	static PATTERN = /(kingsnakes\b|kingsnake\b)/i;
}

export class KingCobraMan extends CreatureNameToken {
	static PATTERN = /(king cobra men\b|king cobra man\b)/i;
}

export class KingCobra extends CreatureNameToken {
	static PATTERN = /(king cobras\b|king cobra\b)/i;
}

export class KestrelMan extends CreatureNameToken {
	static PATTERN = /(kestrel men\b|kestrel man\b)/i;
}

export class Kestrel extends CreatureNameToken {
	static PATTERN = /(kestrels\b|kestrel\b)/i;
}

export class KeaMan extends CreatureNameToken {
	static PATTERN = /(kea men\b|kea man\b)/i;
}

export class Kea extends CreatureNameToken {
	static PATTERN = /(kea\b|kea\b)/i;
}

export class KangarooMan extends CreatureNameToken {
	static PATTERN = /(kangaroo men\b|kangaroo man\b)/i;
}

export class Kangaroo extends CreatureNameToken {
	static PATTERN = /(kangaroos\b|kangaroo\b)/i;
}

export class KakapoMan extends CreatureNameToken {
	static PATTERN = /(kakapo men\b|kakapo man\b)/i;
}

export class Kakapo extends CreatureNameToken {
	static PATTERN = /(kakapo\b|kakapo\b)/i;
}

export class JumpingSpiderMan extends CreatureNameToken {
	static PATTERN = /(jumping spider men\b|jumping spider man\b)/i;
}

export class JumpingSpider extends CreatureNameToken {
	static PATTERN = /(jumping spiders\b|jumping spider\b)/i;
}

export class JaguarMan extends CreatureNameToken {
	static PATTERN = /(jaguar men\b|jaguar man\b)/i;
}

export class Jaguar extends CreatureNameToken {
	static PATTERN = /(jaguars\b|jaguar\b)/i;
}

export class JackalMan extends CreatureNameToken {
	static PATTERN = /(jackal men\b|jackal man\b)/i;
}

export class Jackal extends CreatureNameToken {
	static PATTERN = /(jackals\b|jackal\b)/i;
}

export class Jabberer extends CreatureNameToken {
	static PATTERN = /(jabberers\b|jabberer\b)/i;
}

export class IronMan extends CreatureNameToken {
	static PATTERN = /(iron men\b|iron man\b)/i;
}

export class ImpalaMan extends CreatureNameToken {
	static PATTERN = /(impala men\b|impala man\b)/i;
}

export class Impala extends CreatureNameToken {
	static PATTERN = /(impalas\b|impala\b)/i;
}

export class IguanaMan extends CreatureNameToken {
	static PATTERN = /(iguana men\b|iguana man\b)/i;
}

export class Iguana extends CreatureNameToken {
	static PATTERN = /(iguanas\b|iguana\b)/i;
}

export class IceWolf extends CreatureNameToken {
	static PATTERN = /(ice wolves\b|ice wolf\b)/i;
}

export class IbexMan extends CreatureNameToken {
	static PATTERN = /(ibex men\b|ibex man\b)/i;
}

export class Ibex extends CreatureNameToken {
	static PATTERN = /(ibexes\b|ibex\b)/i;
}

export class HyenaMan extends CreatureNameToken {
	static PATTERN = /(hyena men\b|hyena man\b)/i;
}

export class Hyena extends CreatureNameToken {
	static PATTERN = /(hyenas\b|hyena\b)/i;
}

export class Hydra extends CreatureNameToken {
	static PATTERN = /(hydras\b|hydra\b)/i;
}

export class HungryHead extends CreatureNameToken {
	static PATTERN = /(hungry heads\b|hungry head\b)/i;
}

export class Human extends CreatureNameToken {
	static PATTERN = /(humans\b|human\b)/i;
}

export class HorseshoeCrabMan extends CreatureNameToken {
	static PATTERN = /(horseshoe crab men\b|horseshoe crab man\b)/i;
}

export class HorseshoeCrab extends CreatureNameToken {
	static PATTERN = /(horseshoe crabs\b|horseshoe crab\b)/i;
}

export class Horse extends CreatureNameToken {
	static PATTERN = /(horses\b|horse\b)/i;
}

export class HornbillMan extends CreatureNameToken {
	static PATTERN = /(hornbill men\b|hornbill man\b)/i;
}

export class Hornbill extends CreatureNameToken {
	static PATTERN = /(hornbills\b|hornbill\b)/i;
}

export class HoneyBee extends CreatureNameToken {
	static PATTERN = /(honey bees\b|honey bee\b)/i;
}

export class HoneyBadgerMan extends CreatureNameToken {
	static PATTERN = /(honey badger men\b|honey badger man\b)/i;
}

export class HoneyBadger extends CreatureNameToken {
	static PATTERN = /(honey badgers\b|honey badger\b)/i;
}

export class HoaryMarmotMan extends CreatureNameToken {
	static PATTERN = /(hoary marmot men\b|hoary marmot man\b)/i;
}

export class HoaryMarmot extends CreatureNameToken {
	static PATTERN = /(hoary marmots\b|hoary marmot\b)/i;
}

export class HippoMan extends CreatureNameToken {
	static PATTERN = /(hippo men\b|hippo man\b)/i;
}

export class Hippo extends CreatureNameToken {
	static PATTERN = /(hippos\b|hippo\b)/i;
}

export class Herring extends CreatureNameToken {
	static PATTERN = /(herrings\b|herring\b)/i;
}

export class HelmetSnake extends CreatureNameToken {
	static PATTERN = /(helmet snakes\b|helmet snake\b)/i;
}

export class HedgehogMan extends CreatureNameToken {
	static PATTERN = /(hedgehog men\b|hedgehog man\b)/i;
}

export class Hedgehog extends CreatureNameToken {
	static PATTERN = /(hedgehogs\b|hedgehog\b)/i;
}

export class Harpy extends CreatureNameToken {
	static PATTERN = /(harpies\b|harpy\b)/i;
}

export class HarpSealMan extends CreatureNameToken {
	static PATTERN = /(harp seal men\b|harp seal man\b)/i;
}

export class HarpSeal extends CreatureNameToken {
	static PATTERN = /(harp seals\b|harp seal\b)/i;
}

export class HareMan extends CreatureNameToken {
	static PATTERN = /(hare men\b|hare man\b)/i;
}

export class Hare extends CreatureNameToken {
	static PATTERN = /(hares\b|hare\b)/i;
}

export class HamsterMan extends CreatureNameToken {
	static PATTERN = /(hamster men\b|hamster man\b)/i;
}

export class Hamster extends CreatureNameToken {
	static PATTERN = /(hamsters\b|hamster\b)/i;
}

export class HammerheadShark extends CreatureNameToken {
	static PATTERN = /(hammerhead sharks\b|hammerhead shark\b)/i;
}

export class Halibut extends CreatureNameToken {
	static PATTERN = /(halibut\b|halibut\b)/i;
}

export class Hake extends CreatureNameToken {
	static PATTERN = /(hake\b|hake\b)/i;
}

export class Hagfish extends CreatureNameToken {
	static PATTERN = /(hagfish\b|hagfish\b)/i;
}

export class Guppy extends CreatureNameToken {
	static PATTERN = /(guppies\b|guppy\b)/i;
}

export class Guineafowl extends CreatureNameToken {
	static PATTERN = /(guineafowls\b|guineafowl\b)/i;
}

export class GroundhogMan extends CreatureNameToken {
	static PATTERN = /(groundhog men\b|groundhog man\b)/i;
}

export class Groundhog extends CreatureNameToken {
	static PATTERN = /(groundhogs\b|groundhog\b)/i;
}

export class GrizzlyBearMan extends CreatureNameToken {
	static PATTERN = /(grizzly bear men\b|grizzly bear man\b)/i;
}

export class GrizzlyBear extends CreatureNameToken {
	static PATTERN = /(grizzly bears\b|grizzly bear\b)/i;
}

export class Grimeling extends CreatureNameToken {
	static PATTERN = /(grimelings\b|grimeling\b)/i;
}

export class Griffon extends CreatureNameToken {
	static PATTERN = /(griffons\b|griffon\b)/i;
}

export class GreyParrotMan extends CreatureNameToken {
	static PATTERN = /(grey parrot men\b|grey parrot man\b)/i;
}

export class GreyParrot extends CreatureNameToken {
	static PATTERN = /(grey parrots\b|grey parrot\b)/i;
}

export class Gremlin extends CreatureNameToken {
	static PATTERN = /(gremlins\b|gremlin\b)/i;
}

export class GreenTreeFrogMan extends CreatureNameToken {
	static PATTERN = /(green tree frog men\b|green tree frog man\b)/i;
}

export class GreenTreeFrog extends CreatureNameToken {
	static PATTERN = /(green tree frogs\b|green tree frog\b)/i;
}

export class GreenDevourer extends CreatureNameToken {
	static PATTERN = /(green devourers\b|green devourer\b)/i;
}

export class GreatWhiteShark extends CreatureNameToken {
	static PATTERN = /(great white sharks\b|great white shark\b)/i;
}

export class GreatHornedOwlMan extends CreatureNameToken {
	static PATTERN = /(great horned owl men\b|great horned owl man\b)/i;
}

export class GreatHornedOwl extends CreatureNameToken {
	static PATTERN = /(great horned owls\b|great horned owl\b)/i;
}

export class GreatBarracuda extends CreatureNameToken {
	static PATTERN = /(great barracudas\b|great barracuda\b)/i;
}

export class GraySquirrelMan extends CreatureNameToken {
	static PATTERN = /(gray squirrel men\b|gray squirrel man\b)/i;
}

export class GraySquirrel extends CreatureNameToken {
	static PATTERN = /(gray squirrels\b|gray squirrel\b)/i;
}

export class GrayLangurMan extends CreatureNameToken {
	static PATTERN = /(gray langur men\b|gray langur man\b)/i;
}

export class GrayLangur extends CreatureNameToken {
	static PATTERN = /(gray langurs\b|gray langur\b)/i;
}

export class GrayGibbon extends CreatureNameToken {
	static PATTERN = /(gray gibbons\b|gray gibbon\b)/i;
}

export class GrasshopperMan extends CreatureNameToken {
	static PATTERN = /(grasshopper men\b|grasshopper man\b)/i;
}

export class Grasshopper extends CreatureNameToken {
	static PATTERN = /(grasshoppers\b|grasshopper\b)/i;
}

export class GrackleMan extends CreatureNameToken {
	static PATTERN = /(grackle men\b|grackle man\b)/i;
}

export class Grackle extends CreatureNameToken {
	static PATTERN = /(grackles\b|grackle\b)/i;
}

export class Gorlak extends CreatureNameToken {
	static PATTERN = /(gorlaks\b|gorlak\b)/i;
}

export class Gorilla extends CreatureNameToken {
	static PATTERN = /(gorillas\b|gorilla\b)/i;
}

export class Goose extends CreatureNameToken {
	static PATTERN = /(geese\b|goose\b)/i;
}

export class Goblin extends CreatureNameToken {
	static PATTERN = /(goblins\b|goblin\b)/i;
}

export class Goat extends CreatureNameToken {
	static PATTERN = /(goats\b|goat\b)/i;
}

export class Glasseye extends CreatureNameToken {
	static PATTERN = /(glasseye\b|glasseye\b)/i;
}

export class GiraffeMan extends CreatureNameToken {
	static PATTERN = /(giraffe men\b|giraffe man\b)/i;
}

export class Giraffe extends CreatureNameToken {
	static PATTERN = /(giraffes\b|giraffe\b)/i;
}

export class GilaMonsterMan extends CreatureNameToken {
	static PATTERN = /(gila monster men\b|gila monster man\b)/i;
}

export class GilaMonster extends CreatureNameToken {
	static PATTERN = /(gila monsters\b|gila monster\b)/i;
}

export class GiganticTortoise extends CreatureNameToken {
	static PATTERN = /(gigantic tortoises\b|gigantic tortoise\b)/i;
}

export class GiganticSquid extends CreatureNameToken {
	static PATTERN = /(gigantic squids\b|gigantic squid\b)/i;
}

export class GiganticPanda extends CreatureNameToken {
	static PATTERN = /(gigantic pandas\b|gigantic panda\b)/i;
}

export class GiantWren extends CreatureNameToken {
	static PATTERN = /(giant wrens\b|giant wren\b)/i;
}

export class GiantWombat extends CreatureNameToken {
	static PATTERN = /(giant wombats\b|giant wombat\b)/i;
}

export class GiantWolverine extends CreatureNameToken {
	static PATTERN = /(giant wolverines\b|giant wolverine\b)/i;
}

export class GiantWolf extends CreatureNameToken {
	static PATTERN = /(giant wolves\b|giant wolf\b)/i;
}

export class GiantWildBoar extends CreatureNameToken {
	static PATTERN = /(giant wild boars\b|giant wild boar\b)/i;
}

export class GiantWhiteStork extends CreatureNameToken {
	static PATTERN = /(giant white storks\b|giant white stork\b)/i;
}

export class GiantWeasel extends CreatureNameToken {
	static PATTERN = /(giant weasels\b|giant weasel\b)/i;
}

export class GiantWarthog extends CreatureNameToken {
	static PATTERN = /(giant warthogs\b|giant warthog\b)/i;
}

export class GiantWalrus extends CreatureNameToken {
	static PATTERN = /(giant walruss\b|giant walrus\b)/i;
}

export class GiantVulture extends CreatureNameToken {
	static PATTERN = /(giant vultures\b|giant vulture\b)/i;
}

export class GiantTwoHumpedCamel extends CreatureNameToken {
	static PATTERN = /(giant two-humped camels\b|giant two-humped camel\b)/i;
}

export class GiantTortoiseMan extends CreatureNameToken {
	static PATTERN = /(giant tortoise men\b|giant tortoise man\b)/i;
}

export class GiantTortoise extends CreatureNameToken {
	static PATTERN = /(giant tortoises\b|giant tortoise\b)/i;
}

export class GiantToad extends CreatureNameToken {
	static PATTERN = /(giant toads\b|giant toad\b)/i;
}

export class GiantTiger extends CreatureNameToken {
	static PATTERN = /(giant tigers\b|giant tiger\b)/i;
}

export class GiantTick extends CreatureNameToken {
	static PATTERN = /(giant ticks\b|giant tick\b)/i;
}

export class GiantThrips extends CreatureNameToken {
	static PATTERN = /(giant thrips\b|giant thrips\b)/i;
}

export class GiantTapir extends CreatureNameToken {
	static PATTERN = /(giant tapirs\b|giant tapir\b)/i;
}

export class GiantSwan extends CreatureNameToken {
	static PATTERN = /(giant swans\b|giant swan\b)/i;
}

export class GiantStoat extends CreatureNameToken {
	static PATTERN = /(giant stoats\b|giant stoat\b)/i;
}

export class GiantSponge extends CreatureNameToken {
	static PATTERN = /(giant sponges\b|giant sponge\b)/i;
}

export class GiantSpiderMonkey extends CreatureNameToken {
	static PATTERN = /(giant spider monkeys\b|giant spider monkey\b)/i;
}

export class GiantSpermWhale extends CreatureNameToken {
	static PATTERN = /(giant sperm whales\b|giant sperm whale\b)/i;
}

export class GiantSparrow extends CreatureNameToken {
	static PATTERN = /(giant sparrows\b|giant sparrow\b)/i;
}

export class GiantSnowyOwl extends CreatureNameToken {
	static PATTERN = /(giant snowy owls\b|giant snowy owl\b)/i;
}

export class GiantSnappingTurtle extends CreatureNameToken {
	static PATTERN = /(giant snapping turtles\b|giant snapping turtle\b)/i;
}

export class GiantSnail extends CreatureNameToken {
	static PATTERN = /(giant snails\b|giant snail\b)/i;
}

export class GiantSlug extends CreatureNameToken {
	static PATTERN = /(giant slugs\b|giant slug\b)/i;
}

export class GiantSlothBear extends CreatureNameToken {
	static PATTERN = /(giant sloth bears\b|giant sloth bear\b)/i;
}

export class GiantSloth extends CreatureNameToken {
	static PATTERN = /(giant sloths\b|giant sloth\b)/i;
}

export class GiantSkunk extends CreatureNameToken {
	static PATTERN = /(giant skunks\b|giant skunk\b)/i;
}

export class GiantSkink extends CreatureNameToken {
	static PATTERN = /(giant skinks\b|giant skink\b)/i;
}

export class GiantSaltwaterCrocodile extends CreatureNameToken {
	static PATTERN = /(giant saltwater crocodiles\b|giant saltwater crocodile\b)/i;
}

export class GiantRoach extends CreatureNameToken {
	static PATTERN = /(giant roaches\b|giant roach\b)/i;
}

export class GiantRhinoceros extends CreatureNameToken {
	static PATTERN = /(giant rhinoceroses\b|giant rhinoceros\b)/i;
}

export class GiantRhesusMacaque extends CreatureNameToken {
	static PATTERN = /(giant rhesus macaques\b|giant rhesus macaque\b)/i;
}

export class GiantRedWingedBlackbird extends CreatureNameToken {
	static PATTERN = /(giant red-winged blackbirds\b|giant red-winged blackbird\b)/i;
}

export class GiantRedSquirrel extends CreatureNameToken {
	static PATTERN = /(giant red squirrels\b|giant red squirrel\b)/i;
}

export class GiantRedPanda extends CreatureNameToken {
	static PATTERN = /(giant red pandas\b|giant red panda\b)/i;
}

export class GiantRaven extends CreatureNameToken {
	static PATTERN = /(giant ravens\b|giant raven\b)/i;
}

export class GiantRattlesnake extends CreatureNameToken {
	static PATTERN = /(giant rattlesnakes\b|giant rattlesnake\b)/i;
}

export class GiantRat extends CreatureNameToken {
	static PATTERN = /(giant rats\b|giant rat\b)/i;
}

export class GiantRaccoon extends CreatureNameToken {
	static PATTERN = /(giant raccoons\b|giant raccoon\b)/i;
}

export class GiantPython extends CreatureNameToken {
	static PATTERN = /(giant pythons\b|giant python\b)/i;
}

export class GiantPuffin extends CreatureNameToken {
	static PATTERN = /(giant puffins\b|giant puffin\b)/i;
}

export class GiantPorcupine extends CreatureNameToken {
	static PATTERN = /(giant porcupines\b|giant porcupine\b)/i;
}

export class GiantPondTurtle extends CreatureNameToken {
	static PATTERN = /(giant pond turtles\b|giant pond turtle\b)/i;
}

export class GiantPolarBear extends CreatureNameToken {
	static PATTERN = /(giant polar bears\b|giant polar bear\b)/i;
}

export class GiantPlatypus extends CreatureNameToken {
	static PATTERN = /(giant platypuses\b|giant platypus\b)/i;
}

export class GiantPeregrineFalcon extends CreatureNameToken {
	static PATTERN = /(giant peregrine falcons\b|giant peregrine falcon\b)/i;
}

export class GiantPenguin extends CreatureNameToken {
	static PATTERN = /(giant penguins\b|giant penguin\b)/i;
}

export class GiantPeachFacedLovebird extends CreatureNameToken {
	static PATTERN = /(giant peach-faced lovebirds\b|giant peach-faced lovebird\b)/i;
}

export class GiantParakeet extends CreatureNameToken {
	static PATTERN = /(giant parakeets\b|giant parakeet\b)/i;
}

export class GiantPangolin extends CreatureNameToken {
	static PATTERN = /(giant pangolins\b|giant pangolin\b)/i;
}

export class GiantOtter extends CreatureNameToken {
	static PATTERN = /(giant otters\b|giant otter\b)/i;
}

export class GiantOstrich extends CreatureNameToken {
	static PATTERN = /(giant ostriches\b|giant ostrich\b)/i;
}

export class GiantOsprey extends CreatureNameToken {
	static PATTERN = /(giant ospreys\b|giant osprey\b)/i;
}

export class GiantOriole extends CreatureNameToken {
	static PATTERN = /(giant orioles\b|giant oriole\b)/i;
}

export class GiantOrca extends CreatureNameToken {
	static PATTERN = /(giant orcas\b|giant orca\b)/i;
}

export class GiantOpossum extends CreatureNameToken {
	static PATTERN = /(giant opossums\b|giant opossum\b)/i;
}

export class GiantOneHumpedCamel extends CreatureNameToken {
	static PATTERN = /(giant one-humped camels\b|giant one-humped camel\b)/i;
}

export class GiantOlm extends CreatureNameToken {
	static PATTERN = /(giant olms\b|giant olm\b)/i;
}

export class GiantOctopus extends CreatureNameToken {
	static PATTERN = /(giant octopuses\b|giant octopus\b)/i;
}

export class GiantOcelot extends CreatureNameToken {
	static PATTERN = /(giant ocelots\b|giant ocelot\b)/i;
}

export class GiantNautilus extends CreatureNameToken {
	static PATTERN = /(giant nautiluses\b|giant nautilus\b)/i;
}

export class GiantNarwhal extends CreatureNameToken {
	static PATTERN = /(giant narwhals\b|giant narwhal\b)/i;
}

export class GiantMuskox extends CreatureNameToken {
	static PATTERN = /(giant muskoxen\b|giant muskox\b)/i;
}

export class GiantMountainGoat extends CreatureNameToken {
	static PATTERN = /(giant mountain goats\b|giant mountain goat\b)/i;
}

export class GiantMoth extends CreatureNameToken {
	static PATTERN = /(giant moths\b|giant moth\b)/i;
}

export class GiantMosquito extends CreatureNameToken {
	static PATTERN = /(giant mosquitos\b|giant mosquito\b)/i;
}

export class GiantMoose extends CreatureNameToken {
	static PATTERN = /(giant moose\b|giant moose\b)/i;
}

export class GiantMoonSnail extends CreatureNameToken {
	static PATTERN = /(giant moon snails\b|giant moon snail\b)/i;
}

export class GiantMonitorLizard extends CreatureNameToken {
	static PATTERN = /(giant monitor lizards\b|giant monitor lizard\b)/i;
}

export class GiantMongoose extends CreatureNameToken {
	static PATTERN = /(giant mongooses\b|giant mongoose\b)/i;
}

export class GiantMonarchButterfly extends CreatureNameToken {
	static PATTERN = /(giant monarch butterflies\b|giant monarch butterfly\b)/i;
}

export class GiantMole extends CreatureNameToken {
	static PATTERN = /(giant moles\b|giant mole\b)/i;
}

export class GiantMink extends CreatureNameToken {
	static PATTERN = /(giant minks\b|giant mink\b)/i;
}

export class GiantMaskedLovebird extends CreatureNameToken {
	static PATTERN = /(giant masked lovebirds\b|giant masked lovebird\b)/i;
}

export class GiantMantis extends CreatureNameToken {
	static PATTERN = /(giant mantises\b|giant mantis\b)/i;
}

export class GiantMandrill extends CreatureNameToken {
	static PATTERN = /(giant mandrills\b|giant mandrill\b)/i;
}

export class GiantMagpie extends CreatureNameToken {
	static PATTERN = /(giant magpies\b|giant magpie\b)/i;
}

export class GiantLynx extends CreatureNameToken {
	static PATTERN = /(giant lynx\b|giant lynx\b)/i;
}

export class GiantLouse extends CreatureNameToken {
	static PATTERN = /(giant lice\b|giant louse\b)/i;
}

export class GiantLorikeet extends CreatureNameToken {
	static PATTERN = /(giant lorikeets\b|giant lorikeet\b)/i;
}

export class GiantLoon extends CreatureNameToken {
	static PATTERN = /(giant loons\b|giant loon\b)/i;
}

export class GiantLizard extends CreatureNameToken {
	static PATTERN = /(giant lizards\b|giant lizard\b)/i;
}

export class GiantLionTamarin extends CreatureNameToken {
	static PATTERN = /(giant lion tamarins\b|giant lion tamarin\b)/i;
}

export class GiantLion extends CreatureNameToken {
	static PATTERN = /(giant lions\b|giant lion\b)/i;
}

export class GiantLeopardSeal extends CreatureNameToken {
	static PATTERN = /(giant leopard seals\b|giant leopard seal\b)/i;
}

export class GiantLeopardGecko extends CreatureNameToken {
	static PATTERN = /(giant leopard geckos\b|giant leopard gecko\b)/i;
}

export class GiantLeopard extends CreatureNameToken {
	static PATTERN = /(giant leopards\b|giant leopard\b)/i;
}

export class GiantLeech extends CreatureNameToken {
	static PATTERN = /(giant leeches\b|giant leech\b)/i;
}

export class GiantKoala extends CreatureNameToken {
	static PATTERN = /(giant koalas\b|giant koala\b)/i;
}

export class GiantKiwi extends CreatureNameToken {
	static PATTERN = /(giant kiwis\b|giant kiwi\b)/i;
}

export class GiantKingsnake extends CreatureNameToken {
	static PATTERN = /(giant kingsnakes\b|giant kingsnake\b)/i;
}

export class GiantKingCobra extends CreatureNameToken {
	static PATTERN = /(giant king cobras\b|giant king cobra\b)/i;
}

export class GiantKestrel extends CreatureNameToken {
	static PATTERN = /(giant kestrels\b|giant kestrel\b)/i;
}

export class GiantKea extends CreatureNameToken {
	static PATTERN = /(giant kea\b|giant kea\b)/i;
}

export class GiantKangaroo extends CreatureNameToken {
	static PATTERN = /(giant kangaroos\b|giant kangaroo\b)/i;
}

export class GiantKakapo extends CreatureNameToken {
	static PATTERN = /(giant kakapo\b|giant kakapo\b)/i;
}

export class GiantJumpingSpider extends CreatureNameToken {
	static PATTERN = /(giant jumping spiders\b|giant jumping spider\b)/i;
}

export class GiantJaguar extends CreatureNameToken {
	static PATTERN = /(giant jaguars\b|giant jaguar\b)/i;
}

export class GiantJackal extends CreatureNameToken {
	static PATTERN = /(giant jackals\b|giant jackal\b)/i;
}

export class GiantImpala extends CreatureNameToken {
	static PATTERN = /(giant impalas\b|giant impala\b)/i;
}

export class GiantIguana extends CreatureNameToken {
	static PATTERN = /(giant iguanas\b|giant iguana\b)/i;
}

export class GiantIbex extends CreatureNameToken {
	static PATTERN = /(giant ibexes\b|giant ibex\b)/i;
}

export class GiantHyena extends CreatureNameToken {
	static PATTERN = /(giant hyenas\b|giant hyena\b)/i;
}

export class GiantHorseshoeCrab extends CreatureNameToken {
	static PATTERN = /(giant horseshoe crabs\b|giant horseshoe crab\b)/i;
}

export class GiantHornbill extends CreatureNameToken {
	static PATTERN = /(giant hornbills\b|giant hornbill\b)/i;
}

export class GiantHoneyBadger extends CreatureNameToken {
	static PATTERN = /(giant honey badgers\b|giant honey badger\b)/i;
}

export class GiantHoaryMarmot extends CreatureNameToken {
	static PATTERN = /(giant hoary marmots\b|giant hoary marmot\b)/i;
}

export class GiantHippo extends CreatureNameToken {
	static PATTERN = /(giant hippos\b|giant hippo\b)/i;
}

export class GiantHedgehog extends CreatureNameToken {
	static PATTERN = /(giant hedgehogs\b|giant hedgehog\b)/i;
}

export class GiantHarpSeal extends CreatureNameToken {
	static PATTERN = /(giant harp seals\b|giant harp seal\b)/i;
}

export class GiantHare extends CreatureNameToken {
	static PATTERN = /(giant hares\b|giant hare\b)/i;
}

export class GiantHamster extends CreatureNameToken {
	static PATTERN = /(giant hamsters\b|giant hamster\b)/i;
}

export class GiantGrouper extends CreatureNameToken {
	static PATTERN = /(giant groupers\b|giant grouper\b)/i;
}

export class GiantGroundhog extends CreatureNameToken {
	static PATTERN = /(giant groundhogs\b|giant groundhog\b)/i;
}

export class GiantGrizzlyBear extends CreatureNameToken {
	static PATTERN = /(giant grizzly bears\b|giant grizzly bear\b)/i;
}

export class GiantGreyParrot extends CreatureNameToken {
	static PATTERN = /(giant grey parrots\b|giant grey parrot\b)/i;
}

export class GiantGreenTreeFrog extends CreatureNameToken {
	static PATTERN = /(giant green tree frogs\b|giant green tree frog\b)/i;
}

export class GiantGreatHornedOwl extends CreatureNameToken {
	static PATTERN = /(giant great horned owls\b|giant great horned owl\b)/i;
}

export class GiantGraySquirrel extends CreatureNameToken {
	static PATTERN = /(giant gray squirrels\b|giant gray squirrel\b)/i;
}

export class GiantGrayLangur extends CreatureNameToken {
	static PATTERN = /(giant gray langurs\b|giant gray langur\b)/i;
}

export class GiantGrasshopper extends CreatureNameToken {
	static PATTERN = /(giant grasshoppers\b|giant grasshopper\b)/i;
}

export class GiantGrackle extends CreatureNameToken {
	static PATTERN = /(giant grackles\b|giant grackle\b)/i;
}

export class GiantGiraffe extends CreatureNameToken {
	static PATTERN = /(giant giraffes\b|giant giraffe\b)/i;
}

export class GiantGilaMonster extends CreatureNameToken {
	static PATTERN = /(giant gila monsters\b|giant gila monster\b)/i;
}

export class GiantGazelle extends CreatureNameToken {
	static PATTERN = /(giant gazelles\b|giant gazelle\b)/i;
}

export class GiantFox extends CreatureNameToken {
	static PATTERN = /(giant foxes\b|giant fox\b)/i;
}

export class GiantFlyingSquirrel extends CreatureNameToken {
	static PATTERN = /(giant flying squirrels\b|giant flying squirrel\b)/i;
}

export class GiantFly extends CreatureNameToken {
	static PATTERN = /(giant flies\b|giant fly\b)/i;
}

export class GiantFirefly extends CreatureNameToken {
	static PATTERN = /(giant fireflies\b|giant firefly\b)/i;
}

export class GiantEmu extends CreatureNameToken {
	static PATTERN = /(giant emus\b|giant emu\b)/i;
}

export class GiantElk extends CreatureNameToken {
	static PATTERN = /(giant elk\b|giant elk\b)/i;
}

export class GiantElephantSeal extends CreatureNameToken {
	static PATTERN = /(giant elephant seals\b|giant elephant seal\b)/i;
}

export class GiantElephant extends CreatureNameToken {
	static PATTERN = /(giant elephants\b|giant elephant\b)/i;
}

export class GiantEchidna extends CreatureNameToken {
	static PATTERN = /(giant echidnas\b|giant echidna\b)/i;
}

export class GiantEarthworm extends CreatureNameToken {
	static PATTERN = /(giant earthworms\b|giant earthworm\b)/i;
}

export class GiantEagle extends CreatureNameToken {
	static PATTERN = /(giant eagles\b|giant eagle\b)/i;
}

export class GiantDragonfly extends CreatureNameToken {
	static PATTERN = /(giant dragonflies\b|giant dragonfly\b)/i;
}

export class GiantDingo extends CreatureNameToken {
	static PATTERN = /(giant dingoes\b|giant dingo\b)/i;
}

export class GiantDesertTortoise extends CreatureNameToken {
	static PATTERN = /(giant desert tortoises\b|giant desert tortoise\b)/i;
}

export class GiantDeer extends CreatureNameToken {
	static PATTERN = /(giant deer\b|giant deer\b)/i;
}

export class GiantDamselfly extends CreatureNameToken {
	static PATTERN = /(giant damselflies\b|giant damselfly\b)/i;
}

export class GiantCuttlefish extends CreatureNameToken {
	static PATTERN = /(giant cuttlefish\b|giant cuttlefish\b)/i;
}

export class GiantCrow extends CreatureNameToken {
	static PATTERN = /(giant crows\b|giant crow\b)/i;
}

export class GiantCrab extends CreatureNameToken {
	static PATTERN = /(giant crabs\b|giant crab\b)/i;
}

export class GiantCoyote extends CreatureNameToken {
	static PATTERN = /(giant coyotes\b|giant coyote\b)/i;
}

export class GiantCougar extends CreatureNameToken {
	static PATTERN = /(giant cougars\b|giant cougar\b)/i;
}

export class GiantCopperheadSnake extends CreatureNameToken {
	static PATTERN = /(giant copperhead snakes\b|giant copperhead snake\b)/i;
}

export class GiantCockatiel extends CreatureNameToken {
	static PATTERN = /(giant cockatiels\b|giant cockatiel\b)/i;
}

export class GiantCoati extends CreatureNameToken {
	static PATTERN = /(giant coatis\b|giant coati\b)/i;
}

export class GiantChipmunk extends CreatureNameToken {
	static PATTERN = /(giant chipmunks\b|giant chipmunk\b)/i;
}

export class GiantChinchilla extends CreatureNameToken {
	static PATTERN = /(giant chinchillas\b|giant chinchilla\b)/i;
}

export class GiantCheetah extends CreatureNameToken {
	static PATTERN = /(giant cheetahs\b|giant cheetah\b)/i;
}

export class GiantChameleon extends CreatureNameToken {
	static PATTERN = /(giant chameleons\b|giant chameleon\b)/i;
}

export class GiantCaveToad extends CreatureNameToken {
	static PATTERN = /(giant cave toads\b|giant cave toad\b)/i;
}

export class GiantCaveSwallow extends CreatureNameToken {
	static PATTERN = /(giant cave swallows\b|giant cave swallow\b)/i;
}

export class GiantCaveSpider extends CreatureNameToken {
	static PATTERN = /(giant cave spiders\b|giant cave spider\b)/i;
}

export class GiantCassowary extends CreatureNameToken {
	static PATTERN = /(giant cassowaries\b|giant cassowary\b)/i;
}

export class GiantCardinal extends CreatureNameToken {
	static PATTERN = /(giant cardinals\b|giant cardinal\b)/i;
}

export class GiantCapybara extends CreatureNameToken {
	static PATTERN = /(giant capybaras\b|giant capybara\b)/i;
}

export class GiantCapuchin extends CreatureNameToken {
	static PATTERN = /(giant capuchins\b|giant capuchin\b)/i;
}

export class GiantBuzzard extends CreatureNameToken {
	static PATTERN = /(giant buzzards\b|giant buzzard\b)/i;
}

export class GiantBushtit extends CreatureNameToken {
	static PATTERN = /(giant bushtits\b|giant bushtit\b)/i;
}

export class GiantBushmaster extends CreatureNameToken {
	static PATTERN = /(giant bushmasters\b|giant bushmaster\b)/i;
}

export class GiantBrownRecluseSpider extends CreatureNameToken {
	static PATTERN = /(giant brown recluse spiders\b|giant brown recluse spider\b)/i;
}

export class GiantBobcat extends CreatureNameToken {
	static PATTERN = /(giant bobcats\b|giant bobcat\b)/i;
}

export class GiantBluejay extends CreatureNameToken {
	static PATTERN = /(giant bluejays\b|giant bluejay\b)/i;
}

export class GiantBlackMamba extends CreatureNameToken {
	static PATTERN = /(giant black mambas\b|giant black mamba\b)/i;
}

export class GiantBlackBear extends CreatureNameToken {
	static PATTERN = /(giant black bears\b|giant black bear\b)/i;
}

export class GiantBeetle extends CreatureNameToken {
	static PATTERN = /(giant beetles\b|giant beetle\b)/i;
}

export class GiantBeaver extends CreatureNameToken {
	static PATTERN = /(giant beavers\b|giant beaver\b)/i;
}

export class GiantBat extends CreatureNameToken {
	static PATTERN = /(giant bats\b|giant bat\b)/i;
}

export class GiantBarnOwl extends CreatureNameToken {
	static PATTERN = /(giant barn owls\b|giant barn owl\b)/i;
}

export class GiantBarkScorpion extends CreatureNameToken {
	static PATTERN = /(giant bark scorpions\b|giant bark scorpion\b)/i;
}

export class GiantBadger extends CreatureNameToken {
	static PATTERN = /(giant badgers\b|giant badger\b)/i;
}

export class GiantAyeAye extends CreatureNameToken {
	static PATTERN = /(giant aye-ayes\b|giant aye-aye\b)/i;
}

export class GiantAxolotl extends CreatureNameToken {
	static PATTERN = /(giant axolotls\b|giant axolotl\b)/i;
}

export class GiantArmadillo extends CreatureNameToken {
	static PATTERN = /(giant armadillos\b|giant armadillo\b)/i;
}

export class GiantAnole extends CreatureNameToken {
	static PATTERN = /(giant anoles\b|giant anole\b)/i;
}

export class GiantAnaconda extends CreatureNameToken {
	static PATTERN = /(giant anacondas\b|giant anaconda\b)/i;
}

export class GiantAlligator extends CreatureNameToken {
	static PATTERN = /(giant alligators\b|giant alligator\b)/i;
}

export class GiantAlbatross extends CreatureNameToken {
	static PATTERN = /(giant albatrosses\b|giant albatross\b)/i;
}

export class GiantAdder extends CreatureNameToken {
	static PATTERN = /(giant adders\b|giant adder\b)/i;
}

export class GiantAardvark extends CreatureNameToken {
	static PATTERN = /(giant aardvarks\b|giant aardvark\b)/i;
}

export class Giant extends CreatureNameToken {
	static PATTERN = /(giants\b|giant\b)/i;
}

export class GazelleMan extends CreatureNameToken {
	static PATTERN = /(gazelle men\b|gazelle man\b)/i;
}

export class Gazelle extends CreatureNameToken {
	static PATTERN = /(gazelles\b|gazelle\b)/i;
}

export class GabbroMan extends CreatureNameToken {
	static PATTERN = /(gabbro men\b|gabbro man\b)/i;
}

export class FrillShark extends CreatureNameToken {
	static PATTERN = /(frill sharks\b|frill shark\b)/i;
}

export class FoxSquirrel extends CreatureNameToken {
	static PATTERN = /(fox squirrels\b|fox squirrel\b)/i;
}

export class FoxMan extends CreatureNameToken {
	static PATTERN = /(fox men\b|fox man\b)/i;
}

export class Fox extends CreatureNameToken {
	static PATTERN = /(foxes\b|fox\b)/i;
}

export class FoulBlendec extends CreatureNameToken {
	static PATTERN = /(foul blendecs\b|foul blendec\b)/i;
}

export class FlyingSquirrelMan extends CreatureNameToken {
	static PATTERN = /(flying squirrel men\b|flying squirrel man\b)/i;
}

export class FlyingSquirrel extends CreatureNameToken {
	static PATTERN = /(flying squirrels\b|flying squirrel\b)/i;
}

export class FlyMan extends CreatureNameToken {
	static PATTERN = /(fly men\b|fly man\b)/i;
}

export class Fly extends CreatureNameToken {
	static PATTERN = /(flies\b|fly\b)/i;
}

export class FluffyWambler extends CreatureNameToken {
	static PATTERN = /(fluffy wamblers\b|fluffy wambler\b)/i;
}

export class Flounder extends CreatureNameToken {
	static PATTERN = /(flounders\b|flounder\b)/i;
}

export class FloatingGuts extends CreatureNameToken {
	static PATTERN = /(floating guts\b|floating guts\b)/i;
}

export class FleshBall extends CreatureNameToken {
	static PATTERN = /(flesh balls\b|flesh ball\b)/i;
}

export class FireflyMan extends CreatureNameToken {
	static PATTERN = /(firefly men\b|firefly man\b)/i;
}

export class Firefly extends CreatureNameToken {
	static PATTERN = /(fireflies\b|firefly\b)/i;
}

export class FireSnake extends CreatureNameToken {
	static PATTERN = /(fire snakes\b|fire snake\b)/i;
}

export class FireMan extends CreatureNameToken {
	static PATTERN = /(fire men\b|fire man\b)/i;
}

export class FireImp extends CreatureNameToken {
	static PATTERN = /(fire imps\b|fire imp\b)/i;
}

export class Fairy extends CreatureNameToken {
	static PATTERN = /(fairies\b|fairy\b)/i;
}

export class Ettin extends CreatureNameToken {
	static PATTERN = /(ettins\b|ettin\b)/i;
}

export class EmuMan extends CreatureNameToken {
	static PATTERN = /(emu men\b|emu man\b)/i;
}

export class Emu extends CreatureNameToken {
	static PATTERN = /(emus\b|emu\b)/i;
}

export class EmperorPenguin extends CreatureNameToken {
	static PATTERN = /(emperor penguins\b|emperor penguin\b)/i;
}

export class ElkMan extends CreatureNameToken {
	static PATTERN = /(elk men\b|elk man\b)/i;
}

export class ElkBird extends CreatureNameToken {
	static PATTERN = /(elk birds\b|elk bird\b)/i;
}

export class Elk extends CreatureNameToken {
	static PATTERN = /(elk\b|elk\b)/i;
}

export class Elf extends CreatureNameToken {
	static PATTERN = /(elves\b|elf\b)/i;
}

export class ElephantSealMan extends CreatureNameToken {
	static PATTERN = /(elephant seal men\b|elephant seal man\b)/i;
}

export class ElephantSeal extends CreatureNameToken {
	static PATTERN = /(elephant seals\b|elephant seal\b)/i;
}

export class ElephantMan extends CreatureNameToken {
	static PATTERN = /(elephant men\b|elephant man\b)/i;
}

export class Elephant extends CreatureNameToken {
	static PATTERN = /(elephants\b|elephant\b)/i;
}

export class EchidnaMan extends CreatureNameToken {
	static PATTERN = /(echidna men\b|echidna man\b)/i;
}

export class Echidna extends CreatureNameToken {
	static PATTERN = /(echidnas\b|echidna\b)/i;
}

export class EagleMan extends CreatureNameToken {
	static PATTERN = /(eagle men\b|eagle man\b)/i;
}

export class Eagle extends CreatureNameToken {
	static PATTERN = /(eagles\b|eagle\b)/i;
}

export class Dwarf extends CreatureNameToken {
	static PATTERN = /(dwarves\b|dwarf\b)/i;
}

export class Duck extends CreatureNameToken {
	static PATTERN = /(ducks\b|duck\b)/i;
}

export class Drunian extends CreatureNameToken {
	static PATTERN = /(drunians\b|drunian\b)/i;
}

export class Draltha extends CreatureNameToken {
	static PATTERN = /(dralthas\b|draltha\b)/i;
}

export class DragonflyMan extends CreatureNameToken {
	static PATTERN = /(dragonfly men\b|dragonfly man\b)/i;
}

export class Dragonfly extends CreatureNameToken {
	static PATTERN = /(dragonflies\b|dragonfly\b)/i;
}

export class Dragon extends CreatureNameToken {
	static PATTERN = /(dragons\b|dragon\b)/i;
}

export class Donkey extends CreatureNameToken {
	static PATTERN = /(donkeys\b|donkey\b)/i;
}

export class Dog extends CreatureNameToken {
	static PATTERN = /(dogs\b|dog\b)/i;
}

export class DingoMan extends CreatureNameToken {
	static PATTERN = /(dingo men\b|dingo man\b)/i;
}

export class Dingo extends CreatureNameToken {
	static PATTERN = /(dingoes\b|dingo\b)/i;
}

export class DesertTortoiseMan extends CreatureNameToken {
	static PATTERN = /(desert tortoise men\b|desert tortoise man\b)/i;
}

export class DesertTortoise extends CreatureNameToken {
	static PATTERN = /(desert tortoises\b|desert tortoise\b)/i;
}

export class DemonRat extends CreatureNameToken {
	static PATTERN = /(demon rats\b|demon rat\b)/i;
}

export class DeerMan extends CreatureNameToken {
	static PATTERN = /(deer men\b|deer man\b)/i;
}

export class Deer extends CreatureNameToken {
	static PATTERN = /(deer\b|deer\b)/i;
}

export class DarkGnome extends CreatureNameToken {
	static PATTERN = /(dark gnomes\b|dark gnome\b)/i;
}

export class DamselflyMan extends CreatureNameToken {
	static PATTERN = /(damselfly men\b|damselfly man\b)/i;
}

export class Damselfly extends CreatureNameToken {
	static PATTERN = /(damselflies\b|damselfly\b)/i;
}

export class Cyclops extends CreatureNameToken {
	static PATTERN = /(cyclopes\b|cyclops\b)/i;
}

export class CuttlefishMan extends CreatureNameToken {
	static PATTERN = /(cuttlefish men\b|cuttlefish man\b)/i;
}

export class Cuttlefish extends CreatureNameToken {
	static PATTERN = /(cuttlefish\b|cuttlefish\b)/i;
}

export class Crundle extends CreatureNameToken {
	static PATTERN = /(crundles\b|crundle\b)/i;
}

export class CrowMan extends CreatureNameToken {
	static PATTERN = /(crow men\b|crow man\b)/i;
}

export class Crow extends CreatureNameToken {
	static PATTERN = /(crows\b|crow\b)/i;
}

export class CreepyCrawler extends CreatureNameToken {
	static PATTERN = /(creepy crawlers\b|creepy crawler\b)/i;
}

export class CreepingEye extends CreatureNameToken {
	static PATTERN = /(creeping eyes\b|creeping eye\b)/i;
}

export class CrabMan extends CreatureNameToken {
	static PATTERN = /(crab men\b|crab man\b)/i;
}

export class Crab extends CreatureNameToken {
	static PATTERN = /(crabs\b|crab\b)/i;
}

export class CoyoteMan extends CreatureNameToken {
	static PATTERN = /(coyote men\b|coyote man\b)/i;
}

export class Coyote extends CreatureNameToken {
	static PATTERN = /(coyotes\b|coyote\b)/i;
}

export class Cow extends CreatureNameToken {
	static PATTERN = /(cows\b|cow\b)/i;
}

export class CougarMan extends CreatureNameToken {
	static PATTERN = /(cougar men\b|cougar man\b)/i;
}

export class Cougar extends CreatureNameToken {
	static PATTERN = /(cougars\b|cougar\b)/i;
}

export class CopperheadSnakeMan extends CreatureNameToken {
	static PATTERN = /(copperhead snake men\b|copperhead snake man\b)/i;
}

export class CopperheadSnake extends CreatureNameToken {
	static PATTERN = /(copperhead snakes\b|copperhead snake\b)/i;
}

export class CongerEel extends CreatureNameToken {
	static PATTERN = /(conger eels\b|conger eel\b)/i;
}

export class CommonSnappingTurtle extends CreatureNameToken {
	static PATTERN = /(common snapping turtles\b|common snapping turtle\b)/i;
}

export class CommonSkate extends CreatureNameToken {
	static PATTERN = /(common skates\b|common skate\b)/i;
}

export class Coelacanth extends CreatureNameToken {
	static PATTERN = /(coelacanths\b|coelacanth\b)/i;
}

export class Cod extends CreatureNameToken {
	static PATTERN = /(cod\b|cod\b)/i;
}

export class CockatielMan extends CreatureNameToken {
	static PATTERN = /(cockatiel men\b|cockatiel man\b)/i;
}

export class Cockatiel extends CreatureNameToken {
	static PATTERN = /(cockatiels\b|cockatiel\b)/i;
}

export class CoatiMan extends CreatureNameToken {
	static PATTERN = /(coati men\b|coati man\b)/i;
}

export class Coati extends CreatureNameToken {
	static PATTERN = /(coatis\b|coati\b)/i;
}

export class Clownfish extends CreatureNameToken {
	static PATTERN = /(clownfish\b|clownfish\b)/i;
}

export class ClownLoach extends CreatureNameToken {
	static PATTERN = /(clown loaches\b|clown loach\b)/i;
}

export class ChipmunkMan extends CreatureNameToken {
	static PATTERN = /(chipmunk men\b|chipmunk man\b)/i;
}

export class Chipmunk extends CreatureNameToken {
	static PATTERN = /(chipmunks\b|chipmunk\b)/i;
}

export class ChinchillaMan extends CreatureNameToken {
	static PATTERN = /(chinchilla men\b|chinchilla man\b)/i;
}

export class Chinchilla extends CreatureNameToken {
	static PATTERN = /(chinchillas\b|chinchilla\b)/i;
}

export class Chimpanzee extends CreatureNameToken {
	static PATTERN = /(chimpanzees\b|chimpanzee\b)/i;
}

export class Chimera extends CreatureNameToken {
	static PATTERN = /(chimeras\b|chimera\b)/i;
}

export class Chicken extends CreatureNameToken {
	static PATTERN = /(chickens\b|chicken\b)/i;
}

export class CheetahMan extends CreatureNameToken {
	static PATTERN = /(cheetah men\b|cheetah man\b)/i;
}

export class Cheetah extends CreatureNameToken {
	static PATTERN = /(cheetahs\b|cheetah\b)/i;
}

export class Char extends CreatureNameToken {
	static PATTERN = /(char\b|char\b)/i;
}

export class ChameleonMan extends CreatureNameToken {
	static PATTERN = /(chameleon men\b|chameleon man\b)/i;
}

export class Chameleon extends CreatureNameToken {
	static PATTERN = /(chameleons\b|chameleon\b)/i;
}

export class Centaur extends CreatureNameToken {
	static PATTERN = /(centaurs\b|centaur\b)/i;
}

export class Cavy extends CreatureNameToken {
	static PATTERN = /(cavies\b|cavy\b)/i;
}

export class CaveSwallowMan extends CreatureNameToken {
	static PATTERN = /(cave swallow men\b|cave swallow man\b)/i;
}

export class CaveSwallow extends CreatureNameToken {
	static PATTERN = /(cave swallows\b|cave swallow\b)/i;
}

export class CaveSpider extends CreatureNameToken {
	static PATTERN = /(cave spiders\b|cave spider\b)/i;
}

export class CaveLobster extends CreatureNameToken {
	static PATTERN = /(cave lobsters\b|cave lobster\b)/i;
}

export class CaveFloater extends CreatureNameToken {
	static PATTERN = /(cave floaters\b|cave floater\b)/i;
}

export class CaveFishMan extends CreatureNameToken {
	static PATTERN = /(cave fish men\b|cave fish man\b)/i;
}

export class CaveFish extends CreatureNameToken {
	static PATTERN = /(cave fish\b|cave fish\b)/i;
}

export class CaveDragon extends CreatureNameToken {
	static PATTERN = /(cave dragons\b|cave dragon\b)/i;
}

export class CaveCrocodile extends CreatureNameToken {
	static PATTERN = /(cave crocodiles\b|cave crocodile\b)/i;
}

export class CaveBlob extends CreatureNameToken {
	static PATTERN = /(cave blobs\b|cave blob\b)/i;
}

export class Cat extends CreatureNameToken {
	static PATTERN = /(cats\b|cat\b)/i;
}

export class CassowaryMan extends CreatureNameToken {
	static PATTERN = /(cassowary men\b|cassowary man\b)/i;
}

export class Cassowary extends CreatureNameToken {
	static PATTERN = /(cassowaries\b|cassowary\b)/i;
}

export class Carp extends CreatureNameToken {
	static PATTERN = /(carp\b|carp\b)/i;
}

export class CardinalMan extends CreatureNameToken {
	static PATTERN = /(cardinal men\b|cardinal man\b)/i;
}

export class Cardinal extends CreatureNameToken {
	static PATTERN = /(cardinals\b|cardinal\b)/i;
}

export class CapybaraMan extends CreatureNameToken {
	static PATTERN = /(capybara men\b|capybara man\b)/i;
}

export class Capybara extends CreatureNameToken {
	static PATTERN = /(capybaras\b|capybara\b)/i;
}

export class CapuchinMan extends CreatureNameToken {
	static PATTERN = /(capuchin men\b|capuchin man\b)/i;
}

export class Capuchin extends CreatureNameToken {
	static PATTERN = /(capuchins\b|capuchin\b)/i;
}

export class CapHopper extends CreatureNameToken {
	static PATTERN = /(cap hoppers\b|cap hopper\b)/i;
}

export class BuzzardMan extends CreatureNameToken {
	static PATTERN = /(buzzard men\b|buzzard man\b)/i;
}

export class Buzzard extends CreatureNameToken {
	static PATTERN = /(buzzards\b|buzzard\b)/i;
}

export class BushtitMan extends CreatureNameToken {
	static PATTERN = /(bushtit men\b|bushtit man\b)/i;
}

export class Bushtit extends CreatureNameToken {
	static PATTERN = /(bushtits\b|bushtit\b)/i;
}

export class BushmasterMan extends CreatureNameToken {
	static PATTERN = /(bushmaster men\b|bushmaster man\b)/i;
}

export class Bushmaster extends CreatureNameToken {
	static PATTERN = /(bushmasters\b|bushmaster\b)/i;
}

export class Bumblebee extends CreatureNameToken {
	static PATTERN = /(bumblebees\b|bumblebee\b)/i;
}

export class BullShark extends CreatureNameToken {
	static PATTERN = /(bull sharks\b|bull shark\b)/i;
}

export class Bugbat extends CreatureNameToken {
	static PATTERN = /(bugbats\b|bugbat\b)/i;
}

export class BrownRecluseSpiderMan extends CreatureNameToken {
	static PATTERN = /(brown recluse spider men\b|brown recluse spider man\b)/i;
}

export class BrownRecluseSpider extends CreatureNameToken {
	static PATTERN = /(brown recluse spiders\b|brown recluse spider\b)/i;
}

export class BrownBullhead extends CreatureNameToken {
	static PATTERN = /(brown bullheads\b|brown bullhead\b)/i;
}

export class BrookLamprey extends CreatureNameToken {
	static PATTERN = /(brook lampreys\b|brook lamprey\b)/i;
}

export class BronzeColossus extends CreatureNameToken {
	static PATTERN = /(bronze colossuses\b|bronze colossus\b)/i;
}

export class Bonobo extends CreatureNameToken {
	static PATTERN = /(bonobos\b|bonobo\b)/i;
}

export class BobcatMan extends CreatureNameToken {
	static PATTERN = /(bobcat men\b|bobcat man\b)/i;
}

export class Bobcat extends CreatureNameToken {
	static PATTERN = /(bobcats\b|bobcat\b)/i;
}

export class BluejayMan extends CreatureNameToken {
	static PATTERN = /(bluejay men\b|bluejay man\b)/i;
}

export class Bluefish extends CreatureNameToken {
	static PATTERN = /(bluefish\b|bluefish\b)/i;
}

export class BluefinTuna extends CreatureNameToken {
	static PATTERN = /(bluefin tuna\b|bluefin tuna\b)/i;
}

export class BlueShark extends CreatureNameToken {
	static PATTERN = /(blue sharks\b|blue shark\b)/i;
}

export class BluePeafowl extends CreatureNameToken {
	static PATTERN = /(blue peafowls\b|blue peafowl\b)/i;
}

export class BlueJay extends CreatureNameToken {
	static PATTERN = /(blue jays\b|blue jay\b)/i;
}

export class BloodMan extends CreatureNameToken {
	static PATTERN = /(blood men\b|blood man\b)/i;
}

export class BloodGnat extends CreatureNameToken {
	static PATTERN = /(blood gnats\b|blood gnat\b)/i;
}

export class BlizzardMan extends CreatureNameToken {
	static PATTERN = /(blizzard men\b|blizzard man\b)/i;
}

export class BlindCaveOgre extends CreatureNameToken {
	static PATTERN = /(blind cave ogres\b|blind cave ogre\b)/i;
}

export class BlindCaveBear extends CreatureNameToken {
	static PATTERN = /(blind cave bears\b|blind cave bear\b)/i;
}

export class BlacktipReefShark extends CreatureNameToken {
	static PATTERN = /(blacktip reef sharks\b|blacktip reef shark\b)/i;
}

export class BlackHandedGibbon extends CreatureNameToken {
	static PATTERN = /(black-handed gibbons\b|black-handed gibbon\b)/i;
}

export class BlackCrestedGibbon extends CreatureNameToken {
	static PATTERN = /(black-crested gibbons\b|black-crested gibbon\b)/i;
}

export class BlackMambaMan extends CreatureNameToken {
	static PATTERN = /(black mamba men\b|black mamba man\b)/i;
}

export class BlackMamba extends CreatureNameToken {
	static PATTERN = /(black mambas\b|black mamba\b)/i;
}

export class BlackBullhead extends CreatureNameToken {
	static PATTERN = /(black bullheads\b|black bullhead\b)/i;
}

export class BlackBearMan extends CreatureNameToken {
	static PATTERN = /(black bear men\b|black bear man\b)/i;
}

export class BlackBear extends CreatureNameToken {
	static PATTERN = /(black bears\b|black bear\b)/i;
}

export class Bilou extends CreatureNameToken {
	static PATTERN = /(bilous\b|bilou\b)/i;
}

export class BeetleMan extends CreatureNameToken {
	static PATTERN = /(beetle men\b|beetle man\b)/i;
}

export class Beetle extends CreatureNameToken {
	static PATTERN = /(beetles\b|beetle\b)/i;
}

export class BeaverMan extends CreatureNameToken {
	static PATTERN = /(beaver men\b|beaver man\b)/i;
}

export class Beaver extends CreatureNameToken {
	static PATTERN = /(beavers\b|beaver\b)/i;
}

export class BeakDog extends CreatureNameToken {
	static PATTERN = /(beak dogs\b|beak dog\b)/i;
}

export class BatRay extends CreatureNameToken {
	static PATTERN = /(bat rays\b|bat ray\b)/i;
}

export class BatMan extends CreatureNameToken {
	static PATTERN = /(bat men\b|bat man\b)/i;
}

export class Bat extends CreatureNameToken {
	static PATTERN = /(bats\b|bat\b)/i;
}

export class BaskingShark extends CreatureNameToken {
	static PATTERN = /(basking sharks\b|basking shark\b)/i;
}

export class BarnOwlMan extends CreatureNameToken {
	static PATTERN = /(barn owl men\b|barn owl man\b)/i;
}

export class BarnOwl extends CreatureNameToken {
	static PATTERN = /(barn owls\b|barn owl\b)/i;
}

export class BarkScorpionMan extends CreatureNameToken {
	static PATTERN = /(bark scorpion men\b|bark scorpion man\b)/i;
}

export class BarkScorpion extends CreatureNameToken {
	static PATTERN = /(bark scorpions\b|bark scorpion\b)/i;
}

export class BandedKnifefish extends CreatureNameToken {
	static PATTERN = /(banded knifefish\b|banded knifefish\b)/i;
}

export class BadgerMan extends CreatureNameToken {
	static PATTERN = /(badger men\b|badger man\b)/i;
}

export class Badger extends CreatureNameToken {
	static PATTERN = /(badgers\b|badger\b)/i;
}

export class AyeAyeMan extends CreatureNameToken {
	static PATTERN = /(aye-aye men\b|aye-aye man\b)/i;
}

export class AyeAye extends CreatureNameToken {
	static PATTERN = /(aye-ayes\b|aye-aye\b)/i;
}

export class AxolotlMan extends CreatureNameToken {
	static PATTERN = /(axolotl men\b|axolotl man\b)/i;
}

export class Axolotl extends CreatureNameToken {
	static PATTERN = /(axolotls\b|axolotl\b)/i;
}

export class ArmadilloMan extends CreatureNameToken {
	static PATTERN = /(armadillo men\b|armadillo man\b)/i;
}

export class Armadillo extends CreatureNameToken {
	static PATTERN = /(armadillos\b|armadillo\b)/i;
}

export class Antman extends CreatureNameToken {
	static PATTERN = /(antmen\b|antman\b)/i;
}

export class Ant extends CreatureNameToken {
	static PATTERN = /(ants\b|ant\b)/i;
}

export class AnoleMan extends CreatureNameToken {
	static PATTERN = /(anole men\b|anole man\b)/i;
}

export class Anole extends CreatureNameToken {
	static PATTERN = /(anoles\b|anole\b)/i;
}

export class Angelshark extends CreatureNameToken {
	static PATTERN = /(angelsharks\b|angelshark\b)/i;
}

export class Anchovy extends CreatureNameToken {
	static PATTERN = /(anchovies\b|anchovy\b)/i;
}

export class AnacondaMan extends CreatureNameToken {
	static PATTERN = /(anaconda men\b|anaconda man\b)/i;
}

export class Anaconda extends CreatureNameToken {
	static PATTERN = /(anacondas\b|anaconda\b)/i;
}

export class AmphibianMan extends CreatureNameToken {
	static PATTERN = /(amphibian men\b|amphibian man\b)/i;
}

export class AmethystMan extends CreatureNameToken {
	static PATTERN = /(amethyst men\b|amethyst man\b)/i;
}

export class Alpaca extends CreatureNameToken {
	static PATTERN = /(alpacas\b|alpaca\b)/i;
}

export class AlligatorSnappingTurtle extends CreatureNameToken {
	static PATTERN = /(alligator snapping turtles\b|alligator snapping turtle\b)/i;
}

export class AlligatorMan extends CreatureNameToken {
	static PATTERN = /(alligator men\b|alligator man\b)/i;
}

export class Alligator extends CreatureNameToken {
	static PATTERN = /(alligators\b|alligator\b)/i;
}

export class AlbatrossMan extends CreatureNameToken {
	static PATTERN = /(albatross men\b|albatross man\b)/i;
}

export class Albatross extends CreatureNameToken {
	static PATTERN = /(albatrosses\b|albatross\b)/i;
}

export class AdderMan extends CreatureNameToken {
	static PATTERN = /(adder men\b|adder man\b)/i;
}

export class Adder extends CreatureNameToken {
	static PATTERN = /(adders\b|adder\b)/i;
}

export class AcornFly extends CreatureNameToken {
	static PATTERN = /(acorn flies\b|acorn fly\b)/i;
}

export class AardvarkMan extends CreatureNameToken {
	static PATTERN = /(aardvark men\b|aardvark man\b)/i;
}

export class Aardvark extends CreatureNameToken {
	static PATTERN = /(aardvarks\b|aardvark\b)/i;
}
