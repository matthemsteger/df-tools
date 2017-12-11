
export default function site({
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
}) {
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
