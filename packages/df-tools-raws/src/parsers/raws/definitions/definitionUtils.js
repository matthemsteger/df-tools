export function withChildren(definition, children) {
	return {
		...definition,
		children
	};
}

export function isRequired(definition) {
	return {
		...definition,
		required: true
	};
}
