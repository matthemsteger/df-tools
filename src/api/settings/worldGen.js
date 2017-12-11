import path from 'path';
import {fs} from './../../utility/fs';
import {discoverInstall} from './../../api/install/discoverInstall';
import WorldGenLexer from './../../dsl/lexers/worldGenLexer';
import WorldGenParser from './../../dsl/parsers/worldGenParser';

export default function getWorldGenSettings({dfRootPath}) {
	// need a parser here
}

export async function getWorldGenSettingsAsync({dfRootPath} = {}) {
	const install = await discoverInstall({dfRootPath});
	const worldGenSettingsPath = path.resolve(install.path, 'data/init/world_gen.txt');
	const worldGenText = await fs.readFileAsync(worldGenSettingsPath, 'utf8');

	const lexer = new WorldGenLexer();
	const {tokens} = lexer.tokenize(worldGenText);
	const parser = new WorldGenParser(tokens, lexer.allTokens);

	const worldGenConfigurations = parser.parseWorldGenFile();
	return worldGenConfigurations;
}
