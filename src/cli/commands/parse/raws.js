export const command = 'raws <command>';
export const desc = 'Parse a dwarf fortress raw file';
export function builder(yargs) {
	return yargs
		.commandDir('raws')
		.demandCommand();
}
