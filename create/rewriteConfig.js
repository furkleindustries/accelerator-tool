const {
  IFID,
} = require('ifid');
const fs = require('fs-extra');

module.exports = async function rewriteConfig(directory, name) {
  const defaults = require(path.join(directory, 'config', 'defaults'));
  const ifid = new IFID();
  const config = {
    ...defaults,
    ifid,
    name,
  };

  const data = await fs.readFile(
    path.join(directory, 'accelerator-config.js'),
    'utf8',
  );

  makeTemplateReplacements({
    config,
    data,
    name,
  });

  return require(path.join(directory, 'accelerator-config'));
}