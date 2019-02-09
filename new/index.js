const chalk = require('chalk');
const checkForFilepathReqs = require('./checkForFilepathReqs');
const getAssetCreationFunction = require('./getAssetCreationFunction');
const log = require('colorful-logging/log');
const nameIsValid = require('../functions/nameIsValid');
const path = require('path');

module.exports = async function _new({
  directory,
  forceCss,
  forceJavaScript,
  name,
  noCssModules,
  noTests,
  type,
})
{
  log(`Creating ${type} "${chalk.bold(name)}".`);

  const validState = nameIsValid(name);
  if (validState instanceof Error) {
    throw validState;
  }

  await checkForFilepathReqs(directory);

  const config = require(path.join(directory, 'accelerator.config'));
  await getAssetCreationFunction(type)({
    config,
    directory,
    forceCss,
    forceJavaScript,
    name,
    noCssModules,
    noTests,
  });

  log(`Created ${type} "${chalk.bold(name)}".`);
};
