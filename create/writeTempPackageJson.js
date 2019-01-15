const fs = require('fs-extra');
const path = require('path');

module.exports = async function writeTempPackageJson(directory) {
  console.log('Writing temporary package.json.');

  const tempPackageJson = JSON.stringify({
    name: 'accelerator-temp',
    version: '0.0.0',
    description: 'If you\'re reading this, something went wrong.',
  });

  await fs.writeFile(path.join(directory, 'package.json'), tempPackageJson);
};
