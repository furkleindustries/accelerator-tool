#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var package = require('./package.json');
var program = require('commander');

var currentDir = process.cwd();
 
program.version(package.version);
  
program
  .command('create <name> [directory]')
  .description('Create a new Accelerator story.')
  .action(function action(name, directory) {
    var realDir = directory || currentDir;
    require('./create')(name, path.join(realDir, name));
  });

  
var newNouns = [
  'passage',
  'passage-ts',
  'passage-tsx',
  'passage-js',
  'passage-jsx',
];

program
  .command('new <noun> <name> [directory]')
  .description('Create a new asset in an existing Accelerator story. ' +
               'Available subcommands are ' + newNouns.join(', ') + '. ' +
               'Note that passage, passage-ts, and passage-tsx are ' +
               'equivalent, and passage-js and passage-jsx are equivalent.')
  .action(function action(noun, name, directory) { 
    fs.exists(path.join(directory || currentDir, 'passages'), function ex(exists) {
      if (!exists) {
        throw new Error('No passages folder could be found in the directory ' +
                        'in which accelerator-tool was executed.');
      }

      var realDir = directory || currentDir;

      var found = false;
      for (var ii = 0; ii < newNouns.length; ii += 1) {
        if (noun === newNouns[ii]) {
          found = true;
          require('./new')(newNouns[ii], name, realDir);
          break;
        }
      }

      if (!found) {
        throw new Error('The noun used with ' + package.name + ' was not ' +
                        'one of the following: ' + newNouns.join(', ') + '.');
      }
    });
  });

program.parse(process.argv);
