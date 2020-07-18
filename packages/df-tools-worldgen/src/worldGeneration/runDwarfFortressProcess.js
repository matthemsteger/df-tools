import Future from 'fluture';
import {exec} from 'child_process';

export default function runDwarfFortressProcess(
	executablePath,
	worldGenId,
	config,
	cwd
) {
	const command = `${executablePath} -gen ${worldGenId} RANDOM "${config}"`;
	return new Future((reject, resolve) => {
		const dfProcess = exec(command, {cwd}, (err, stdout, stderr) => {
			if (err && (!err.code || err.code === 1)) resolve({});
			if (err) return reject(err);

			return resolve({
				stdout,
				stderr
			});
		});

		return () => {
			if (dfProcess && !dfProcess.killed) {
				/**
				 * DF does not seem to respond to SIGTERM, so
				 * use SIGKILL
				 */
				dfProcess.kill(9);
			}
		};
	});
}
