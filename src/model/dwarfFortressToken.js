import _ from 'lodash';

export default class DwarfFortressToken {
	constructor({name, args = [], nameToken, argsTokens = []}) {
		this.name = name;
		this.args = args;
		this.nameToken = nameToken;
		this.argsTokens = argsTokens;
	}

	get hasToken() {
		return !!this.nameToken;
	}

	static fromParsedTokens(nameToken, argsTokens = []) {
		if (!nameToken)
			throw new Error('Tried to call fromParsedTokens without nameToken');
		if (!nameToken.image)
			throw new Error(
				'Tried to call fromParsedTokens without proper parsedToken'
			);
		const {image: name} = nameToken;
		const args = _.map(argsTokens, 'image');

		return new DwarfFortressToken({name, args, nameToken, argsTokens});
	}
}
