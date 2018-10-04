import {
	ADJECTIVE,
	ARMORLEVEL,
	BARRED,
	BLOCKCHANCE,
	CHAIN_METAL_TEXT,
	COVERAGE,
	HARD,
	LAYER,
	LAYER_PERMIT,
	LAYER_SIZE,
	LBSTEP,
	LEATHER,
	MATERIAL_PLACEHOLDER,
	MATERIAL_SIZE,
	METAL,
	METAL_ARMOR_LEVELS,
	NAME,
	PREPLURAL,
	SCALED,
	SHAPED,
	SOFT,
	STRUCTURAL_ELASTICITY_CHAIN_ALL,
	STRUCTURAL_ELASTICITY_CHAIN_METAL,
	STRUCTURAL_ELASTICITY_WOVEN_THREAD,
	UBSTEP,
	UPSTEP
} from '../generatedDefinitions';
import {isRequired} from '../definitionUtils';

export default [
	ADJECTIVE,
	ARMORLEVEL,
	BARRED,
	BLOCKCHANCE,
	CHAIN_METAL_TEXT,
	COVERAGE,
	HARD,
	LAYER,
	LAYER_PERMIT,
	LAYER_SIZE,
	LBSTEP,
	LEATHER,
	MATERIAL_PLACEHOLDER,
	isRequired(MATERIAL_SIZE),
	METAL,
	METAL_ARMOR_LEVELS,
	isRequired(NAME),
	PREPLURAL,
	SCALED,
	SHAPED,
	SOFT,
	STRUCTURAL_ELASTICITY_CHAIN_ALL,
	STRUCTURAL_ELASTICITY_CHAIN_METAL,
	STRUCTURAL_ELASTICITY_WOVEN_THREAD,
	UBSTEP,
	UPSTEP
];
