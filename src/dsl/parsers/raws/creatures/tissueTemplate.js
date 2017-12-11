import {createRawFileParser} from './../generic';

export const definition = [
	['ARTERIES'],
	['BREATHE'],
	['CONNECTS'],
	['CONNECTIVE_TISSUE_ANCHOR'],
	['COSMETIC'],
	['FLIGHT'],
	['FUNCTIONAL'],
	['HEALING_RATE', 1],
	['HEAR'],
	['INSULATION', 1],
	['MAJOR_ARTERIES'],
	['MUSCULAR'],
	['NERVOUS'],
	['PAIN_RECEPTORS', 1],
	['RELATIVE_THICKNESS', 1],
	['SCARS'],
	['SETTABLE'],
	['SIGHT'],
	['SMELL'],
	['SPLINTABLE'],
	['STRUCTURAL'],
	['STYLEABLE'],
	['SUBORDINATE_TO_TISSUE', 1],
	['THICKENS_OR_STRENGTH'],
	['THICKENS_OR_ENERGY_STORAGE'],
	['THOUGHT'],
	['TISSUE_LEAKS'],
	['TISSUE_MATERIAL', Number.NaN],
	['TISSUE_MAT_STATE', 1],
	['TISSUE_NAME', 2],
	['TISSUE_SHAPE', 1],
	['VASCULAR', 1]
];

export default createRawFileParser({
	rawObject: 'TISSUE_TEMPLATE',
	children: definition
});
