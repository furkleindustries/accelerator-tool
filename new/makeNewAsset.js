const fs = require('fs-extra');
const path = require('path');

const makeGenericTemplateReplacements = require('./makeGenericTemplateReplacements');

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

  console.log(`Creating new ${type} directory at ${newAssetDir}.`);

  const codeTemplatePath = path.join(templatesDir, type + codeExtension);
  const testTemplatePath = path.join(templatesDir, type + '.test' + codeExtension);
  const styleTemplatePath = path.join(templatesDir, type + '.scss');

  try {
    await fs.mkdir(destinationDir);
  } catch (err) {
    if (err.code !== 'EEXIST') {
      return reject(err);
    }
  }

  await fs.mkdir(newAssetDir);

  console.log(`Reading code template at ${codeTemplatePath}.`);

  const data = await fs.readFile(codeTemplatePath, 'utf8');

  console.log('Rewriting code template.');

  const rewrittenData = makeGenericTemplateReplacements({
    data,
    name,
  });

  const newCodePath = path.join(newAssetDir, name + codeExtension);

  console.log(`Writing code template to ${newCodePath}`);

  await fs.writeFile(newCodePath, rewrittenData);

  console.log(`Reading test template from ${testTemplatePath}.`);

  const data = fs.readFile(testTemplatePath);

  console.log('Rewriting test template.');

  const rewrittenData = makeGenericTemplateReplacements({
    data,
    name,
  });

  const newTestPath = path.join(newAssetDir, name + '.test' + codeExtension);

  console.log(`Writing test template to ${newTestPath}.`);

  await fs.writeFile(newTestPath, rewrittenData);

  if (includeStyle) {
    console.log(`Reading style template from ${styleTemplatePath}.`);

    const data = await fs.readFile(styleTemplatePath);
    console.log('Rewriting style template.');

    const rewrittenData = makeGenericTemplateReplacements({
      data,
      name,
    });

    const newStylePath = path.join(newAssetDir, name + '.scss');

    console.log(`Writing style template to ${newStylePath}.`);

    await fs.writeFile(newStylePath, rewrittenData);
  }
};
