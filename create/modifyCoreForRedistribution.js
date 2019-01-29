const renameCodeWorkspace = require('./renameCodeWorkspace');
const rewriteIndexHtml = require('./rewriteIndexHtml');
const rewritePackageJson = require('./rewritePackageJson');
const rewriteTslint = require('./rewriteTslint');
const writeGitignore = require('./writeGitIgnore');

module.exports = async function modifyCoreForRedistribution(directory, name) {
  console.log('Modifying core for redistribution.');

  await Promise.all([
    rewritePackageJson(directory),
    rewriteIndexHtml(directory),
    rewriteTslint(directory),
    writeGitignore(directory),
    renameCodeWorkspace(directory, name),
  ]);

  console.log('Finished modifying core.');
};
