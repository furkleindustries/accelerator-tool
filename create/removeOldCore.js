const fs = require('fs-extra');
const path = require('path');

module.exports = async function removeOldCore(directory) {
  console.log('Removing old core directory.');

  const coreDir = path.join(directory, 'node_modules', 'accelerator_core');
  await fs.remove(coreDir);
};
