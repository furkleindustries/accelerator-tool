const fs = require('fs-extra');
const path = require('path');

const somethingWentWrongIfYouSawThis =
  'If you\'re reading this, something went wrong.';

module.exports = async function writeTempPackageJson(directory) {
  console.log('Writing temporary package.json.');

  const tempPackageJson = JSON.stringify({
    description: somethingWentWrongIfYouSawThis,
    name: '__accelerator-story-creation-TEMP',
    license: somethingWentWrongIfYouSawThis,
    repository: somethingWentWrongIfYouSawThis,
    version: '0.0.0',
  });

  await fs.writeFile(path.join(directory, 'package.json'), tempPackageJson);
};
