const path = require('path');

const makeNewAsset = require('./makeNewAsset');

module.exports = async function makeNewFooter(type, directory, name) {
  if (!/^footer-[jt]s$/.test(type)) {
    throw new Error('The type received by makeNewFooter was neither ' +
                    '"footer-ts" nor "footer-js".');
  }

  const codeExtension = type === 'footer-js' ? '.jsx' : '.tsx'
  const destinationDir = path.join(directory, 'footers');
  const includeStyle = true;
  const templatesDir = path.join(directory, 'templates', type);

  return await makeNewAsset({
    codeExtension,
    destinationDir,
    includeStyle,
    name,
    templatesDir,
    type: 'footer',
  });
};
