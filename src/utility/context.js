import R from 'ramda';

const mutatingMerge = R.curry((target, source) =>
	Object.assign(target, source)
);
export const mergeContext = (context) => mutatingMerge(context);
export const zipToContext = R.curry((context, props) =>
	R.compose(
		mutatingMerge(context),
		R.zipObj(props)
	)
);
export const valueToContext = R.curry((context, prop) =>
	R.compose(
		mutatingMerge(context),
		R.objOf(prop)
	)
);
export const debugContext = R.curry((debug, context) => {
	const keys = R.keys(context);
	debug(
		R.join(', ', R.map((key) => `${key}: %o`, keys)),
		...R.values(context)
	);
});
export const debugFilteredContext = R.curry((debug, props, context) =>
	R.compose(
		debugContext(debug),
		R.pick(props)
	)(context)
);

export const createContext = (context) => ({
	mergeIntoContext: mergeContext(context),
	zipIntoContext: zipToContext(context),
	valueIntoContext: valueToContext(context)
});
