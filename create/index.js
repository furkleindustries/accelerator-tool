import chalk from 'chalk';
import {
  log,
} from 'colorful-logging';
import {
  installCore,
} from './installCore';
import {
  installProject,
} from './installProject';
import {
  makeStoryDirectory,
} from './makeStoryDirectory';
import {
  modifyCoreForRedistribution,
} from './modifyCoreForRedistribution';
import {
  moveCore,
} from './moveCore';
import {
  nameIsValid,
} from '../functions/nameIsValid';
import * as path from 'path';
import {
  removeOldCore,
} from './removeOldCore';
import {
  writeTempPackageJson,
} from './writeTempPackageJson';

export async function create(name, directory) {
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
  const coreVersion = require(path.join(directory, 'package.json')).version;
  await Promise.all([
    removeOldCore(directory),
    modifyCoreForRedistribution(directory, name, coreVersion),
  ]);

  await installProject(directory);

  log(
    `Finished creating story "${chalk.bold(name)}" at ` +
    `"${chalk.bold(directory)}".\n`
  );

  log('Happy developing! Accelerator is made with ' +
      `${chalk.red('❤')}️ (love) by Furkle Industries. Remember: fiction ` +
      'can and should make the world a better place!');
}
