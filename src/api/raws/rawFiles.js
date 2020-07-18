import R from 'ramda';
import path from 'path';
import {parallel} from 'fluture';
import {glob, fileMeta} from './../../utility/fs';
import types from './types';

export const typeToFilePrefixMap = {
	[types.BODY_DETAIL_PLAN]: 'b_detail_plan',
	[types.BODY]: 'body',
	[types.BUILDING]: 'building',
	[types.CREATURE_VARIATION]: 'c_variation',
	[types.CREATURE]: 'creature',
	[types.DESCRIPTOR_COLOR]: 'descriptor_color',
	[types.DESCRIPTOR_PATTERN]: 'descriptor_pattern',
	[types.DESCRIPTOR_SHAPE]: 'descriptor_shape',
	[types.ENTITY]: 'entity',
	[types.INORGANIC]: 'inorganic',
	[types.INTERACTION]: 'interaction',
	[types.ITEM_AMMO]: 'item_ammo',
	[types.ITEM_ARMOR]: 'item_armor',
	[types.ITEM_FOOD]: 'item_food',
	[types.ITEM_GLOVES]: 'item_gloves',
	[types.ITEM_HELMET]: 'item_helmet',
	[types.ITEM_PANTS]: 'item_pants',
	[types.ITEM_SHIELD]: 'item_shield',
	[types.ITEM_SHOES]: 'item_shoes',
	[types.ITEM_SIEGE_AMMO]: 'item_siegeammo',
	[types.ITEM_TOOL]: 'item_tool',
	[types.ITEM_TOY]: 'item_toy',
	[types.ITEM_TRAP_COMPONENT]: 'item_trapcomp',
	[types.ITEM_WEAPON]: 'item_weapon',
	[types.LANGUAGE]: 'language',
	[types.MATERIAL_TEMPLATE]: 'material_template',
	[types.PLANT]: 'plant',
	[types.REACTION]: 'reaction',
	[types.TISSUE_TEMPLATE]: 'tissue_template'
};

const makeFilesFunction = R.curry((prefix, rawFileType, installPath) =>
	R.compose(
		R.map(R.map(R.merge(R.objOf('rawFileType')))),
		R.chain(R.compose(parallel(Number.POSITIVE_INFINITY), R.map(fileMeta))),
		glob(`${prefix}_*.txt`),
		R.compose(R.merge({nodir: true, absolute: true}), R.objOf('cwd')),
		(p) => path.resolve(p, 'raw/objects')
	)(installPath)
);

const fileTypes = R.mapObjIndexed(
	(prefix, rawFileType) => makeFilesFunction(prefix, rawFileType),
	typeToFilePrefixMap
);

/** Get all the raw files for an install
 * @param {string} installPath
 * @returns {Future<RawFile[]>}
 */
export function getAllRawFiles(installPath) {
	return R.compose(
		R.map(R.flatten),
		parallel(Number.POSITIVE_INFINITY),
		R.map(([rawFileType, fileFuture]) =>
			R.map(R.map(R.merge(R.__, {rawFileType, installPath})), fileFuture)
		),
		R.toPairs,
		R.map(R.__, fileTypes),
		R.applyTo
	)(installPath);
}

export default fileTypes;
