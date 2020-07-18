/**
 * @param {[string, number]} definition
 */
function generateDefinitionBlock([name, numArgs]) {
	const isVariable = Number.isNaN(numArgs);
	return `export const ${name} = {
	name: '${name}',
	numArgs: ${!isVariable ? numArgs.toString() : 'Number.NaN'},
	...getMeta('${name}')
};`.replace('\n', '\r\n');
}

export default function generateTemplate(definitions) {
	return `import getMeta from './getMeta';
${definitions.map(generateDefinitionBlock).join('\r\n\r\n')}
`;
}
