const fs = require('fs-extra');
const log = require('../logging/log');
const path = require('path');

module.exports = async function moveCore(directory) {
  log('Moving core contents to story folder.');

  const coreDir = path.join(directory, 'node_modules', 'accelerator-core');
  const copyArgs = {
    dot: true,
    overwrite: true,
  };

  await fs.copy(coreDir, directory, copyArgs);
};
