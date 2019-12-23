import {identity} from 'ramda';
import creatureFile from './files/creature';

function getModel(objectType) {
	switch (objectType) {
		case 'CREATURE':
			return creatureFile;
		default:
			return identity;
	}
}

export default function modelRaws(rawFiles) {
	return rawFiles.map((rawFile) => {
		const {objectType: objectTypeToken} = rawFile;
		const {value: objectType} = objectTypeToken;

		const model = getModel(objectType);
		return model({rawFile});
	});
}
