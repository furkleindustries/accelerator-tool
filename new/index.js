const chalk = require('chalk');
const checkForFilepathReqs = require('./checkForFilepathReqs');
const getAssetCreationFunction = require('./getAssetCreationFunction');
const log = require('../logging/log');
const nameIsValid = require('../functions/nameIsValid');

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
  log(
    'Creating ' +
    (type.endsWith('js') ? 'JavaScript' : 'TypeScript') +
    ` ${type} "${chalk.bold(name)}".`
  );

  const validState = nameIsValid(name);
  if (validState instanceof Error) {
    throw validState;
  }

  await checkForFilepathReqs(directory);
  await getAssetCreationFunction(type)({
    directory,
    forceCss,
    forceJavaScript,
    name,
    noCssModules,
    noTests,
  });

  log(`${type} "${chalk.bold(name)}", created.`);
};
