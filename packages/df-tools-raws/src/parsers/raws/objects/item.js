import P from 'parsimmon';
import createParserFromDefinition from '../createParserFromDefinition';
import itemAmmo from '../definitions/itemAmmo';
import itemArmor from '../definitions/itemArmor';
import itemFood from '../definitions/itemFood';
import itemGloves from '../definitions/itemGloves';
import itemHelm from '../definitions/itemHelm';
import itemPants from '../definitions/itemPants';
import itemShield from '../definitions/itemShield';
import itemShoes from '../definitions/itemShoes';
import itemSiegeAmmo from '../definitions/itemSiegeAmmo';
import itemTool from '../definitions/itemTool';
import itemToy from '../definitions/itemToy';
import itemTrapComp from '../definitions/itemTrapComp';
import itemWeapon from '../definitions/itemWeapon';

export default P.alt(
	createParserFromDefinition(itemAmmo),
	createParserFromDefinition(itemArmor),
	createParserFromDefinition(itemFood),
	createParserFromDefinition(itemGloves),
	createParserFromDefinition(itemHelm),
	createParserFromDefinition(itemPants),
	createParserFromDefinition(itemShield),
	createParserFromDefinition(itemShoes),
	createParserFromDefinition(itemSiegeAmmo),
	createParserFromDefinition(itemTool),
	createParserFromDefinition(itemToy),
	createParserFromDefinition(itemTrapComp),
	createParserFromDefinition(itemWeapon)
);
