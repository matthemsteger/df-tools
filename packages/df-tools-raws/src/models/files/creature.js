import creature from '../objects/creature';

export default function creaturesFile({rawFile}) {
	const {label, objects} = rawFile;
	const creatures = objects.map((rawCreature) => creature({rawCreature}));

	return {
		label,
		creatures
	};
}
