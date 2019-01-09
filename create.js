const childProcess = require('child_process');
const fs = require('fs-extra');
const path = require('path');

module.exports = async function create(name, directory) {
  console.log('Creating story "' + name + '" at ' + directory);

  const newDir = directory;
  try {
    await fs.mkdir(newDir);
  } catch (err) {
    if (err.code === 'EEXIST') {
      throw new Error('The directory, ' + newDir + ', already exists.');
    } else {
      throw err;
    }
  }

  try {
    await writeTempPackageJson(newDir);
    await installCore(newDir);
    await moveCore(newDir);
    await removeOldCore(newDir);
    await modifyCoreForRedistribution(newDir, name);
    await installProject(newDir);
    console.log('Finished creating story ' + name + '.');
  } catch (err) {
    console.error(err);
  }
};

async function writeTempPackageJson(directory) {
  console.log('Writing temporary package.json.');

  const tempPackageJson = JSON.stringify({
    name: 'accelerator-temp',
    version: '0.0.0',
    description: 'If you\'re reading this, something went wrong.',
  });

  try {
    await fs.writeFile(path.join(directory, 'package.json'), tempPackageJson);
  } catch (err) {
    if (err && err.code !== 'EEXIST') {
      throw err;
    }
  }
}

async function installCore(directory) {
  console.log('Installing accelerator-core.');

  const cmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  const args = [
    'install',
    'accelerator-core'
  ];

  const spawnArgs = {
    cwd: directory,
  };

  const child = childProcess.spawn(cmd, args, spawnArgs);
  child.stdout.on('data', (data) => {
    console.log(data.toString());
  });

  child.stderr.on('data', (data) => {
    console.log(data.toString());
  });

  return new Promise((resolve, reject) => {
    child.on('exit', (code) => {
      if (code) {
        return reject(`Core installation exited with code ${code}.`);
      }

      resolve();
    });
  });
}

async function moveCore(directory) {
  console.log('Moving core contents to story folder.');

  const coreDir = path.join(directory, 'node_modules', 'accelerator-core');
  const copyArgs = {
    dot: true,
    overwrite: true,
  };

  try {
    fs.copy(coreDir, directory, copyArgs);
  } catch (e) {

  }
}

async function removeOldCore(directory) {
  console.log('Removing old core directory.');

  const coreDir = path.join(directory, 'node_modules', 'accelerator_core');
  await fs.remove(coreDir);
}

async function modifyCoreForRedistribution(directory, name) {
  console.log('Modifying core for redistribution.');
  await rewritePackageJson(directory);
  await writeGitignore(directory);
  await rewriteTslint(directory);
  await renameCodeWorkspace(directory, name);
  console.log('Finished modifying core.');
}

async function rewritePackageJson(directory) {
  console.log('Rewriting package.json.');
  
  const packagePath = path.join(directory, 'package.json');

  const data = await fs.readFile(packagePath);
  const corePackage;
  try {
    corePackage = JSON.parse(data.toString());
  } catch (err) {
    return reject(new Error('There was an error parsing the ' +
                            'package.json file:',
                            err));
  }

  /* Keep most important properties on top of the file. */
  corePackage = Object.assign({}, corePackage, {
    name: 'untitled-accelerator-story',
    description: 'An untitled story built with Accelerator ' +
                  '(accelerator-core, accelerator-tool).',
    version: '1.0.0',
    private: true,
  });

  /* Rewrite jest configuration so that the redist tests passages, headers,
    * footers, and plugins, even though the core repo/package does not, and
    * the redist does not test src/, even though the repo/package does. */
  corePackage.jest.testMatch = [
    '<rootDir>/(passages|headers|footers|plugins)/' +
    '**/?(*.)(spec|test).(j|t)s?(x)',
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

async function writeGitignore(directory) {
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
}

async function rewriteTslint(directory) {
  console.log('Rewriting tslint.json.');
  
  const tslintConfigPath = path.join(directory, 'tslint.json');

  const data = await fs.readFile(tslintConfigPath);
  const lintConfig;
  try {
    lintConfig = JSON.parse(data.toString());
  } catch (err) {
    return reject(new Error('There was an error parsing the ' +
                            'package.json file:',
                            err));
  }

  /* Do not lint source files in redists. */
  lintConfig.linterOptions.exclude.push(
    'src/',
  );

  await fs.writeFile(tslintConfigPath, JSON.stringify(lintConfig, null, 2));
}

async function renameCodeWorkspace(directory, name) {
  console.log('Renaming code-workspace file.');

  const from = path.join(directory, 'accelerator-core.code-workspace');
  const to = path.join(directory, name + '.code-workspace');
  await fs.rename(from, to);
}

async function installProject(directory) {
  console.log('Installing project dependencies.');

  const cmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  const args = [ 'install', ];

  const spawnArgs = {
    cwd: directory,
  };

  const child = childProcess.spawn(cmd, args, spawnArgs);
  child.stdout.on('data', function (data) {
    console.log(data.toString());
  });

  child.stderr.on('data', function (data) {
    console.log(data.toString());
  });

  return new Promise(function promise(resolve, reject) {
    child.on('exit', function (code) {
      if (code) {
        return reject('Project installation exited with code ' + code + '.');
      }

      resolve();
    });
  });
}
