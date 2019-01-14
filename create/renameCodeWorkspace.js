const fs = require('fs-extra');
const path = require('path');

module.exports = async function renameCodeWorkspace(directory, name) {
  console.log('Renaming code-workspace file.');

  const from = path.join(directory, 'accelerator-core.code-workspace');
  const to = path.join(directory, `${name}.code-workspace`);
  await fs.rename(from, to);
};