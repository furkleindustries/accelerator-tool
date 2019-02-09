const chalk = require('chalk');
const fs = require('fs-extra');
const log = require('colorful-logging/log');
const makeTemplateReplacements = require('../functions/makeTemplateReplacements');
const path = require('path');

module.exports = async function generateAssetTestFile({
  codeExtension,
  config,
  name,
  newAssetDir,
  templatesDir,
  type,
})
{
  const testTemplatePath = path.join(
    templatesDir,
    `${type}.test${codeExtension}`,
  );

  log(`Reading test template from "${chalk.bold(testTemplatePath)}".`);

  const data = await fs.readFile(testTemplatePath, 'utf8');

  log('Rewriting test template.');

  const rewrittenData = makeTemplateReplacements({
    config,
    data,
    name,
  });

  const newTestPath = path.join(newAssetDir, `${name}.test${codeExtension}`);

  log(`Writing test template to "${chalk.bold(newTestPath)}".`);

  await fs.writeFile(newTestPath, rewrittenData);
};
