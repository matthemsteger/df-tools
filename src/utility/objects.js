import R from 'ramda';

export const propsPath = R.curry((paths, obj) => R.ap([R.path(R.__, obj)], paths));

export const renameKeys = R.curry((keysMap, obj) =>
	R.reduce((acc, key) => R.assoc(keysMap[key] || key, obj[key], acc), {}, R.keys(obj))
);

export const deriveObjFromPaths = R.curry((paths, props) =>
	R.compose(R.zipObj(props), propsPath(paths))
);
