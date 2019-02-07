const chalk = require('chalk');
const childProcess = require('child_process');
const log = require('../logging/log');
const npmErrorWithColor = require('../logging/npmErrorWithColor');
const npmLogWithColor = require('../logging/npmLogWithColor');

module.exports = function installProject(directory) {
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
};
