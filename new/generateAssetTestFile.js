const fs = require('fs-extra');
const path = require('path');

module.exports = function generateAssetTestFile({
  codeExtension,
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

  console.log(`Reading test template from ${testTemplatePath}.`);

  const data = fs.readFile(testTemplatePath);

  console.log('Rewriting test template.');

  const rewrittenData = makeTemplateReplacements({
    data,
    name,
  });

  const newTestPath = path.join(newAssetDir, `${name}.test${codeExtension}`);

  console.log(`Writing test template to ${newTestPath}.`);

  await fs.writeFile(newTestPath, rewrittenData);
}
