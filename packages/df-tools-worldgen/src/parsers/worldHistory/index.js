import {seqMap, optWhitespace, letters} from 'parsimmon';

const worldNameParser = letters.trim(optWhitespace);
const friendlyWorldNameParser = letters.trim(optWhitespace);

export default function createWorldHistoryParser() {
	return seqMap(
		worldNameParser,
		friendlyWorldNameParser,
		(worldName, friendlyWorldName) => ({
			worldName,
			friendlyWorldName
		})
	);
}
