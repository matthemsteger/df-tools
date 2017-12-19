import {Transform} from 'stream';
import _ from 'lodash';

export default class StreamEditor extends Transform {
	constructor({replacements = [], transformOptions = {}} = {}) {
		super(transformOptions);

		this.idx = 0;
		this.replacements = replacements;
		this.workingReplacements = _.sortBy(this.replacements, 'startOffset');
	}

	// _transform(chunk, encoding, callback) {
	// chunk by index
	// if we have no replacements within this chunk, then write it
	// if there is a replacement *within* the chunk, simply replace the string
	// if there is a replacement that spans a chunk, then store it in a queue for next time
	// }

	replacementsForChunk(startOffset, endOffset) {
		return _.reject(this.replacements, (replacement) =>
			replacement.endOffset < startOffset || replacement.startOffset > endOffset
		);
	}
}
