import path from 'path';
import fs from 'fs';
import Promise from 'bluebird';
import iconv from 'iconv-lite';
import _debug from 'debug';
import RegionWorldSitesPopsLexer from './../../../dsl/lexers/regionWorldSitesPopsLexer';
import RegionWorldSitesPopsParser from './../../../dsl/parsers/regionWorldSitesPopsParser';

const debug = _debug('df:api:worldgen:worldExports:worldSitesAndPops');

Promise.promisifyAll(fs);

export default async function parseWorldSitesAndPops({filePath} = {}) {
	const fileBuffer = await fs.readFileAsync(path.resolve(filePath));
	const worldSitesAndPopsContents = iconv.decode(fileBuffer, 'cp437');
	const lexer = new RegionWorldSitesPopsLexer();
	const {tokens} = lexer.tokenize(worldSitesAndPopsContents);
	debug('lexed %d tokens, and providing parser with %d token constructors', tokens.length, lexer.allTokens.length);

	const parser = new RegionWorldSitesPopsParser(tokens, lexer.allTokens);
	return parser.parseWorldPopFile();
}
