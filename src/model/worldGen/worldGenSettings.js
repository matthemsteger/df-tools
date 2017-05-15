import _ from 'lodash';

export class Dim {
	constructor({x, y} = {}) {
		this.x = x;
		this.y = y;
	}
}

export class BeastEndYear {
	constructor({startYear, percentage} = {}) {
		this.startYear = startYear;
		this.percentage = percentage;
	}
}

export class MinMaxVariance {
	constructor({min, max, varianceX, varianceY} = {}) {
		this.min = min;
		this.max = max;
		this.varianceX = varianceX;
		this.varianceY = varianceY;
	}
}

export class MeshFrequency {
	constructor({mesh, weights} = {}) {
		this.mesh = mesh;
		if (!_.isArray(weights)) throw new Error('weights must be an array of weights');
		if (weights.length !== 5) throw new Error('weights must be an array of length 5');
		this.weights = weights;
	}

	static meshValues = {
		IGNORE: 1,
		TWO_BY_TWO: 2,
		FOUR_BY_FOUR: 3,
		EIGHT_BY_EIGHT: 4,
		SIXTEEN_BY_16: 5,
		THIRTYTWO_BY_THIRTYTWO: 6
	}
}

export const poles = {
	NONE: 'NONE',
	NORTH_OR_SOUTH: 'NORTH_OR_SOUTH',
	NORTH_AND_OR_SOUTH: 'NORTH_AND_OR_SOUTH',
	NORTH: 'NORTH',
	SOUTH: 'SOUTH',
	NORTH_AND_SOUTH: 'NORTH_AND_SOUTH'
};

export class TitanAttackTrigger {
	constructor({population, exportedWealth, createdWealth} = {}) {
		this.population = population;
		this.exportedWealth = exportedWealth;
		this.createdWealth = createdWealth;
	}
}

export class SquareCounts {
	constructor({smallRegion, mediumRegion, largeRegion} = {}) {
		this.smallRegion = smallRegion;
		this.mediumRegion = mediumRegion;
		this.largeRegion = largeRegion;
	}
}

export class MinimumSquareCounts {
	constructor({initial, initialRegion, final} = {}) {
		this.initial = initial;
		this.initialRegion = initialRegion;
		this.final = final;
	}
}

export class RiverMins {
	constructor({preErosion, postErosion} = {}) {
		this.preErosion = preErosion;
		this.postErosion = postErosion;
	}
}

export class MinimumLowMedHighSquares {
	constructor({low, medium, high} = {}) {
		this.low = low;
		this.medium = medium;
		this.high = high;
	}
}
