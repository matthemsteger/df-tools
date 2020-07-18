import {resolve} from 'fluture';
import {map} from 'ramda';
import {getAllSaveRegions} from '@df-tools/df-tools-saves';

export default function findNextId({dfRootPath, existingRegions}) {
	const existingRegionNumbersFuture = existingRegions
		? resolve(existingRegions)
		: getAllSaveRegions({dfRootPath});

	return map(
		(regions) => Math.max(...regions) + 1,
		existingRegionNumbersFuture
	);
}
