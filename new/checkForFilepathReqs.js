import chalk from 'chalk';
import {
  log,
} from 'colorful-logging';
import * as fs from 'fs-extra';
import * as path from 'path';
import {
  assert,
} from 'ts-assertions';

export async function checkForFilepathReqs(directory) {
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
}
