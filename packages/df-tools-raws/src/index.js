// raw -> parsed raw data (pure json) -> used by model -> used by writer (future)
import createRawFileParser from './parsers/raws/rawFile';
import {fileTypeDefinitions, filePrefixToFileTypeMap} from './models/fileTypes';

export default async function parseRaw({rawText}) {
	const parser = createRawFileParser();
	const parseResult = parser.file.parse(rawText);
	const {status, value: rawFile} = parseResult;
	if (!status) {
		const {index, expected} = parseResult;
		const {offset, line, column} = index;
		throw new Error(
			`Unable to parse at index: ${offset}, line:${line}, column:${column}. Expected: ${expected.join(
				','
			)}`
		);
	}

	/**
	 * Make the assumption that the label is the same as the filePrefix
	 */
	const {label} = rawFile;
	const rawFileDefinition =
		fileTypeDefinitions[filePrefixToFileTypeMap[label]];

	if (!rawFileDefinition) {
		throw new Error(`Raw file with label ${label} was not recognized`);
	}

	const {fileModel} = rawFileDefinition;
	return {
		meta: rawFile,
		model: fileModel ? fileModel({rawFile}) : undefined
	};
}
