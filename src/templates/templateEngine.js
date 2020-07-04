import _ from 'lodash';
import _debug from 'debug';

const debug = _debug('df:templates:templateEngine');

export function constructTemplate(strings, ...values) {
	return strings.reduce((content, current, idx) => {
		content += current; // eslint-disable-line no-param-reassign
		if (idx < values.length) {
			content += values[idx]; // eslint-disable-line no-param-reassign
		}

		return content;
	}, '');
}

export function indented(baseIndentation = 0) {
	return function baseIndentationTemplate(strings, ...values) {
		debug('before interpreting values %o, strings: %o', values, strings);
		const interpretedValues = _.reduce(
			values,
			(processed, text, idx, originalValues) => {
				let processedText = text;
				if (/.*[\r\n]/.test(text)) {
					debug('value %o contains a new line', text);
					// construct the entire string up until here
					// find the last line break, take only text after that
					// the number of tabs in that string from start until first non-tab char is the indentation
					// modify the text so that all lines after first are indented that value
					let backtrack = strings[idx]; // there is always a matching string for this idx
					while (/.*[\r\n]/.test(backtrack) === false && idx > 0) {
						backtrack = `${strings[idx - 1]}${
							originalValues[idx - 1]
						}${backtrack}`;
					}

					debug('backtrack is %o', backtrack);

					let indentSubstring = backtrack;
					const lastNewLineMatch = backtrack.match(
						/\r?\n(?=[^\r\n]*$)/
					);
					if (lastNewLineMatch) {
						indentSubstring = backtrack.substring(
							lastNewLineMatch.index +
								1 +
								(lastNewLineMatch[0].length - 1)
						);
					}

					debug('indentSubstring is %o', indentSubstring);

					const indentations = indentSubstring.match(/^\s*/)[0]
						.length;
					debug('indentations detected: %d', indentations);
					const linesAndBreaks = text.split(/(\r?\n)/);
					debug('lines and breaks are %o', linesAndBreaks);
					processedText = _.reduce(
						linesAndBreaks,
						(indentedLines, line, lineIdx) => {
							debug(
								'processing line %o with index %d with current state %o',
								line,
								lineIdx,
								indentedLines
							);
							if (lineIdx > 0 && lineIdx % 2 === 0) {
								debug('adding indentation to this line');
								return `${indentedLines}${_.repeat(
									'\t',
									indentations
								)}${line}`;
							}

							return `${indentedLines}${line}`;
						},
						''
					);
				}

				debug('processedText is %s', processedText);

				processed.push(processedText);
				return processed;
			},
			[]
		);
		debug('after interpreting values %o', interpretedValues);

		const rendered = constructTemplate(strings, ...interpretedValues);
		if (baseIndentation > 0) {
			return rendered.replace(/^/gm, _.repeat('\t', baseIndentation));
		}

		if (baseIndentation < 0) {
			const regex = new RegExp(
				`^\t{1,${Math.abs(baseIndentation)}}`,
				'gm'
			);
			return rendered.replace(regex, '');
		}

		// will indent values that are multiline, such that the _.tail() of all lines after first, are indented with the base indentation
		// base indentation is determined by the indent of the first line
		return rendered.replace(/^[\t ]*(?=[\r?\n])/gm, '');
	};
}

export function indentedLoop({
	baseIndentation = 0,
	collection = [],
	renderer
} = {}) {
	return indented(baseIndentation)`${_.map(collection, renderer)}`;
}

export function indentedBlock(block = '', baseIndentation = 0) {
	return indented(baseIndentation)`${block}`;
}

export function map(collection, iteratee) {
	return _.chain(collection).map(iteratee).join('').value();
}

export function pretty(strings, ...values) {
	if (!_.isArray(strings)) {
		let indent = 0;
		if (_.isObjectLike(strings) && strings.indent) {
			indent = strings.indent;
		}

		if (_.isInteger(strings)) {
			indent = strings;
		}

		return function prettyIndented(
			prettyIndentedStrings,
			...prettyIndentedValues
		) {
			const indentedRender = indented(indent)(
				prettyIndentedStrings,
				...prettyIndentedValues
			);
			return pretty`${indentedRender}`;
		};
	}

	// should remove leading whitespace from the first array string, and then find orig in first position with regex, replace with new
	return constructTemplate(strings, ...values).replace(
		/^[\t\f]*[\r?\n][\t\f]*/,
		''
	);
}

class IfElseRenderer {
	constructor(expression = false, toRender = '') {
		this.expressions = [{type: 'if', pass: expression, toRender}];
	}

	elseIf(expression = false, toRender = '') {
		const {type: lastExpressionType} = _.last(this.expressions);
		if (lastExpressionType === 'else')
			throw new Error('You cannot call elseIf after else');

		this.expressions.push({type: 'elseIf', pass: expression, toRender});
		return this;
	}

	else(toRender = '') {
		this.expressions.push({type: 'else', pass: true, toRender});
		return this;
	}

	render() {
		const firstTruth = _.find(this.expressions, {pass: true});
		if (!firstTruth) return '';

		return firstTruth.toRender;
	}
}

export function ifRender(expression, toRender) {
	return new IfElseRenderer(expression, toRender);
}
