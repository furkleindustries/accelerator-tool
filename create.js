var childProcess = require('child_process');
var fs = require('fs');
var path = require('path');
var rimraf = require('rimraf');
var copy = require('recursive-copy');

module.exports = function create(name, directory) {
  console.log('Creating story ' + name + ' at ' + directory + '.');

  fs.mkdir(directory, function error(err) {
    if (err && err.code !== 'EEXIST') {
      throw new Error(err);
    }

    writeTempPackageJson(directory).then(function resolve() {
      installCore(directory).then(function resolve() {
        moveCore(directory).then(function resolve() {
          removeOldCore(directory).then(function resolve() {
            modifyCoreForRedistribution(directory).then(function resolve() {
              console.log('Finished creating story ' + name + '.');
            }, function reject(err) {
              throw err;
            });
          }, function reject(err) {
            throw err;
          });
        }, function reject(err) {
          throw err;
        });
      }, function reject(err) {
        throw err;
      });
    }, function reject(err) {
      throw err;
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
        reject(err);
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
        reject('Installation exited with code ' + code + '.');
      }

      resolve();
    });
  })
}

function moveCore(directory) {
  console.log('Moving core contents to story folder.');

  var coreDir = path.join(directory, 'node_modules', 'accelerator_core');
  return new Promise(function promise(resolve, reject) {
    copy(path.join(coreDir, '*'), directory, function cb(err) {
      if (err) {
        reject(err);
      }

      rimraf(coreDir, null, function cb(err) {
        console.log('Removing core contents from node_modules.');

        if (err) {
          reject(err);
        }

        resolve();
      });
    });
  });
}

function removeOldCore(directory) {
  console.log('Removing old core directory.');

  var coreDir = path.join(directory, 'node_modules', 'accelerator_core');
  return new Promise(function promise(resolve, reject) {
    rimraf(coreDir, function (err) {
      if (err) {
        reject(err);
      }

      resolve();
    });
  });
}

function modifyCoreForRedistribution(directory) {
  console.log('Modifying core for redistribution.');

  var packagePath = path.join(directory, 'package.json');

  return new Promise(function promise(resolve, reject) {
    rewritePackageJson(directory).then(function resolve() {
      rewriteGitignore(directory).then(function resolve() {
        console.log('Finished modifying core.');
      }, function reject(err) {
        throw err;
      });
    }, function reject(err) {
      throw err;
    });
  });
}

function rewritePackageJson(directory) {
  console.log('Rewriting package.json.');
  
  return new Promise(function promise(resolve, reject) {
    var corePackage = require(packagePath);
    corePackage.name = 'untitled-accelerator-story';
    corePackage.description = 'An untitled story built with Accelerator ' +
                              '(accelerator-core, accelerator-tool).'
    corePackage.version = '1.0.0';
    fs.writeFile(packagePath, JSON.stringify(corePackage, null, 2), function (err) {
      if (err) {
        reject(err);
      }
      
      resolve();
    });
  });
}

function rewriteGitignore(directory) {
  console.log('Rewriting .gitignore.');

  var gitignorePath = path.join(directory, '.gitignore');

  return new Promise(function promise(resolve, reject) {
    fs.readFile(gitignorePath, function cb(err, data) {
      if (err) {
        reject(err);
      }

      var gitignorePattern = 
        '# passages\n' +
        '/passages/*\n' +
        '!/passages/.gitkeep\n' +
        '# endpassages\n';
      var dataStr = data.toString().replace(gitignorePattern, '');

      writeFile(gitignorePath, dataStr, function cb(err) {
        if (err) {
          reject(err);
        }

        resolve();
      });
    });
  });
}
