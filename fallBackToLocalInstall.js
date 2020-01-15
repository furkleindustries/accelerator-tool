const { exec } = require('child_process');
const {
  error,
  log,
  warn,
} = require('colorful-logging');

module.exports = () => new Promise((resolve, reject) => {
  const cwd = process.cwd();

  warn(
    'accelerator-tool-cli does not exist. Attempting to install locally, ' +
      `within the directory from which the tool was invoked: ${cwd}.`,
  );

  try {
    let pkg;
    try {
      pkg = require(require.resolve('./package.json', { paths: [ cwd ] }));
    } catch (err) {}

    if (!pkg) {
      const err = new Error(
        'No package.json found in current working directory.',
      );

      logFallbackError(err);
      return reject(err);
    }
    
    const cmd = 'npm install accelerator-tool-cli';
    exec(cmd, (err, stdout) => {
      if (err) {
        logFallbackError(err);
        return reject(err);
      }

      log(stdout);
      return resolve();
    });
  } catch (err) {
    logFallbackError(err);
    return reject(err);
  }
});

const logFallbackError = (err) => error(
  'Could not install accelerator-tool-cli. You might be offline, or ' +
    'the install script isn\'t working on your OS. Do you have NPM ' +
    'installed? If you don\'t mind global packages, try npm i -g ' +
    'accelerator-tool-cli.' +
    err ? `\n\nThe error was: ${err}.` : '',
);
