import {map, prop, invertObject} from 'ramda';
import creaturesFile from '../models/files/creature';

export const fileTypeDefinitions = {
	BODY_DETAIL_PLAN: {api: 'bodyDetailPlan', filePrefix: 'b_detail_plan'},
	BODY: {api: 'body', filePrefix: 'body'},
	BUILDING: {api: 'building', filePrefix: 'building'},
	CREATURE_VARIATION: {api: 'creatureVariation', filePrefix: 'c_variation'},
	CREATURE: {
		api: 'creature',
		filePrefix: 'creature',
		fileModel: creaturesFile
	},
	DESCRIPTOR_COLOR: {api: 'descriptorColor', filePrefix: 'descriptor_color'},
	DESCRIPTOR_PATTERN: {
		api: 'descriptorPattern',
		filePrefix: 'descriptor_pattern'
	},
	DESCRIPTOR_SHAPE: {api: 'descriptorShape', filePrefix: 'descriptor_shape'},
	ENTITY: {api: 'entity', filePrefix: 'entity'},
	INORGANIC: {api: 'inorganic', filePrefix: 'inorganic'},
	INTERACTION: {api: 'interaction', filePrefix: 'interaction'},
	ITEM_AMMO: {api: 'itemAmmo', filePrefix: 'item_ammo'},
	ITEM_ARMOR: {api: 'itemArmor', filePrefix: 'item_armor'},
	ITEM_FOOD: {api: 'itemFood', filePrefix: 'item_food'},
	ITEM_GLOVES: {api: 'itemGloves', filePrefix: 'item_gloves'},
	ITEM_HELMET: {api: 'itemHelmet', filePrefix: 'item_helmet'},
	ITEM_PANTS: {api: 'itemPants', filePrefix: 'item_pants'},
	ITEM_SHIELD: {api: 'itemShield', filePrefix: 'item_shield'},
	ITEM_SHOES: {api: 'itemShoes', filePrefix: 'item_shoes'},
	ITEM_SIEGE_AMMO: {api: 'itemSiegeAmmo', filePrefix: 'item_siegeammo'},
	ITEM_TOOL: {api: 'itemTool', filePrefix: 'item_tool'},
	ITEM_TOY: {api: 'itemToy', filePrefix: 'item_toy'},
	ITEM_TRAP_COMPONENT: {
		api: 'itemTrapComponent',
		filePrefix: 'item_trapcomp'
	},
	ITEM_WEAPON: {api: 'itemWeapon', filePrefix: 'item_weapon'},
	LANGUAGE: {api: 'language', filePrefix: 'language'},
	MATERIAL_TEMPLATE: {
		api: 'materialTemplate',
		filePrefix: 'material_template'
	},
	PLANT: {api: 'plant', filePrefix: 'plant'},
	REACTION: {api: 'reaction', filePrefix: 'reaction'},
	TISSUE_TEMPLATE: {api: 'tissueTemplate', filePrefix: 'tissue_template'}
};

export const fileTypeToFilePrefixMap = map(
	prop('filePrefix'),
	fileTypeDefinitions
);

export const filePrefixToFileTypeMap = invertObject(fileTypeToFilePrefixMap);

export const fileTypeToApiName = map(prop('api'), fileTypeDefinitions);
