const makeNewAsset = require('./makeNewAsset');
const path = require('path');

module.exports = async function makeNewPassage({
  config,
  directory,
  forceCss,
  forceJavaScript,
  name,
  noCssModules,
  noTests,
}) {
  const type = 'passage';
  const destinationDir = path.join(directory, `${type}s`);
  const includeStyle = true;
  const templatesDir = path.join(directory, 'templates', type);

  return await makeNewAsset({
    config,
    destinationDir,
    forceCss,
    forceJavaScript,
    includeStyle,
    name,
    noCssModules,
    noTests,
    templatesDir,
    type,
  });
};
