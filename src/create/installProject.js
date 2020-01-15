import {
  spawn,
} from 'child_process';
import {
  log,
} from 'colorful-logging';
import {
  npmErrorWithColor,
} from '../logging/npmErrorWithColor';
import {
  npmLogWithColor,
} from '../logging/npmLogWithColor';

export function installProject(directory) {
  log('Installing project dependencies.');

  const cmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  const args = [ 'install' ];

  const spawnArgs = { cwd: directory };
  const child = childProcess.spawn(cmd, args, spawnArgs);
  child.stdout.on('data', npmLogWithColor);
  child.stderr.on('data', npmErrorWithColor);

  return new Promise((resolve, reject) => {
    child.on('exit', (code) => {
      if (code) {
        return reject(`Project installation exited with code ${code}.`);
      }

      return resolve();
    });
  });
}
