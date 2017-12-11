import {node} from 'fluture';
import R from 'ramda';

export function futurify(fn) {
	return function futurified(...args) {
		return node((callback) => {
			fn(...args, callback);
		});
	};
}

export const futurifyAll = R.compose(
	R.fromPairs,
	R.chain(R.compose(
		R.when(
			R.compose(R.is(Function), R.last, R.head),
			R.compose(
				([key, value]) => [[key, value], [`${key}Future`, futurify(value)]],
				R.head
			)
		),
		R.of
	)),
	R.toPairs
);
