import Future from 'fluture';
import fs from 'fs';
import iconv from 'iconv-lite';

export default function readGameLogFromPosition(gamelogPath, start) {
	return Future((reject, resolve) => {
		fs.createReadStream(gamelogPath, {
			start
		})
			.pipe(iconv.decodeStream('cp437'))
			.collect((err, logText) => {
				if (err) reject(err);

				resolve(logText);
			});
	});
}
