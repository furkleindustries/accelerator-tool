var childProcess = require('child_process');
var fs = require('fs');
var path = require('path');
var rimraf = require('rimraf');
var copy = require('recursive-copy');

module.exports = function create(name, directory) {
  console.log('Creating story "' + name + '" at ' + directory);

  return new Promise(function promise(resolve, reject) {
    var newDir = directory; 
    fs.mkdir(newDir, function error(err) {
      if (err) {
        if (err.code === 'EEXIST') {
          return reject(new Error('The directory, ' + newDir + ', already exists.'));
        } else {
          return reject(err);
        }
      }
  
      writeTempPackageJson(newDir).then(function () {
        installCore(newDir).then(function () {
          moveCore(newDir).then(function () {
            removeOldCore(newDir).then(function () {
              modifyCoreForRedistribution(newDir).then(function () {
                installProject(newDir).then(function () {
                  console.log('Finished creating story ' + name + '.');
                }, function (err) {
                  return reject(err);  
                });
              }, function (err) {
                return reject(err);
              });
            }, function (err) {
              return reject(err);
            });
          }, function (err) {
            return reject(err);
          });
        }, function (err) {
          return reject(err);
        });
      }, function (err) {
        return reject(err);
      });
    });
  });
};

function writeTempPackageJson(directory) {
  console.log('Writing temporary package.json.');

  var tempPackageJson = JSON.stringify({
    name: 'accelerator-temp',
    version: '0.0.0',
    description: 'If you can see this, something went wrong.',
  });

  return new Promise(function promise(resolve, reject) {
    fs.writeFile(path.join(directory, 'package.json'), tempPackageJson, null, function error(err) {
      if (err && err.code !== 'EEXIST') {
        return reject(err);
      }
  
      resolve(err);
    });
  });
}

function installCore(directory) {
  console.log('Installing accelerator-core.');

  var cmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  var args = [
    'install',
    'accelerator-core'
  ];

  var spawnArgs = {
    cwd: directory,
  };

  var child = childProcess.spawn(cmd, args, spawnArgs);
  child.stdout.on('data', function (data) {
    console.log(data.toString());
  });

  child.stderr.on('data', function (data) {
    console.log(data.toString());
  });

  return new Promise(function promise(resolve, reject) {
    child.on('exit', function (code) {
      if (code) {
        return reject('Core installation exited with code ' + code + '.');
      }

      resolve();
    });
  });
}

function moveCore(directory) {
  console.log('Moving core contents to story folder.');

  var coreDir = path.join(directory, 'node_modules', 'accelerator-core');
  return new Promise(function promise(resolve, reject) {
    var copyArgs = {
      dot: true,
      overwrite: true,
    };

    copy(coreDir, directory, copyArgs, function cb(err) {
      if (err) {
        return reject(err);
      }

      resolve();
    });
  });
}

function removeOldCore(directory) {
  console.log('Removing old core directory.');

  var coreDir = path.join(directory, 'node_modules', 'accelerator_core');
  return new Promise(function promise(resolve, reject) {
    rimraf(coreDir, function (err) {
      if (err) {
        return reject(err);
      }

      resolve();
    });
  });
}

function modifyCoreForRedistribution(directory) {
  console.log('Modifying core for redistribution.');

  return new Promise(function promise(resolve, reject) {
    rewritePackageJson(directory).then(function () {
      writeGitignore(directory).then(function () {
        console.log('Finished modifying core.');
        
        resolve();
      }, function (err) {
        return reject(err);
      });
    }, function (err) {
      return reject(err);
    });
  });
}

function rewritePackageJson(directory) {
  console.log('Rewriting package.json.');
  
  var packagePath = path.join(directory, 'package.json');

  return new Promise(function promise(resolve, reject) {
    fs.readFile(packagePath, function (err, data) {
      if (err) {
        return reject(err);
      }

      var corePackage;
      try {
        corePackage = JSON.parse(data.toString());
      } catch (err) {
        return reject(new Error('There was an error parsing the ' +
                                'package.json file:',
                                err));
      }

      corePackage.name = 'untitled-accelerator-story';
      corePackage.description = 'An untitled story built with Accelerator ' +
                                '(accelerator-core, accelerator-tool).'
      corePackage.version = '1.0.0';

      /* Rewrite jest configuration so that the redistribution tests packages,
       * even though the core repo/package does not. */
      corePackage.jest.testMatch = corePackage.jest.testMatch.map(function (match) {
        if (match.indexOf('%PASSAGES_REDIST_REWRITE%') !== -1) {
          return match.replace('%PASSAGES_REDIST_REWRITE%', 'passages');
        }

        return match;
      });

      var keys = Object.keys(corePackage);
      for (var ii = 0; ii < keys.length; ii += 1) {
        if (keys[ii] === 'bundleDependencies' || keys[ii][0] === '_') {
          delete corePackage[keys[ii]];
        }
      }

      fs.writeFile(packagePath, JSON.stringify(corePackage, null, 2), function (err) {
        if (err) {
          return reject(err);
        }
        
        resolve();
      });
    });
  });
}

function writeGitignore(directory) {
  console.log('Rewriting .gitignore.');

  var gitignorePath = path.join(directory, '.gitignore');

  var gitignore =
    '# See https://help.github.com/ignore-files/ for more about ignoring files.\n' +
    '\n' +
    '# dependencies\n' +
    '/node_modules/\n' +
    '\n' +
    '# testing\n' +
    '/coverage/\n' +
    '\n' +
    '# production\n' +
    '/build*/\n' +
    '\n' +
    '# misc\n' +
    '.DS_Store\n' +
    '.env.local\n' +
    '.env.development.local\n' +
    '.env.test.local\n' +
    '.env.production.local\n' +
    '\n' +
    'npm-debug.log*\n' +
    'yarn-debug.log*\n' +
    'yarn-error.log*\n';

  return new Promise(function promise(resolve, reject) {
    fs.writeFile(gitignorePath, gitignore, function cb(err) {
      if (err) {
        return reject(err);
      }

      resolve();
    });
  });
}

function installProject(directory) {
  console.log('Installing project dependencies.');

  var cmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  var args = [ 'install', ];

  var spawnArgs = {
    cwd: directory,
  };

  var child = childProcess.spawn(cmd, args, spawnArgs);
  child.stdout.on('data', function (data) {
    console.log(data.toString());
  });

  child.stderr.on('data', function (data) {
    console.log(data.toString());
  });

  return new Promise(function promise(resolve, reject) {
    child.on('exit', function (code) {
      if (code) {
        return reject('Project installation exited with code ' + code + '.');
      }

      resolve();
    });
  });
}
