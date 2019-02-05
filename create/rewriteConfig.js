const {
  IFID,
} = require('ifid');
const fs = require('fs-extra');
const makeTemplateReplacements = require('../functions/makeTemplateReplacements');
const path = require('path');

module.exports = async function rewriteConfig(directory, name) {
  const defPath = path.join(directory, 'src', 'configuration', 'defaults');
  const { defaults } = require(defPath);
  const ifid = new IFID().toString();
  const config = {
    ...defaults,
    ifid,
    name,
  };

  const configPath = path.join(directory, 'accelerator.config.js');
  const data = await fs.readFile(configPath, 'utf8');

  const modified = makeTemplateReplacements({
    config,
    data,
  });

  await fs.writeFile(configPath, modified);

  return require(path.join(directory, 'accelerator.config'));
}