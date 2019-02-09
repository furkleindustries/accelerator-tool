#!/usr/bin/env node

const error = require('colorful-logging/error');

process.on('unhandledRejection', error => {
  console.error(require('chalk').red(error));
  process.exit(1);
});

const create = require('./create');
const getDirectory = require('./functions/getDirectory');
const getNewAssetTypes = require('./functions/getInputNouns');
const program = require('commander');
const path = require('path');
const _new = require('./new');

const package = require('./package.json');

program.version(package.version, '-v, -V, --version');

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
               `Available subcommands are: ${getNewAssetTypes().join(', ')}.`)
  .option(
    '-j, --javascript',
    'Generate JavaScript code files instead of TypeScript files for the new ' +
      'asset.',
  )
  .option(
    '-c, --css',
    'Generate CSS style files instead of Sass files.',
  )
  .option(
    '--no-css-modules',
    'Do not use CSS Modules with the generated style files.',
  )
  .option(
    '--no-tests',
    'Do not generate tests for this asset.',
  )
  .action(async (type, name, dirArg, cmd) =>
  {
    try {
      await _new({
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
