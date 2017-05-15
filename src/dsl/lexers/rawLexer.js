import _ from 'lodash';
import BaseLexer from './baseLexer';
import * as rawTokens from './../tokens/rawTokens';

export default class RawLexer extends BaseLexer {
	constructor() {
		const tokens = _.chain(rawTokens)
			.map((tokenClass, key) => ({key, tokenClass}))
			.orderBy(['key'], ['desc'])
			.map('tokenClass')
			.value();

		super(tokens);
	}
}
