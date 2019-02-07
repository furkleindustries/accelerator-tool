const fs = require('fs-extra');
const generateAssetCodeFile = require('./generateAssetCodeFile');
const generateAssetStyleFile = require('./generateAssetStyleFile');
const generateAssetTestFile = require('./generateAssetTestFile');
const log = require('../logging/log');
const path = require('path');

module.exports = async function makeNewAsset({
  codeExtension,
  destinationDir,
  includeStyle,
  name,
  templatesDir,
  type,
})
{
  const newAssetDir = path.join(destinationDir, name);

  log(`Creating new ${type} directory at ${newAssetDir}.`);

  try {
    await fs.mkdir(destinationDir);
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw err;
    }
  }

  await fs.mkdir(newAssetDir);

  generateAssetCodeFile({
    codeExtension,
    name,
    newAssetDir,
    templatesDir,
    type,
  });

  generateAssetTestFile({
    codeExtension,
    name,
    newAssetDir,
    templatesDir,
    type,
  });

  if (includeStyle) {
    generateAssetStyleFile({
      name,
      newAssetDir,
      templatesDir,
      type,
    });
  }
};
