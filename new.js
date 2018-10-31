var fs = require('fs');
var path = require('path');

module.exports = function _new(noun, name, directory) {
  return new Promise(function promise(resolve, reject) {
    checkForFilepathReqs(directory).then(function () {
      var passageArgs = [ null, directory, name, ];
      if (/^passage(-tsx?)?$/.test(noun)) {
        passageArgs[0] = 'ts';
      } else if (/^passage-jsx?$/.test(noun)) {
        passageArgs[0] = 'js';
      } else {
        throw new Error('The subcommand ' + noun + ' was not recognized by ' +
                        'the accelerator-tool new command.');
      }

      makeNewPassage.apply(null, passageArgs).then(function () {
        console.log('TypeScript passage, ' + name + ', created.');

        resolve();
      }, function (err) {
        return reject(err);
      });
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

function makeNewPassage(type, directory, name) {
  console.log('Creating new TypeScript passage, ' + name + ' in' + directory +
              '.');

  if (!/^[jt]s$/.test(type)) {
    throw new Error('The type received by makeNewPassage was neither "ts" ' +
                    'nor "js".');
  }

  var codeExtension = type === 'js' ? '.jsx' : '.tsx'
  var passagesDir = path.join(directory, 'passages');
  var templatesDir = path.join(directory, 'templates');
  var codeTemplatePath = path.join(templatesDir, 'passage' + codeExtension);
  var testTemplatePath = path.join(templatesDir, 'passage.test' + codeExtension);
  var styleTemplatePath = path.join(templatesDir, 'passage.scss');
  var newPassageDir = path.join(passagesDir, name);
  return new Promise(function promise(resolve, reject) {
    console.log('Creating new passage directory at ' + newPassageDir);

    fs.mkdir(newPassageDir, function cb(err) {
      if (err) {
        return reject(err);
      }

      console.log('Reading code template at ' + codeTemplatePath);

      fs.readFile(codeTemplatePath, function cb(err, data) {
        if (err) {
          return reject(err);
        }

        console.log('Rewriting code template.');

        var rewrittenData = makeGenericTemplateReplacements({
          data,
          name,
        });

        var newCodePath = path.join(newPassageDir, name + codeExtension);

        console.log('Writing code template to ' + newCodePath);

        fs.writeFile(newCodePath, rewrittenData, function cb(err) {
          if (err) {
            return reject(err);
          }

          console.log('Reading test template from ' + testTemplatePath);

          fs.readFile(testTemplatePath, function cb(err, data) {
            if (err) {
              return reject(err);
            }

            console.log('Rewriting test template.');

            var rewrittenData = makeGenericTemplateReplacements({
              data,
              name,
            });

            var newTestPath = path.join(newPassageDir, name + '.test' + codeExtension);

            console.log('Writing test template to ' + newTestPath);

            fs.writeFile(newTestPath, rewrittenData, function cb(err) {
              if (err) {
                return reject(err);
              }

              console.log('Reading style template from ' + styleTemplatePath);

              fs.readFile(styleTemplatePath, function cb(err, data) {
                if (err) {
                  return reject(err);
                }

                console.log('Rewriting style template.');

                var rewrittenData = makeGenericTemplateReplacements({
                  data,
                  name,
                });

                var newStylePath = path.join(newPassageDir, name + '.scss');

                console.log('Writing style template to ' + newStylePath);

                fs.writeFile(newStylePath, rewrittenData, function cb(err) {
                  if (err) {
                    return reject(err);
                  }

                  resolve();
                });
              });
            });
          });
        });
      });
    })
  });
}

function makeGenericTemplateReplacements(args) {
  return args.data.toString().split('%NAME%').join(args.name);
}
