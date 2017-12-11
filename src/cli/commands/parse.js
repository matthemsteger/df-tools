export const command = 'parse <command>';
export const desc = 'Parse a dwarf fortress file';
export function builder(yargs) {
	return yargs
		.commandDir('parse')
		.demandCommand();
}
