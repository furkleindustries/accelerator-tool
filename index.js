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
    require('./create')(name, path.join(directory || currentDir, name));
  });

program
  .command('new <noun> <name> [directory]')
  .description('Create a new asset in an existing Accelerator story.')
  .action(function action(noun, name, directory) { 
    fs.exists(path.join(directory || currentDir, 'passages'), function ex(exists) {
      if (!exists) {
        throw new Error('No passages folder could be found in the directory ' +
                        'in which accelerator-tool was executed.');
      }

      require('./new')(noun, name, directory || currentDir);
    });
  });

program.parse(process.argv);
