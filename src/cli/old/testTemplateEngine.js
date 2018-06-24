import path from 'path';
import Promise from 'bluebird';
import fs from 'fs';
import _debug from 'debug';

Promise.promisifyAll(fs);
const debug = _debug('df:cli:commands:testTemplateEngine');

export const command = 'test-template-engine';
export const describe = 'Test the template engine';
export function builder(yargs) {
	return yargs
		.option('template', {
			alias: 't',
			default: path.resolve(
				__dirname,
				'../../templates/templateEngineTest.js'
			)
		})
		.option('filename', {
			alias: 'f',
			demandOption: true
		});
}

export async function handler(argv) {
	try {
		const {template: templatePath, filename} = argv;

		const template = require(templatePath); // eslint-disable-line global-require,import/no-dynamic-require
		const renderedTemplate = await template.default();

		await fs.writeFileAsync(filename, renderedTemplate);
		process.exit(0);
	} catch (err) {
		debug(err);
		process.exit(1);
	}
}
