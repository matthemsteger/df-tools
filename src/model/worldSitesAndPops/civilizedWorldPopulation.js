
export default class CivilizedWorldPopulation {
	constructor({dwarf = 0, human = 0, elf = 0, goblin = 0, kobold = 0, total = 0} = {}) {
		this.dwarf = dwarf;
		this.human = human;
		this.elf = elf;
		this.goblin = goblin;
		this.kobold = kobold;
		this.total = total;
	}
}
