const fs = require('fs-extra');
const path = require('path');

module.exports = async function rewriteTslint(directory) {
  console.log('Rewriting tslint.json.');
  
  const tslintConfigPath = path.join(directory, 'tslint.json');

  const data = await fs.readFile(tslintConfigPath);
  const lintConfig;
  try {
    lintConfig = JSON.parse(data.toString());
  } catch (err) {
    return reject(new Error('There was an error parsing the ' +
                            `package.json file: ${err}.`));
  }

  /* Do not lint source files in redists. */
  lintConfig.linterOptions.exclude.push('src/');
  await fs.writeFile(tslintConfigPath, JSON.stringify(lintConfig, null, 2));
};