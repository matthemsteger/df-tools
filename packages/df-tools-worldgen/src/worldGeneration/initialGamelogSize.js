import {map, prop} from 'ramda';
import {getGamelogPath} from '@df-tools/df-tools-gamelog';
import {fs} from '@matthemsteger/utils-fn-fs';

const {statFuture} = fs;

export default function initialGamelogSize(dfRootPath) {
	const gamelogPath = getGamelogPath(dfRootPath);
	return map(prop('size'), statFuture(gamelogPath));
}
