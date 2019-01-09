#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');

const package = require('./package.json');

const currentDir = process.cwd();

const program = require('commander');
program.version(package.version); 

const newNouns = [
  'passage',
  'passage-ts',
  'passage-tsx',
  'passage-js',
  'passage-jsx',
  'header',
  'header-ts',
  'header-tsx',
  'header-js',
  'header-jsx',
  'footer',
  'footer-ts',
  'footer-tsx',
  'footer-js',
  'footer-jsx',
];

program
  .command('create <name> [directory]')
  .description('Create a new Accelerator story.')
  .action((name, directory) => {
    if (name === 'new' || newNouns.indexOf(name) !== -1) {
      console.log('You provided a reserved word, ' + name + ', for a ' +
                  'story name. Did you mean to use accelerator-tool new?');
      return;
    }

    const realDir = directory || currentDir;
    try {
      require('./create')(name, path.join(realDir, name));
    } catch (e) {
      console.error(e.message);
      return;
    }
  });

program
  .command('new <noun> <name> [directory]')
  .description('Create a new asset in an existing Accelerator story. ' +
               'Available subcommands are ' + newNouns.join(', ') + '. ' +
               'Note that passage, passage-ts, and passage-tsx are ' +
               'equivalent, passage-js and passage-jsx are equivalent, etc.')
  .action((noun, name, directory) => { 
    fs.exists(path.join(directory || currentDir, 'passages'), (exists) => {
      if (!exists) {
        console.log('No passages folder could be found in the directory ' +
                    'in which accelerator-tool was executed.');
        return;
      }

      const realDir = directory || currentDir;
      try {
        require('./new')(noun, name, realDir);
      } catch (e) {
        console.error(e.message);
        return;
      }
    });
  });

program.parse(process.argv);
