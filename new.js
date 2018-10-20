var fs = require('fs');
var path = require('path');

module.exports = function _new(noun, name, directory) {
  return new Promise(function promise(resolve, reject) {
    checkForFilepathReqs(directory).then(function resolve() {
      if (/^passage(-tsx?)?$/.test(noun)) {
        makeNewTsPassage(directory, name).then(function resolve() {
          console.log('Passage ')
        }, function reject(err) {
          throw err;
        });
      } else if (/^passage-jsx?$/.test(noun)) {
        makeNewJsPassage(directory, name).then(function resolve() {
    
        }, function reject(err) {
          throw err;
        });
      } else {
        throw new Error('The subcommand ' + noun + ' was not recognized by ' +
                        'the accelerator-tool new command.');
      }
    }, function reject(err) {
      throw err;
    });
  });
};

function checkForFilepathReqs(directory) {
  console.log('Checking filepath requirements.');

  return new Promise(function promise(resolve, reject) {
    fs.exists(directory, function cb(exists) {
      if (exists) {
        reject(new Error('There was already a directory at ' + directory + '.'));
      }
  
      fs.exists(path.join(directory, 'passages'), function cb(exists) {
        if (!exists) {
          reject(new Error('There was no passages directory within ' +
                            directory + '.'));
        }
      });
    });
  });
}

function makeNewTsPassage(directory, name) {
  console.log('Creating new TypeScript passage, ' + name + ' in' + directory +
              '.');

  var passagesDir = path.join(directory, 'passages');
  var templatePath = path.join(directory, 'templates', 'passage.tsx');
  var newPassageDir = path.join(passagesDir, name);
  return new Promise(function promise(resolve, reject) {
    fs.mkdir(newPassageDir, function cb(err) {
      if (err) {
        reject(err);
      }

      fs.readFile(templatePath, function cb(err, data) {
        if (err) {
          reject(err);
        }

        var rewrittenData = makeGenericPassageReplacements({
          data,
          name,
        });

        fs.writeFile(path.join(passagesDir, name), rewrittenData, function cb(err) {
          if (err) {
            reject(err);
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
        reject(err);
      }

      fs.readFile(templatePath, function cb(err, data) {
        if (err) {
          reject(err);
        }

        var rewrittenData = makeGenericPassageReplacements({
          data,
          name,
        });

        fs.writeFile(path.join(passagesDir, name), rewrittenData, function cb(err) {
          if (err) {
            reject(err);
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
