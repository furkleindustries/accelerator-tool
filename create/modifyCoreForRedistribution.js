const renameCodeWorkspace = require('./renameCodeWorkspace');
const rewriteConfig = require('./rewriteConfig');
const rewriteIndexHtml = require('./rewriteIndexHtml');
const rewritePackageJson = require('./rewritePackageJson');
const rewriteTslint = require('./rewriteTslint');

module.exports = async function modifyCoreForRedistribution(directory, name) {
  console.log('Modifying core for redistribution.');

  const config = await rewriteConfig(directory, name);

  await Promise.all([
    renameCodeWorkspace(directory, name),
    rewriteIndexHtml(directory, config),
    rewritePackageJson(directory),
    rewriteTslint(directory),
  ]);

  console.log('Finished modifying core.');
};
