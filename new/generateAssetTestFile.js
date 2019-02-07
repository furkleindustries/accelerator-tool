const fs = require('fs-extra');
const log = require('../logging/log');
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

  log(`Reading test template from ${testTemplatePath}.`);

  const data = fs.readFile(testTemplatePath);

  log('Rewriting test template.');

  const rewrittenData = makeTemplateReplacements({
    config,
    data,
    name,
  });

  const newTestPath = path.join(newAssetDir, `${name}.test${codeExtension}`);

  log(`Writing test template to ${newTestPath}.`);

  await fs.writeFile(newTestPath, rewrittenData);
};
