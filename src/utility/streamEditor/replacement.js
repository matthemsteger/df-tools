
export default class Replacement {
	constructor({startOffset, endOffset, replaceText} = {}) {
		this.startOffset = startOffset;
		this.endOffset = endOffset;
		this.replaceText = replaceText;
	}
}
