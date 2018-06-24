import R from 'ramda';
import {makeCamelCaseTransducer} from './../../modelHelpers';
import {parseBase10Int} from './../../../utility/numbers';

export function dim({x, y} = {}) {
	return {x, y};
}

export function beastEndYear({startYear, percentage} = {}) {
	return {startYear, percentage};
}

export function minMaxVariance({min, max, varianceX, varianceY} = {}) {
	return {min, max, varianceX, varianceY};
}

export const meshValues = {
	IGNORE: 1,
	TWO_BY_TWO: 2,
	FOUR_BY_FOUR: 3,
	EIGHT_BY_EIGHT: 4,
	SIXTEEN_BY_16: 5,
	THIRTYTWO_BY_THIRTYTWO: 6
};

export function meshFrequency({mesh, weights} = {}) {
	if (!Array.isArray(weights))
		throw new Error('weights must be an array of weights');
	if (weights.length !== 5)
		throw new Error('weights must be an array of length 5');

	return {
		mesh,
		weights
	};
}

export const poles = {
	NONE: 'NONE',
	NORTH_OR_SOUTH: 'NORTH_OR_SOUTH',
	NORTH_AND_OR_SOUTH: 'NORTH_AND_OR_SOUTH',
	NORTH: 'NORTH',
	SOUTH: 'SOUTH',
	NORTH_AND_SOUTH: 'NORTH_AND_SOUTH'
};

export function titanAttackTrigger({
	population,
	exportedWealth,
	createdWealth
} = {}) {
	return {population, exportedWealth, createdWealth};
}

export function squareCounts({smallRegion, mediumRegion, largeRegion} = {}) {
	return {smallRegion, mediumRegion, largeRegion};
}

export function minimumSquareCounts({initial, initialRegion, final} = {}) {
	return {initial, initialRegion, final};
}

export function riverMins({preErosion, postErosion} = {}) {
	return {preErosion, postErosion};
}

export function minimumLowMedHighSquares({low, medium, high} = {}) {
	return {low, medium, high};
}

export const dimTransducer = makeCamelCaseTransducer(
	R.compose(
		dim,
		R.zipObj(['x', 'y']),
		R.map(parseBase10Int)
	)
);

export const beastEndYearTransducer = makeCamelCaseTransducer(
	R.compose(
		beastEndYear,
		R.zipObj(['startYear', 'percentage']),
		R.map(parseBase10Int)
	)
);

export const meshFrequencyTransducer = makeCamelCaseTransducer(
	R.compose(
		meshFrequency,
		R.zipObj(['mesh', 'weights']),
		R.adjust(R.head, 0),
		R.splitAt(1),
		R.map(parseBase10Int)
	)
);

export const titanAttackTriggerTransducer = makeCamelCaseTransducer(
	R.compose(
		titanAttackTrigger,
		R.zipObj(['population', 'exportedWealth', 'createdWealth']),
		R.map(parseBase10Int)
	)
);

export const squareCountTransducer = makeCamelCaseTransducer(
	R.compose(
		squareCounts,
		R.zipObj(['smallRegion', 'mediumRegion', 'largeRegion']),
		R.map(parseBase10Int)
	)
);

// region counts transducer will just return an object, the transform function will merge deep
export const regionCountsTransducer = makeCamelCaseTransducer(
	R.converge(
		(type, minSquareCounts) => ({
			[type]: minimumSquareCounts(minSquareCounts)
		}),
		[
			R.head,
			R.compose(
				R.zipObj(['initial', 'initialRegion', 'final']),
				R.map(parseBase10Int),
				R.tail
			)
		]
	)
);

export const riverMinsTransducer = makeCamelCaseTransducer(
	R.compose(
		riverMins,
		R.zipObj(['preErosion', 'postErosion']),
		R.map(parseBase10Int)
	)
);

export const minLowMedHighSquaresTransducer = makeCamelCaseTransducer(
	R.compose(
		minimumLowMedHighSquares,
		R.zipObj(['low', 'medium', 'high']),
		R.map(parseBase10Int)
	)
);
