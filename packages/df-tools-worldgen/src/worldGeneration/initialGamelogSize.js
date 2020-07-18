import {map, prop} from 'ramda';
import {getGamelogPath} from '@df-tools/df-tools-gamelog';
import {stat} from 'fs';
import {node} from 'fluture';

const statFuture = (path) => node((cb) => stat(path, cb));

export default function initialGamelogSize(dfRootPath) {
	const gamelogPath = getGamelogPath(dfRootPath);
	return map(prop('size'), statFuture(gamelogPath));
}
