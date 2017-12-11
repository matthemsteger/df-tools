
export function civilizedPopulation({race, population = 0}) {
	return {
		race,
		population
	};
}

export default function civilizedWorldPopulation({
	civilizedPopulations = [],
	total = 0
} = {}) {
	return {
		civilizedPopulations,
		total
	};
}
