import _ from 'lodash';
import BaseLexer from './baseLexer';
import * as worldGenTokens from './../tokens/worldGenTokens';

export default class WorldGenLexer extends BaseLexer {
	constructor() {
		const tokens = _.chain(worldGenTokens)
			.map((tokenClass, key) => ({key, tokenClass}))
			.orderBy(['key'], ['desc'])
			.map('tokenClass')
			.value();

		super(tokens);
	}
}
