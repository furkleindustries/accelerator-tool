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

        }, function reject() {

        });
      }, function reject(err) {
        throw err;
      });
    }, function reject(err) {
      throw err;
    });
  });
}

function writeTempPackageJson(directory) {
  console.log('Writing temporary package.json.');

  var tempPackageJson = JSON.stringify({
    name: 'accelerator-temp',
    version: '0.0.0',
    description: 'If you can see this, something went wrong.',
  });

  fs.writeFile(path.join(directory, 'package.json'), tempPackageJson, null, function error(err) {
    if (err && err.code !== 'EEXIST') {
      reject(err);
    }

    resolve(err);
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

  var coreDir = join(directory, 'node_modules', 'accelerator_core');
  return new Promise(function promise(resolve, reject) {
    copy(join(coreDir, '*'), directory, function cb(err) {
      if (err) {
        reject(err);
      }

      rimraf(coreDir, null, function cb(err) {
        if (err) {
          reject(err);
        }

        resolve();
      });
    });
  });
}
