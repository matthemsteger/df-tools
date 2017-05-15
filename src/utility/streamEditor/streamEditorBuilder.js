import Replacement from './replacement';

export class StreamEditorBuilder {
	constructor() {
		this.replacements = [];
	}

	replaceAt({startOffset, endOffset, replaceText} = {}) {
		const replacement = new Replacement({startOffset, endOffset, replaceText});
		this.replacements.push(replacement);
		return this;
	}
}

export default function editStream({startOffset, endOffset, replaceText} = {}) {
	return new StreamEditorBuilder().replaceAt({startOffset, endOffset, replaceText});
}
