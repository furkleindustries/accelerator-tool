const childProcess = require('child_process');

module.exports = async function installCore(directory) {
  console.log('Installing accelerator-core.');

  const cmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  const args = [
    'install',
    'accelerator-core',
  ];

  const spawnArgs = { cwd: directory };
  const child = childProcess.spawn(cmd, args, spawnArgs);
  child.stdout.on('data', (data) => console.log(String(data)));
  child.stderr.on('data', (data) => console.error(String(data)));

  return new Promise((resolve, reject) => {
    child.on('exit', (code) => {
      if (code) {
        return reject(`Core installation exited with code ${code}.`);
      }

      return resolve();
    });
  });
}