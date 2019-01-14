#!/usr/bin/env node

const program = require('commander');
const fs = require('fs-extra');
const path = require('path');

const getDirectory = require('./functions/getDirectory');
const getInputNouns = require('./new/getInputNouns');

const package = require('./package.json');

program.version(package.version);

program
  .command('create <name> [directory]')
  .description('Create a new Accelerator story.')
  .action(async (name, directory) =>
  {
    if (name === 'new' || getInputNouns().indexOf(name) !== -1) {
      console.log(`You provided a reserved word, ${name}, for a ` +
                  'story name. Did you mean to use accelerator-tool new?');
      return;
    }

    const realDir = getDirectory(directory);
    try {
      await require('./create/')(name, path.join(realDir, name));
    } catch (e) {
      console.error(e);
      return;
    }
  });

program
  .command('new <noun> <name> [directory]')
  .description('Create a new asset in an existing Accelerator story. ' +
               `Available subcommands are ${getInputNouns().join(', ')}. ` +
               'Note that passage, passage-ts, and passage-tsx are ' +
               'equivalent, passage-js and passage-jsx are equivalent, etc.')
  .action(async (noun, name, directory) =>
  {
    const realDir = getDirectory(directory);
    try {
      await require('./new/')(noun, name, realDir);
    } catch (e) {
      console.error(e);
      return;
    }
  });

program.parse(process.argv);
