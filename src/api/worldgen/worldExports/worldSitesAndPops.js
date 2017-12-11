import path from 'path';
import R from 'ramda';
import iconv from 'iconv-lite';
import _debug from 'debug';
import {fs} from './../../../utility/fs';
import createRegionWorldSitesPopsParser from './../../../dsl/parsers/regionWorldSitesPops';

const debug = _debug('df:api:worldgen:worldExports:worldSitesAndPops');

export default function parseWorldSitesAndPops({filePath, creatures}) {
	return R.compose(
		R.map(R.compose(
			R.prop('value'),
			R.when(R.compliment(R.prop('status')), ({index, expected}) => {
				debug('parse errors: %o', {index, expected});
				throw new Error(`Error while parsing ${filePath}.`);
			}),
			(contents) => createRegionWorldSitesPopsParser(creatures).file.parse(contents),
			(fileBuffer) => iconv.decode(fileBuffer, 'cp437')
		)),
		fs.readFileFuture,
		path.resolve
	)(filePath);
}

