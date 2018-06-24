import {createRawFileParser} from './../generic';

export default createRawFileParser({
	rawObject: 'ITEM_AMMO',
	children: [
		['NAME', 2, true],
		['CLASS', 1],
		['SIZE', 1, true],
		['ATTACK', 7, [['ATTACK_PREPARE_AND_RECOVER', 2]], true]
	]
});

/*
export default P.createLanguage({
	file(lang) {
		return P.seqMap(
			lang.label.thru(spaced),
			lang.objectType.thru(spaced),
			lang.ammunitions,
			(label, objectType, ammunitions) => ({
				label,
				objectType,
				ammunitions
			})
		);
	},
	label() {
		return comment;
	},
	objectType: () => createTokenParser('OBJECT', 1),
	ammunitions(lang) {
		return lang.itemAmmo.many();
	},
	itemAmmo(lang) {
		const childTokenParsers = spaceAll([
			lang.name,
			lang.ammoClass,
			lang.size,
			lang.attack
		]);

		return P.seqMap(
			createTokenParser('ITEM_AMMO', 1),
			P.alt(...childTokenParsers).times(childTokenParsers.length),
			(itemAmmo, children) => {
				return {itemAmmo, children};
			}
		);

		// return createTokenParser('ITEM_AMMO', 1).chain(([id]) => {
		// 	// need to take all parsers in child, in any order, at least one
		// 	return P.alt(...childTokenParsers).times(childTokenParsers.length);
		// });
	},
	name: () => createTokenParser('NAME', 2),
	ammoClass: () => createTokenParser('CLASS', 1),
	size: () => createTokenParser('SIZE', 1),
	attack: () => attack
});
*/
