const chalk = require('chalk');
const fs = require('fs-extra');
const generateAssetCodeFile = require('./generateAssetCodeFile');
const generateAssetStyleFile = require('./generateAssetStyleFile');
const generateAssetTestFile = require('./generateAssetTestFile');
const log = require('../logging/log');
const path = require('path');

module.exports = async function makeNewAsset({
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
})
{
  const newAssetDir = path.join(destinationDir, name);

  log(`Creating new ${type} directory at "${chalk.bold(newAssetDir)}".`);

  try {
    await fs.mkdir(destinationDir);
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw err;
    }
  }

  await fs.mkdir(newAssetDir);

  const codeExtension = forceJavaScript ? '.jsx' : '.tsx';

  generateAssetCodeFile({
    codeExtension,
    config,
    name,
    newAssetDir,
    templatesDir,
    type,
  });

  if (!noTests) {
    generateAssetTestFile({
      codeExtension,
      name,
      newAssetDir,
      templatesDir,
      type,
    });
  }

  if (includeStyle) {
    generateAssetStyleFile({
      forceCss,
      name,
      newAssetDir,
      noCssModules,
      templatesDir,
      type,
    });
  }
};
