const chalk = require('chalk');
const fs = require('fs-extra');
const log = require('colorful-logging/log');
const makeTemplateReplacements = require('../functions/makeTemplateReplacements');
const path = require('path');

module.exports = async function generateAssetStyleFile({
  config,
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

  log(`Reading style template from "${chalk.bold(styleTemplatePath)}".`);

  const data = await fs.readFile(styleTemplatePath, 'utf8');
  log('Rewriting style template.');

  const rewrittenData = makeTemplateReplacements({
    config,
    data,
    name,
  });

  const newStylePath = path.join(newAssetDir, name + '.scss');

  log(`Writing style template to "${chalk.bold(newStylePath)}".`);

  await fs.writeFile(newStylePath, rewrittenData);
};
