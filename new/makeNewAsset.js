const chalk = require('chalk');
const log = require('colorful-logging/log');
const fs = require('fs-extra');
const generateAssetCodeFile = require('./generateAssetCodeFile');
const generateAssetStyleFile = require('./generateAssetStyleFile');
const generateAssetTestFile = require('./generateAssetTestFile');
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
}) {
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

  const promises = [
    generateAssetCodeFile({
      codeExtension,
      config,
      name,
      newAssetDir,
      templatesDir,
      type,
    }),
  ];

  if (!noTests) {
    promises.push(generateAssetTestFile({
      codeExtension,
      config,
      name,
      newAssetDir,
      templatesDir,
      type,
    }));
  }

  if (includeStyle) {
    promises.push(generateAssetStyleFile({
      config,
      forceCss,
      name,
      newAssetDir,
      noCssModules,
      templatesDir,
      type,
    }));
  }

  await Promise.all(promises);
};
