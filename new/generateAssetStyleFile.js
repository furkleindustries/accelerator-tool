const fs = require('fs-extra');
const path = require('path');

module.exports = async function generateAssetStyleFile({
  name,
  newAssetDir,
  templatesDir,
  type,
})
{
  const styleTemplatePath = path.join(templatesDir, type + '.scss');
  console.log(`Reading style template from ${styleTemplatePath}.`);

  const data = await fs.readFile(styleTemplatePath);
  console.log('Rewriting style template.');

  const rewrittenData = makeTemplateReplacements({
    data,
    name,
  });

  const newStylePath = path.join(newAssetDir, name + '.scss');

  console.log(`Writing style template to ${newStylePath}.`);

  await fs.writeFile(newStylePath, rewrittenData);
};
