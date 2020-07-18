import {seqMap} from 'parsimmon';
import {prop, head, compose} from 'ramda';

const firstProp = (propName) => compose(prop(propName), head);
const getOwnerName = firstProp('ownerName');
const getOwnerRace = firstProp('ownerRace');
const getParentCivName = firstProp('parentCivName');
const getParentCivRace = firstProp('parentCivRace');

export default function siteParser(lang) {
	const {
		siteInfo,
		siteOwner,
		siteParentCiv,
		siteRuler,
		creaturePopulation
	} = lang;
	return seqMap(
		siteInfo,
		siteOwner.many(),
		siteParentCiv.many(),
		siteRuler.many(),
		creaturePopulation.many(),
		(
			{siteNumber, name, friendlyName, siteType},
			siteOwners,
			siteParentCivs,
			siteRulers,
			populations
		) => {
			const ownerName = getOwnerName(siteOwners);
			const ownerRace = getOwnerRace(siteOwners);
			const parentCivName = getParentCivName(siteParentCivs);
			const parentCivRace = getParentCivRace(siteParentCivs);

			return {
				siteNumber,
				name,
				friendlyName,
				siteType,
				ownerName,
				ownerRace,
				parentCivName,
				parentCivRace,
				siteRulers,
				populations
			};
		}
	);
}
