#!/usr/bin/env node

var fs = require('fs');
var path = require('path');

var package = require('./package.json');

var currentDir = process.cwd();

var program = require('commander');
program.version(package.version); 

var newNouns = [
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
  .action(function action(name, directory) {
    if (newNouns.indexOf(name) !== -1) {
      throw new Error('You provided a reserved word, ' + name + ', for a ' +
                      'story name. Did you mean to use accelerator-tool new?');
    }

    var realDir = directory || currentDir;
    require('./create')(name, path.join(realDir, name));
  });

program
  .command('new <noun> <name> [directory]')
  .description('Create a new asset in an existing Accelerator story. ' +
               'Available subcommands are ' + newNouns.join(', ') + '. ' +
               'Note that passage, passage-ts, and passage-tsx are ' +
               'equivalent, passage-js and passage-jsx are equivalent, etc.')
  .action(function action(noun, name, directory) { 
    fs.exists(path.join(directory || currentDir, 'passages'), function ex(exists) {
      if (!exists) {
        throw new Error('No passages folder could be found in the directory ' +
                        'in which accelerator-tool was executed.');
      }

      var realDir = directory || currentDir;
      require('./new')(noun, name, realDir);
    });
  });

program.parse(process.argv);
