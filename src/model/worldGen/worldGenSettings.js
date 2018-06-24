import _ from 'lodash';

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
	if (!_.isArray(weights))
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
