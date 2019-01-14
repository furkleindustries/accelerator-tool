const fs = require('fs-extra');
const path = require('path');

module.exports = async function writeGitignore(directory) {
  console.log('Rewriting .gitignore.');

  const gitignorePath = path.join(directory, '.gitignore');

  const gitignore =
    '# See https://help.github.com/ignore-files/ for more about ignoring files.\n' +
    '\n' +
    '# dependencies\n' +
    '/node_modules/\n' +
    '\n' +
    '# testing\n' +
    '/coverage/\n' +
    '\n' +
    '# production\n' +
    '/build*/\n' +
    '\n' +
    '# misc\n' +
    '.DS_Store\n' +
    '.env.local\n' +
    '.env.development.local\n' +
    '.env.test.local\n' +
    '.env.production.local\n' +
    '\n' +
    'npm-debug.log*\n' +
    'yarn-debug.log*\n' +
    'yarn-error.log*\n';

  await fs.writeFile(gitignorePath, gitignore);
};
