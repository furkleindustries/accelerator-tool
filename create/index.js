const fs = require('fs-extra');

const idIsValid = require('../functions/nameIsValid');
const installCore = require('./installCore');
const installProject = require('./installProject');
const moveCore = require('./moveCore');
const removeOldCore = require('./removeOldCore');
const writeTempPackageJson = require('./writeTempPackageJson');

module.exports = async function create(name, directory) {
  console.log(`Creating story "${name}" at ${directory}.`);

  const validState = idIsValid(name);
  if (validState instanceof Error) {
    throw validState;
  }

  try {
    await fs.mkdir(directory);
  } catch (err) {
    if (err.code === 'EEXIST') {
      throw new Error(`The directory, ${directory}, already exists.`);
    } else {
      throw err;
    }
  }

  await writeTempPackageJson(directory);
  await installCore(directory);
  await moveCore(directory);
  await removeOldCore(directory);
  await modifyCoreForRedistribution(directory, name);
  await installProject(directory);

  console.log(`Finished creating story "${name}" at ${directory}.`);
};
