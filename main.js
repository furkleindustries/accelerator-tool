/* Ensure that promises which reject and are not caught cause errors. */
require('./catchUnhandledRejections');

const fallBackToLocalInstall = require('./fallBackToLocalInstall');

const cwd = process.cwd();

try {
  const cliPath = require.resolve(
    'accelerator-tool-cli',
    { paths: [ cwd ] },
  );

  require(cliPath);
} catch (err) {
  fallBackToLocalInstall().then(
    () => {
      const cliPath = require.resolve(
        'accelerator-tool-cli',
        { paths: [ cwd ] },
      );

      require(cliPath);
    },

    (errTwo) => {
      throw new Error(errTwo);
    },
  )
}

module.exports = {};
