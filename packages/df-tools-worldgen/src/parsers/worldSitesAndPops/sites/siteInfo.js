import {seqMap, regexp, digits, optWhitespace} from 'parsimmon';

const nameParser = regexp(/: (.+?),/, 1);
const friendlyNameParser = regexp(/"(.+?)",/, 1).trim(optWhitespace);
const siteTypeParser = regexp(/(.+)(?:\r\n?|\n)/, 1);

export default function siteInfoParser() {
	return seqMap(
		digits,
		nameParser,
		friendlyNameParser,
		siteTypeParser,
		(siteNumber, name, friendlyName, siteType) => ({
			siteNumber,
			name,
			friendlyName,
			siteType
		})
	);
}
