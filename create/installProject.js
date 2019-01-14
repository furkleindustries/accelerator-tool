const childProcess = require('child_process');

module.exports = async function installProject(directory) {
  console.log('Installing project dependencies.');

  const cmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  const args = [ 'install' ];

  const spawnArgs = { cwd: directory };
  const child = childProcess.spawn(cmd, args, spawnArgs);
  child.stdout.on('data', (data) => console.log(String(data)));
  child.stderr.on('data', (data) => console.error(String(data)));

  return new Promise((resolve, reject) => {
    child.on('exit', (code) => {
      if (code) {
        return reject(`Project installation exited with code ${code}.`);
      }

      return resolve();
    });
  });
};
