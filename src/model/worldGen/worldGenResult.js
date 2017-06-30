
export default class WorldGenResult {
	constructor({worldSitesAndPops, region, worldSitesAndPopsPath, worldHistory, filePaths} = {}) {
		this.worldSitesAndPops = worldSitesAndPops;
		this.region = region;
		this.filePaths = filePaths;
		this.worldSitesAndPopsPath = worldSitesAndPopsPath;
		this.worldHistory = worldHistory;
	}
}
