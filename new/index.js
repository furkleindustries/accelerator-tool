import chalk from 'chalk';
import {
  checkForFilepathReqs,
} from './checkForFilepathReqs';
import {
  log,
} from 'colorful-logging/log';
import {
  getAssetCreationFunction,
} from './getAssetCreationFunction';
import {
  nameIsValid,
} from '../functions/nameIsValid';
import * as path from 'path';

export async function newAsset({
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
}
