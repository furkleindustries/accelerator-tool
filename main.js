/* Ensure that promises which reject and are not caught cause errors. */
import './catchUnhandledRejections';

import {
  error,
} from 'colorful-logging';
import {
  create,
} from './create';
import {
  getDirectory,
} from './functions/getDirectory';
import {
  getInputNouns,
} from './functions/getInputNouns';
import program from 'commander';
import * as path from 'path';
import {
  newAsset,
} from './new';

const pkg = require('./package.json');

program.version(pkg.version, '-v, -V, --version');

program
  .command('create <name> [directory]')
  .description('Create a new Accelerator story.')
  .action(async (name, dirArg) =>
  {
    const dirPath = path.join(getDirectory(dirArg), name);
    try {
      await create(name, dirPath);
    } catch (err) {
      error(err);
      process.exit(1);
    }
  });

program
  .command('new <type> <name> [directory]')
  .description('Create a new asset in an existing Accelerator story. ' +
               `Available subcommands are: ${getInputNouns().join(', ')}.`)
  .option(
    '-j, --javascript',
    'Generate JavaScript code files instead of TypeScript files for the new ' +
      'asset.',
  ).option(
    '-c, --css',
    'Generate CSS style files instead of Sass files.',
  ).option(
    '--no-css-modules',
    'Do not use CSS Modules with the generated style files.',
  ).option(
    '--no-tests',
    'Do not generate tests for this asset.',
  ).action(async (type, name, dirArg, cmd) =>
  {
    try {
      await newAsset({
        name,
        type,
        directory: getDirectory(dirArg),
        forceCss: Boolean(cmd.css),
        forceJavaScript: Boolean(cmd.javascript),
        noCssModules: Boolean(cmd.noCssModules),
        noTests: Boolean(cmd.noTests),
      });
    } catch (err) {
      error(err);
      process.exit(1);
    }
  });

program
  .option('-h')
  .action(program.outputHelp)

program.parse(process.argv);

if (!program.args.length) {
  program.outputHelp();
}
