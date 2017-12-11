import R from 'ramda';
import {isFuture} from 'fluture';

const targetOf = R.prop('_obj');

function assertIsFuture(utils, assertion) {
	const possibleFuture = assertion._obj; // eslint-disable-line no-underscore-dangle
	if (!isFuture(possibleFuture)) {
		throw new TypeError(`${utils.inspect(possibleFuture)} is not a future.`);
	}
}

function proxifyIfSupported(utils, assertion) {
	const {proxify} = utils;
	return proxify === undefined ? assertion : proxify(assertion);
}

const makeProperty = R.curry((utils, Assertion, name, asserter) => {
	utils.addProperty(Assertion.prototype, name, function () {
		assertIsFuture(this);
		return proxifyIfSupported(asserter.apply(this, arguments)); // eslint-disable-line prefer-rest-params
	});
});

function getBaseFuture(assertion) {
	return isFuture(assertion) ? assertion : assertion._obj; // eslint-disable-line no-underscore-dangle
}

// utlimately .. x should ultimately <chai>
// materialized .. should be materialized (when success no error)
// halted / haltedWith .. should be halted (error)
// cancelled .. if cancel was called?

export default function chaiFutureMiddleware(chai, utils) {
	const {Assertion, assert} = chai;
	const {proxify} = utils;
	const property = makeProperty(utils, Assertion);

	const propertyNames = Object.getOwnPropertyNames(Assertion.prototype);

	property('ultimately', function () {
		utils.flag(this, 'ultimately', true);
		return this;
	});

	property('future', function () {
		this.assert(
			isFuture(targetOf(this)),
			'expected #{this} to be a Future',
			'expected #{this} not to be a Future'
		);
	});

	property('materialized', function () {
		const derivedFuture = getBaseFuture(this);
		derivedFuture.fork(
		);
	});
}
