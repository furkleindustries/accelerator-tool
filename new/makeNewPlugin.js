const path = require('path');

const makeNewAsset = require('./makeNewAsset');

module.exports = async function makeNewPlugin(type, directory, name) {
  if (!/^plugin-[jt]s$/.test(type)) {
    throw new Error('The type received by makeNewFooter was neither ' +
                    '"footer-ts" nor "footer-js".');
  }

  const codeExtension = type === 'plugin-js' ? '.jsx' : '.tsx'
  const destinationDir = path.join(directory, 'plugins');
  /* Plugins do not have any styling by default. */
  const includeStyle = false;
  const templatesDir = path.join(directory, 'templates', type);

  return await makeNewAsset({
    codeExtension,
    destinationDir,
    includeStyle,
    name,
    templatesDir,
    type: 'plugin',
  });
};
