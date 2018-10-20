var fs = require('fs');
var path = require('path');

module.exports = function _new(noun, name, directory) {
  return new Promise(function promise(resolve, reject) {
    checkForFilepathReqs(directory).then(function () {
      if (/^passage(-tsx?)?$/.test(noun)) {
        makeNewTsPassage(directory, name).then(function () {
          console.log('TypeScript passage, ' + name + ', created.');
        }, function (err) {
          return reject(err);
        });
      } else if (/^passage-jsx?$/.test(noun)) {
        makeNewJsPassage(directory, name).then(function () {
          console.log('JavaScript passage, ' + name + ', created.');
        }, function (err) {
          return reject(err);
        });
      } else {
        throw new Error('The subcommand ' + noun + ' was not recognized by ' +
                        'the accelerator-tool new command.');
      }
    }, function (err) {
      return reject(err);
    });
  });
};

function checkForFilepathReqs(directory) {
  console.log('Checking filepath requirements.');

  return new Promise(function promise(resolve, reject) {
    fs.exists(directory, function cb(exists) {
      if (!exists) {
        return reject(new Error('There was no directory at ' + directory + '.'));
      }
  
      fs.exists(path.join(directory, 'passages'), function cb(exists) {
        if (!exists) {
          return reject(new Error('There was no passages directory within ' +
                            directory + '.'));
        }

        resolve();
      });
    });
  });
}

function makeNewTsPassage(directory, name) {
  console.log('Creating new TypeScript passage, ' + name + ' in ' + directory +
              '.');

  var passagesDir = path.join(directory, 'passages');
  var templatePath = path.join(directory, 'templates', 'passage.tsx');
  var newPassageDir = path.join(passagesDir, name);
  return new Promise(function promise(resolve, reject) {
    fs.mkdir(newPassageDir, function cb(err) {
      if (err) {
        if (err.code === 'EEXIST') {
          return reject(new Error('There is already a passages/' + name + ' ' +
                                  'directory.'));
        }

        return reject(err);
      }

      fs.readFile(templatePath, function cb(err, data) {
        if (err) {
          return reject(err);
        }

        var rewrittenData = makeGenericPassageReplacements({
          data,
          name,
        });

        fs.writeFile(path.join(newPassageDir, name + '.tsx'), rewrittenData, function cb(err) {
          if (err) {
            return reject(err);
          }

          resolve();
        });
      });
    })
  });
}

function makeNewJsPassage(directory) {
  console.log('Creating new TypeScript passage, ' + name + ' in' + directory +
              '.');

  var passagesDir = path.join(directory, 'passages');
  var templatePath = path.join(directory, 'templates', 'passage.tsx');
  var newPassageDir = path.join(passagesDir, name);
  return new Promise(function promise(resolve, reject) {
    fs.mkdir(newPassageDir, function cb(err) {
      if (err) {
        return reject(err);
      }

      fs.readFile(templatePath, function cb(err, data) {
        if (err) {
          return reject(err);
        }

        var rewrittenData = makeGenericPassageReplacements({
          data,
          name,
        });

        fs.writeFile(path.join(newPassageDir, name + '.jsx'), rewrittenData, function cb(err) {
          if (err) {
            return reject(err);
          }

          resolve();
        });
      });
    })
  });
}

function makeGenericPassageReplacements(args) {
  return args.data.toString().replace('%NAME%', args.name);
}
