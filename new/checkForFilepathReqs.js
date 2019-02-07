const fs = require('fs-extra');
const log = require('../logging/log');
const path = require('path');

module.exports = async function checkForFilepathReqs(directory) {
  log('Checking filepath requirements.');

  const dirExists = await fs.exists(directory);
  if (!dirExists) {
    throw new Error(`There was no directory at ${directory}.`);
  }

  const passDirExists = fs.exists(path.join(directory, 'passages'));
  if (!passDirExists) {
    throw new Error(`There was no passages directory within ${directory}.`);
  }
};
