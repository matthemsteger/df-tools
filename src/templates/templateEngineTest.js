import _ from 'lodash';
import {pretty, ifRender, map} from './templateEngine';

export function sub(idx) {
	return pretty(-2)`
		Sub: This is idx ${idx} indented flush with surrounding
		Sub: flush
`;
}

export default async function render() {
	return pretty(-2)`
		This is aligned to the left completely
			This is indented 1
				This is indented 2
			The following map is indented 1
			${map(_.times(5), sub)}
			End map indented 1

			^That was an extra line break
			${ifRender(
				true,
				pretty(-3)`
			if: This should be indented 1
				if: This is indented 2
			if: This should be indented 1`
			).render()}
			after if: This should be indented 1
		Flush end
	`;
}
