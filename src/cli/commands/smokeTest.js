export const command = 'smoke-test <command>';
export const desc =
	'Perform smoke tests on various df-tool functions against a real Dwarf Fortress';
export function builder(yargs) {
	return yargs
		.option('df-root', {
			alias: 'p',
			demandOption: true
		})
		.commandDir('parse')
		.demandCommand();
}
