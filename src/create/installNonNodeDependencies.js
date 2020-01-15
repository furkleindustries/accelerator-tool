import {
  spawn,
} from 'child_process';
import {
  log,
} from 'colorful-logging';
import hasbin from 'hasbin';

export const installNonNodeDependencies = async () => {
  log('Installing non-node dependencies.');
  log('Installing fonttools and brotli for font subsetting.');

  const checkProm = new Promise((resolve, reject) => hasbin(
    'pip',
    (err) => {
      if (err) {
        return reject(err);
      }

      return resolve();
    },
  ));

  let failed = false;
  checkProm.catch((err) => {
    failed = true;
    warn(err);
  });

  await checkProm;

  if (failed) {
    warn('Checking for the pip executable failed. Fonts cannot be loaded.');
    return;
  }

  const installProm = new Promise((resolve, reject) => {
    const proc = spawn(
      'pip',
      [
        'install',
        '--user',
        'fonttools',
        'brotli',
      ],
    );

    proc.stderr.pipe(process.stderr);
    proc.stdout.pipe(process.stdout);

    proc.on('close', resolve);
    proc.on('error', reject);
  });

  installProm.catch((err) => {
    failed = true;
    warn(err);
  });

  await installProm;

  if (failed) {
    warn('Installing font libraries through pip failed. Fonts cannot be ' +
      'loaded.');
    return;
  }

  log('Completed installing non-node dependencies. You may have to add the ' +
    'pip user directory to your PATH and restart your shell.');
};
