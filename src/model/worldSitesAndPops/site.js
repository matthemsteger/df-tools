
export default class Site {
	constructor({siteNumber, properName, name, siteType, ownerName, ownerRace, parentCivName, parentCivRace, siteRulerName, siteRulerRace, populations} = {}) {
		this.siteNumber = siteNumber;
		this.properName = properName;
		this.name = name;
		this.siteType = siteType;
		this.ownerName = ownerName;
		this.ownerRace = ownerRace;
		this.parentCivName = parentCivName;
		this.parentCivRace = parentCivRace;
		this.siteRulerName = siteRulerName;
		this.siteRulerRace = siteRulerRace;
		this.populations = populations;
	}
}
