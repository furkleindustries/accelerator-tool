const fs = require('fs-extra');
const log = require('../logging/log');
const path = require('path');

const somethingWentWrongIfYouSawThis =
  'If you\'re reading this, something went wrong.';

module.exports = async function writeTempPackageJson(directory) {
  log('Writing temporary package.json.');

  const tempPackageJson = JSON.stringify({
    description: somethingWentWrongIfYouSawThis,
    name: '__accelerator-story-creation-TEMP',
    license: 'GPL-3.0-only',
    repository: somethingWentWrongIfYouSawThis,
    version: '0.0.0',
  });

  await fs.writeFile(path.join(directory, 'package.json'), tempPackageJson);
};
