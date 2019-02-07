#!/usr/bin/env node

const error = require('./logging/error');
const getDirectory = require('./functions/getDirectory');
const getNewAssetTypes = require('./functions/getInputNouns');
const program = require('commander');
const path = require('path');

const package = require('./package.json');

program.version(package.version, '-v, -V, --version');

program
  .command('create <name> [directory]')
  .description('Create a new Accelerator story.')
  .action(async (name, directory) =>
  {
    const realDir = getDirectory(directory);
    try {
      await require('./create/')(name, path.join(realDir, name));
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
  .action(async (type, name, directory, cmd) =>
  {
    const realDir = getDirectory(directory);
    try {
      await require('./new')({
        name,
        type,
        directory: realDir,
        forceCss: Boolean(cmd.css),
        noCssModules: Boolean(cmd.noCssModules),
        noTests: Boolean(cmd.noTests),
        forceJavaScript: !cmd.javascript,
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
