const chalk = require('chalk');
const log = require('colorful-logging/log');
const installCore = require('./installCore');
const installProject = require('./installProject');
const makeStoryDirectory = require('./makeStoryDirectory');
const modifyCoreForRedistribution = require('./modifyCoreForRedistribution');
const moveCore = require('./moveCore');
const nameIsValid = require('../functions/nameIsValid');
const removeOldCore = require('./removeOldCore');
const writeTempPackageJson = require('./writeTempPackageJson');

module.exports = async function create(name, directory) {
  log(
    `Creating story "${chalk.bold(name)}" at "${chalk.bold(directory)}".`,
  );

  const validState = nameIsValid(name);
  if (validState instanceof Error) {
    throw validState;
  }

  await makeStoryDirectory(directory);
  await writeTempPackageJson(directory);
  await installCore(directory);
  await moveCore(directory);
  await removeOldCore(directory);
  await modifyCoreForRedistribution(directory, name);
  await installProject(directory);

  log(
    `Finished creating story "${chalk.bold(name)}" at ` +
    `"${chalk.bold(directory)}".\n`
  );

  log('Happy developing! Accelerator is made with ' +
      `${chalk.red('❤')}️ (love) by Furkle Industries. Remember: fiction ` +
      'can and should make the world a better place.');
};
