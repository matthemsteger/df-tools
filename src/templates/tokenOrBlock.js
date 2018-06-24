import _ from 'lodash';
import {pretty, ifRender, map} from './templateEngine';

export function renderImportBlock(classNames = []) {
	const allClassNames = _.join(classNames, ', ');
	return `// import {${allClassNames}} from '';`;
}

export function renderExpectationsOrBlock(classNameImportObject, expectation) {
	const {className} = expectation;
	const classVarName = _.lowerFirst(className);

	return pretty(-2)`
		{
			GATE() {
				return foundTokenNames.indexOf(${classNameImportObject}.${className}) === -1;
			},
			ALT: () => {
				const dfToken = this.SUBRULE(this.${classVarName});
				foundTokenNames.push(${classNameImportObject}.${className});
				dfTokens.push(dfToken);
			}
		},
	`;
}

export function renderExpectationsOptionsBlock(
	classNameImportObject,
	expectation
) {
	const {className} = expectation;
	const classVarName = _.lowerFirst(className);

	return pretty(-2)`
		this.OPTION({
			GATE() {
				return foundTokenNames.indexOf(${classNameImportObject}.${className}) === -1;
			},
			DEF: () => {
				const dfToken = this.SUBRULE(this.${classVarName});
				foundTokenNames.push(${classNameImportObject}.${className});
				dfTokens.push(dfToken);
			}
		});

	`;
}

export function renderExpectationRuleBlock(classNameImportObject, expectation) {
	const {className, numArgs} = expectation;
	const classVarName = _.lowerFirst(className);

	return pretty(-2)`
		this.${classVarName} = this.RULE('${classVarName}', () => {
			this.CONSUME(TokenOpen);
			const nameToken = this.CONSUME(${classNameImportObject}.${className});
			${ifRender(
				numArgs > 0,
				pretty(-3)`
			const argTokens = [];
			this.MANY(() => {
				this.CONSUME(TokenArgSeperator);
				const argToken = this.CONSUME(TokenArgument);
				argTokens.push(argToken);
			});

			if (argTokens.length !== ${numArgs}) {
				throw this.SAVE_ERROR(new chevrotainExceptions.MismatchedTokenException(\`This token requires {numArgs} arguments, but found \${argTokens.length}\`, nameToken));
			}`
			).render()}

			this.CONSUME(TokenClose);

			return {nameToken, name: nameToken.image, argTokens, args: _.map(argTokens, 'image')};
		});

	`;
}

export default async function render(
	classNameImportObject,
	expectations,
	useOr = true
) {
	const classNames = _.map(expectations, 'className');
	return pretty(-2)`
		${renderImportBlock(classNames)}

		const foundTokenNames = [];
		const dfTokens = [];
		this.MANY(() => {
			${ifRender(
				useOr,
				pretty(-3)`
			this.OR([
				${map(
					expectations,
					_.partial(renderExpectationsOrBlock, classNameImportObject)
				)}
			]);
			`
			)
				.else(
					pretty(-3)`
			${map(
				expectations,
				_.partial(renderExpectationsOptionsBlock, classNameImportObject)
			)}
			`
				)
				.render()}
		});

		// TODO: if we have not found a required token, throw an error

		${map(
			expectations,
			_.partial(renderExpectationRuleBlock, classNameImportObject)
		)}
		`;
}
