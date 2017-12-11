import R from 'ramda';
import path from 'path';
import glob from 'glob';
import {node} from 'fluture';

export const typeToFilePrefixMap = {
	bodyDetailPlan: 'b_detail_plan',
	body: 'body',
	building: 'building',
	creatureVariation: 'c_variation',
	creature: 'creature',
	descriptorColor: 'descriptor_color',
	descriptorPattern: 'descriptor_pattern',
	descriptorShape: 'descriptor_shape',
	entity: 'entity',
	inorganic: 'inorganic',
	interaction: 'interaction',
	itemAmmo: 'item_ammo',
	itemArmor: 'item_armor',
	itemFood: 'item_food',
	itemGloves: 'item_gloves',
	itemHelmet: 'item_helmet',
	itemPants: 'item_pants',
	itemShield: 'item_shield',
	itemShoes: 'item_shoes',
	itemSiegeAmmo: 'item_siegeammo',
	itemTool: 'item_tool',
	itemToy: 'item_toy',
	itemTrapComponent: 'item_trapcomp',
	itemWeapon: 'item_weapon',
	language: 'language',
	materialTemplate: 'material_template',
	plant: 'plant',
	reaction: 'reaction',
	tissueTemplate: 'tissue_template'
};

const makeFilesFunction = R.curry((prefix, installPath) =>
	node((done) => glob(`${prefix}_*.txt`, {cwd: path.resolve(installPath, 'raw/objects'), nodir: true, absolute: true}, done))
);

export default R.map((prefix) => makeFilesFunction(prefix), typeToFilePrefixMap);
