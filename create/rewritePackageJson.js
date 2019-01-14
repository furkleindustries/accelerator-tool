const fs = require('fs-extra');
const path = require('path');

module.exports = async function rewritePackageJson(directory) {
  console.log('Rewriting package.json.');
  
  const packagePath = path.join(directory, 'package.json');

  const data = await fs.readFile(packagePath, 'utf8');
  const corePackage;
  try {
    corePackage = JSON.parse(data);
  } catch (err) {
    throw new Error(`There was an error parsing the package.json file: ${err}`);
  }

  /* Keep most important properties on top of the file. */
  corePackage = {
    ...corePackage,
    name: 'untitled-accelerator-story',
    description: 'An untitled story built with Accelerator ' +
                  '(accelerator-core, accelerator-tool).',
    version: '1.0.0',
    private: true,
  };

  /* Rewrite jest configuration so that the redist tests passages, headers,
   * footers, and plugins, even though the core repo/package does not, and
   * the redist does not test src/, even though the repo/package does. */
  corePackage.jest.testMatch = [
    '<rootDir>/(passages|headers|footers|plugins)/**/?(*.)(spec|test).(j|t)s?(x)',
  ];

  delete corePackage.author;
  delete corePackage.bugs;
  delete corePackage.bundleDependencies;
  delete corePackage.repository;

  const keys = Object.keys(corePackage);
  for (const ii = 0; ii < keys.length; ii += 1) {
    if (keys[ii][0] === '_') {
      delete corePackage[keys[ii]];
    }
  }

  await fs.writeFile(packagePath, JSON.stringify(corePackage, null, 2));
}
