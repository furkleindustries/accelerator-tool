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

export function installCore(directory) {
  log('Installing accelerator-core.');

  const cmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  const args = [
    'install',
    'accelerator-core',
  ];

  const spawnArgs = { cwd: directory };
  const child = spawn(cmd, args, spawnArgs);
  child.stdout.on('data', npmLogWithColor);
  child.stderr.on('data', npmErrorWithColor);

  return new Promise((resolve, reject) => {
    child.on('exit', (code) => {
      if (code) {
        return reject(`Core installation exited with code ${code}.`);
      }

      return resolve();
    });
  });
}
