import {getGamelogPath} from '@df-tools/df-tools-gamelog';
import {createInterface} from 'readline';
import {createReadStream} from 'fs-tail-stream';
import {Future} from 'fluture';
import iconv from 'iconv-lite';

const PARAM_NOT_FOUND_REGEX = /Command Line: World generation parameter set (.*) not found/i;

export default function gamelogMonintorErrors(dfRootPath, start) {
	const gamelogPath = getGamelogPath(dfRootPath);
	return new Future((reject) => {
		const stream = createReadStream(gamelogPath, {start, tail: true}).pipe(
			iconv.decodeStream('cp437')
		);
		const readline = createInterface({
			input: stream,
			encoding: 'utf8'
		});

		readline.on('line', (line) => {
			const match = line.match(PARAM_NOT_FOUND_REGEX);
			if (match) {
				const message = match[1]
					? `${match[1]} was not found`
					: 'A world generation parameter was not found. Aborting.';
				reject(new Error(message));
			}
		});

		return () => {
			readline.close();
			stream.close();
		};
	});
}
