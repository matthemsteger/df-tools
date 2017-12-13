import path from 'path';
import R from 'ramda';
import {fs} from './../../utility/fs';
import worldGenSettingsParser from './../../dsl/parsers/settings/worldGen';
import {fromParser} from './../../model/settings/worldGen';

export default function getWorldGenSettings({dfRootPath}) {
	return R.compose(
		R.map(R.compose(
			fromParser,
			R.prop('value'),
			(contents) => worldGenSettingsParser.file.parse(contents)
		)),
		(filePath) => fs.readFileFuture(filePath, 'utf8'),
		(rootPath) => path.resolve(rootPath, 'data/init/world_gen.txt')
	)(dfRootPath);
}

