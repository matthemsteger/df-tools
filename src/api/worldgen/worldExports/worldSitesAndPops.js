import path from 'path';
import R from 'ramda';
import iconv from 'iconv-lite';
import _debug from 'debug';
import {of as futureOf, reject as rejectedFutureOf} from 'fluture';
import {fs} from './../../../utility/fs';
import createRegionWorldSitesPopsParser from './../../../dsl/parsers/regionWorldSitesPops';

const debug = _debug('df:api:worldgen:worldExports:worldSitesAndPops');

export default function parseWorldSitesAndPops({filePath, creatures}) {
	return R.compose(
		R.chain(
			R.compose(
				R.ifElse(
					R.complement(R.prop('status')),
					R.compose(
						() =>
							rejectedFutureOf(
								new Error(`Error while parsing ${filePath}.`)
							),
						R.tap(({index, expected}) =>
							debug('parse errors: %o', {index, expected})
						)
					),
					R.compose(
						futureOf,
						R.prop('value')
					)
				),
				(contents) =>
					createRegionWorldSitesPopsParser(creatures).file.parse(
						contents
					),
				(fileBuffer) => iconv.decode(fileBuffer, 'cp437')
			)
		),
		(resolvedPath) => fs.readFileFuture(resolvedPath, null),
		path.resolve
	)(filePath);
}
