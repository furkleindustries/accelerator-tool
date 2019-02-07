const fs = require('fs-extra');
const log = require('../logging/log');
const path = require('path');

module.exports = async function rewritePackageJson(directory) {
  log('Rewriting package.json.');

  const packagePath = path.join(directory, 'package.json');

  const data = await fs.readFile(packagePath, 'utf8');
  let corePackage;
  try {
    corePackage = JSON.parse(data);
  } catch (err) {
    throw new Error(`There was an error parsing the package.json file: ${err}`);
  }

  /* Keep most important properties on top of the file. */
  corePackage = {
    ...corePackage,

    author: 'Unknown author',
    description: 'An untitled story built with Accelerator ' +
      '(accelerator-core, accelerator-tool).',

    name: 'untitled-accelerator-story',
    private: true,
    version: '1.0.0',
  };

  const toDelete = [
    'bugs',
    'bundleDependencies',
    'license',
    'repository',
  ];

  Object.keys(corePackage).forEach((key) => {
    if (key[0] === '_' || toDelete.includes(key)) {
      delete corePackage[key];
    }
  });

  await fs.writeFile(packagePath, JSON.stringify(corePackage, null, 2));
}
