const renameCodeWorkspace = require('./renameCodeWorkspace');
const rewritePackageJson = require('./rewritePackageJson');
const rewriteTslint = require('./rewriteTslint');
const writeGitignore = require('./writeGitIgnore');

module.exports = async function modifyCoreForRedistribution(directory, name) {
  console.log('Modifying core for redistribution.');

  await Promise.all([
    renameCodeWorkspace(directory, name),
    rewritePackageJson(directory),
    rewriteTslint(directory),
    writeGitignore(directory),
  ]);

  console.log('Finished modifying core.');
};
