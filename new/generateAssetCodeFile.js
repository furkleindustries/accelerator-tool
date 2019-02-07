const fs = require('fs-extra');
const log = require('../logging/log');
const path = require('path');

module.exports = async function generateAssetCodeFile({
  codeExtension,
  name,
  newAssetDir,
  templatesDir,
  type,
})
{
  const codeTemplatePath = path.join(templatesDir, `${type}${codeExtension}`);

  log(`Reading code template at ${codeTemplatePath}.`);

  const data = await fs.readFile(codeTemplatePath, 'utf8');

  log('Rewriting code template.');

  const rewrittenData = makeTemplateReplacements({
    data,
    name,
  });

  const newCodePath = path.join(newAssetDir, `${name}${codeExtension}`);

  log(`Writing code template to ${newCodePath}`);

  await fs.writeFile(newCodePath, rewrittenData);
};
