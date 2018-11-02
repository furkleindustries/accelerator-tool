var fs = require('fs');
var path = require('path');

module.exports = function _new(noun, name, directory) {
  return new Promise(function promise(resolve, reject) {
    checkForFilepathReqs(directory).then(function () {
      var newArgs = [ null, directory, name, ];
      if (/^passage(-tsx?)?$/.test(noun)) {
        newArgs[0] = 'passage-ts';
      } else if (/^passage-jsx?$/.test(noun)) {
        newArgs[0] = 'passage-js';
      } else if (/^header(-tsx?)?$/.test(noun)) {
        newArgs[0] = 'header-ts';
      } else if (/^header-jsx?$/.test(noun)) {
        newArgs[0] = 'header-js';
      } else if (/^footer(-tsx?)?$/.test(noun)) {
        newArgs[0] = 'footer-ts';
      } else if (/^footer-jsx?$/.test(noun)) {
        newArgs[0] = 'footer-js';
      } else if (/^plugin(-tsx?)?$/.test(noun)) {
        newArgs[0] = 'plugin-ts';
      } else if (/^plugin-jsx?$/.test(noun)) {
        newArgs[0] = 'plugin-js';
      } else {
        throw new Error('The subcommand ' + noun + ' was not recognized by ' +
                        'the accelerator-tool new command.');
      }

      if (newArgs[0] === 'passage-ts' || newArgs[0] === 'passage-js') {
        makeNewPassage.apply(null, newArgs).then(function () {
          console.log(
            (/js$/.test(newArgs[0]) ? 'JavaScript ' : 'TypeScript ') +
            'passage, ' + name + ', created.'
          );

          resolve();
        }, function (err) {
          return reject(err);
        });
      } else if (newArgs[0] === 'header-ts' || newArgs[0] === 'header-js') {
        makeNewHeader.apply(null, newArgs).then(function () {
          console.log(
            (/js$/.test(newArgs[0]) ? 'JavaScript ' : 'TypeScript ') +
            'header, ' + name + ', created.'
          );
  
          resolve();
        }, function (err) {
          return reject(err);
        });
      } else if (newArgs[0] === 'footer-ts' || newArgs[0] === 'footer-js') {
        makeNewFooter.apply(null, newArgs).then(function () {
          console.log(
            (/js$/.test(newArgs[0]) ? 'JavaScript ' : 'TypeScript ') +
            'footer, ' + name + ', created.'
          );

          resolve();
        }, function (err) {
          return reject(err);
        });
      } else if (newArgs[0] === 'plugin-ts' || newArgs[0] === 'plugin-js') {
        makeNewPlugin.apply(null, newArgs).then(function () {
          console.log(
            (/js$/.test(newArgs[0]) ? 'JavaScript ' : 'TypeScript ') +
            'plugin, ' + name + ', created.'
          );

          resolve();
        });
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
          var err = new Error(
            'There was no passages directory within ' + directory + '.'
          );

          return reject(err);
        }

        resolve();
      });
    });
  });
}

function makeNewPassage(type, directory, name) {
  if (!/^passage-[jt]s$/.test(type)) {
    throw new Error('The type received by makeNewPassage was neither ' +
                    '"passage-ts" nor "passage-js".');
  }

  var type = 'passage';
  var codeExtension = type === 'passage-js' ? '.jsx' : '.tsx'
  var destinationDir = path.join(directory, 'passages');
  var includeStyle = true;
  var templatesDir = path.join(directory, 'templates', type);

  return makeNewAsset({
    codeExtension,
    destinationDir,
    includeStyle,
    name,
    templatesDir,
    type,
  });
}

function makeNewHeader(type, directory, name) {
  if (!/^header-[jt]s$/.test(type)) {
    throw new Error('The type received by makeNewHeader was neither ' +
                    '"header-ts" nor "header-js".');
  }

  var type = 'header';
  var codeExtension = type === 'header-js' ? '.jsx' : '.tsx'
  var destinationDir = path.join(directory, 'headers');
  var includeStyle = true;
  var templatesDir = path.join(directory, 'templates', type);

  return makeNewAsset({
    codeExtension,
    destinationDir,
    includeStyle,
    name,
    templatesDir,
    type,
  });
}

function makeNewFooter(type, directory, name) {
  if (!/^footer-[jt]s$/.test(type)) {
    throw new Error('The type received by makeNewFooter was neither ' +
                    '"footer-ts" nor "footer-js".');
  }

  var type = 'footer';
  var codeExtension = type === 'footer-js' ? '.jsx' : '.tsx'
  var destinationDir = path.join(directory, 'footers');
  var includeStyle = true;
  var templatesDir = path.join(directory, 'templates', type);

  return makeNewAsset({
    codeExtension,
    destinationDir,
    includeStyle,
    name,
    templatesDir,
    type,
  });
}

function makeNewPlugin(type, directory, name) {
  if (!/^plugin-[jt]s$/.test(type)) {
    throw new Error('The type received by makeNewFooter was neither ' +
                    '"footer-ts" nor "footer-js".');
  }

  var type = 'plugin';
  var codeExtension = type === 'plugin-js' ? '.jsx' : '.tsx'
  var destinationDir = path.join(directory, 'plugins');
  /* Plugins do not have any styling by default. */
  var includeStyle = false;
  var templatesDir = path.join(directory, 'templates', type);

  return makeNewAsset({
    codeExtension,
    destinationDir,
    includeStyle,
    name,
    templatesDir,
    type,
  });
}

function makeNewAsset(args) {
  var codeExtension = args.codeExtension;
  var destinationDir = args.destinationDir;
  var includeStyle = args.includeStyle;
  var name = args.name;
  var templatesDir = args.templatesDir;
  var type = args.type;

  var newAssetFolder = path.join(destinationDir, name);

  console.log('Creating new ' + type + ' directory at ' + newAssetFolder);

  var codeTemplatePath = path.join(templatesDir, type + codeExtension);
  var testTemplatePath = path.join(templatesDir, type + '.test' + codeExtension);
  var styleTemplatePath = path.join(templatesDir, type + '.scss');

  return new Promise(function promise(resolve, reject) {
    fs.mkdir(destinationDir, function cb(err) {
      if (err && err.code !== 'EEXIST') {
        return reject(err);
      }

      fs.mkdir(newAssetFolder, function cb(err) {
        if (err) {
          reject(err);
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

          var newCodePath = path.join(destinationDir, name + codeExtension);

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

              var newTestPath = path.join(destinationDir, name + '.test' + codeExtension);

              console.log('Writing test template to ' + newTestPath);

              fs.writeFile(newTestPath, rewrittenData, function cb(err) {
                if (err) {
                  return reject(err);
                }

                if (includeStyle) {
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

                    var newStylePath = path.join(destinationDir, name + '.scss');

                    console.log('Writing style template to ' + newStylePath);

                    fs.writeFile(newStylePath, rewrittenData, function cb(err) {
                      if (err) {
                        return reject(err);
                      }

                      resolve();
                    });
                  });
                } else {
                  resolve();
                }
              });
            });
          });
        });
      });
    });
  });
}

function makeGenericTemplateReplacements(args) {
  return args.data.toString().split('%NAME%').join(args.name);
}
