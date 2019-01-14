const path = require('path');

const makeNewAsset = require('./makeNewAsset');

module.exports = async function makeNewPassage(type, directory, name) {
  if (!/^passage-[jt]s$/.test(type)) {
    throw new Error('The type received by makeNewPassage was neither ' +
                    '"passage-ts" nor "passage-js".');
  }

  const codeExtension = type === 'passage-js' ? '.jsx' : '.tsx'
  const destinationDir = path.join(directory, 'passages');
  const includeStyle = true;
  const templatesDir = path.join(directory, 'templates', type);

  return await makeNewAsset({
    codeExtension,
    destinationDir,
    includeStyle,
    name,
    templatesDir,
    type: 'passage',
  });
};
