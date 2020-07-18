import {find, propEq} from 'ramda';

/**
 * @typedef {object} Creature
 * @property {string} id
 * @property {string} singluarName
 * @property {string} pluralName
 * @property {string} adjectiveName
 */

/**
 * Create a creature model
 * @todo This should be improved to take into account other parts of the creature
 * @param {object} options
 * @param {object} options.rawCreature
 * @returns {Creature}
 */
export default function creature({rawCreature}) {
	const {children, value: creatureValue} = rawCreature;
	const [creatureNameValue] = creatureValue;
	const {value: nameValue} = find(propEq('NAME'), children);
	const [singularValue, pluralValue, adjectiveValue] = nameValue;

	return {
		id: creatureNameValue.value,
		singularName: singularValue.value,
		pluralName: pluralValue.value,
		adjectiveName: adjectiveValue.value,
		raw: rawCreature
	};
}
