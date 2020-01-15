import chalk from 'chalk';
import {
  log,
} from 'colorful-logging';
import * as fs from 'fs-extra';
import {
  generateAssetCodeFile,
} from './generateAssetCodeFile';
import {
  generateAssetStyleFile,
} from './generateAssetStyleFile';
import {
  generateAssetTestFile,
} from './generateAssetTestFile';
import * as path from 'path';

export async function makeNewAsset({
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

  const codeExtension = forceJavaScript ? 'jsx' : 'tsx';

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

  /* Generate the authoring MDX (markdown+react) passage. */
  if (type === 'passage') {
    generateAssetCodeFile({
      config,
      name,
      newAssetDir,
      templatesDir,
      type,
      codeExtension: 'mdx',
    });
  }

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
}
