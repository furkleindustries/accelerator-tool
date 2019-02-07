const makeNewAsset = require('./makeNewAsset');
const path = require('path');

module.exports = async function makeNewHeader({
  directory,
  forceCss,
  forceJavaScript,
  name,
  noCssModules,
  noTests,
}) {
  const type = 'header';
  const destinationDir = path.join(directory, `${type}s`);
  const includeStyle = true;
  const templatesDir = path.join(directory, 'templates', type);

  return await makeNewAsset({
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
