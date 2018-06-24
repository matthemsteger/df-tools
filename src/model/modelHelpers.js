import R from 'ramda';
import _ from 'lodash';
import {parseBase10Int} from './../utility/numbers';

export const makePropertyName = _.camelCase;

/**
 * Makes a transducer function that can be composed with other transducers
 * to transform values in a list of values
 * This function is curried
 * @param {function} propertyTransform a transform for the resulting object property name
 * @param {function} valueTransform a transform for the value
 * @param {string} tokenName the token name
 */
export const makeTransducer = R.curry(
	(propertyTransform, valueTransform, tokenName) =>
		R.map(
			R.when(
				R.propEq('name', tokenName),
				R.compose(
					R.objOf(propertyTransform(tokenName)),
					valueTransform,
					R.prop('value')
				)
			)
		)
);

export const makeCamelCaseTransducer = makeTransducer(makePropertyName);

export const makeStringValueTransducer = makeTransducer(
	makePropertyName,
	R.head
);

export const makeIntegerValueTransducer = makeTransducer(
	makePropertyName,
	R.compose(
		parseBase10Int,
		R.head
	)
);

export const makeBooleanValueTransducer = makeTransducer(
	makePropertyName,
	R.compose(
		R.equals('1'),
		R.head
	)
);
