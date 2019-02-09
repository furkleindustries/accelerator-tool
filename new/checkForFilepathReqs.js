const chalk = require('chalk');
const fs = require('fs-extra');
const log = require('colorful-logging/log');
const path = require('path');
const { assert } = require('ts-assertions');

module.exports = async function checkForFilepathReqs(directory) {
  log('Checking filepath requirements.');

  const dirExists = await fs.exists(directory);
  assert(dirExists, `There was no directory at "${chalk.bold(directory)}".`);

  const passDirExists = await fs.exists(path.join(directory, 'passages'));
  assert(
    passDirExists,
    `There was no passages directory within "${chalk.bold(directory)}."`,
  );

  const confStr = 'accelerator.config.js';
  const configExists = await fs.exists(path.join(directory, confStr));
  assert(
    configExists,
    `There was no ${confStr} file within "${chalk.bold(directory)}".`,
  );
};
