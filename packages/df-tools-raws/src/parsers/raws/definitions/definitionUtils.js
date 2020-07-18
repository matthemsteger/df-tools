import {map, prop, curry} from 'ramda';

const addChildToParent = curry((parent, child) => {
	const enhancedChild = {...child};
	Object.defineProperty(enhancedChild, 'parent', {
		value: parent,
		enumerable: true
	});

	return enhancedChild;
});

export function withChildren(definition, children) {
	const possibleChildNames = map(prop('name'), children);

	const def = {
		...definition
	};

	const enhancedChildren = map(addChildToParent(def), children);
	def.children = enhancedChildren;

	Object.defineProperties(def, {
		possibleChildNames: {
			value: possibleChildNames,
			enumerable: true
		}
	});

	return def;
}

export function isRequired(definition) {
	return {
		...definition,
		required: true
	};
}
