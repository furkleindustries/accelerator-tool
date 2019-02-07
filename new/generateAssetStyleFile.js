const fs = require('fs-extra');
const log = require('../logging/log');
const makeTemplateReplacements = require('../functions/makeTemplateReplacements');
const path = require('path');

module.exports = async function generateAssetStyleFile({
  forceCss,
  name,
  newAssetDir,
  noCssModules,
  templatesDir,
  type,
})
{
  const styleTemplatePath = path.join(
    templatesDir,
    `${type}.` +
      (noCssModules ? 'nomodule.' : '') +
      (forceCss ? 'css' : 'scss'),
  );

  log(`Reading style template from ${styleTemplatePath}.`);

  const data = await fs.readFile(styleTemplatePath);
  log('Rewriting style template.');

  const rewrittenData = makeTemplateReplacements({
    data,
    name,
  });

  const newStylePath = path.join(newAssetDir, name + '.scss');

  log(`Writing style template to ${newStylePath}.`);

  await fs.writeFile(newStylePath, rewrittenData);
};
