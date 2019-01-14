const path = require('path');

const makeNewAsset = require('./makeNewAsset');

module.exports = async function makeNewHeader(type, directory, name) {
  if (!/^header-[jt]s$/.test(type)) {
    throw new Error('The type received by makeNewHeader was neither ' +
                    '"header-ts" nor "header-js".');
  }

  const codeExtension = type === 'header-js' ? '.jsx' : '.tsx'
  const destinationDir = path.join(directory, 'headers');
  const includeStyle = true;
  const templatesDir = path.join(directory, 'templates', type);

  return await makeNewAsset({
    codeExtension,
    destinationDir,
    includeStyle,
    name,
    templatesDir,
    type: 'header',
  });
};
