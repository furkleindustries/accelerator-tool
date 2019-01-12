const fs = require('fs');
const path = require('path');

module.exports = async function _new(noun, name, directory) {
  try {
    await checkForFilepathReqs(directory);
  } catch (e) {
    console.error(e);
    return;
  }

  const newArgs = [ null, directory, name, ];
  if (/^passage(-tsx?)?$/.test(noun)) {
    newArgs[0] = 'passage-ts';
  } else if (/^passage-jsx?$/.test(noun)) {
    newArgs[0] = 'passage-js';
  } else if (/^header(-tsx?)?$/.test(noun)) {
    newArgs[0] = 'header-ts';
  } else if (/^header-jsx?$/.test(noun)) {
    newArgs[0] = 'header-js';
  } else if (/^footer(-tsx?)?$/.test(noun)) {
    newArgs[0] = 'footer-ts';
  } else if (/^footer-jsx?$/.test(noun)) {
    newArgs[0] = 'footer-js';
  } else if (/^plugin(-tsx?)?$/.test(noun)) {
    newArgs[0] = 'plugin-ts';
  } else if (/^plugin-jsx?$/.test(noun)) {
    newArgs[0] = 'plugin-js';
  } else {
    throw new Error('The subcommand ' + noun + ' was not recognized by ' +
                    'the accelerator-tool new command.');
  }

  try {
    if (/^passage-[jt]s$/.test(newArgs)) {
      await makeNewPassage.apply(null, newArgs);
      console.log(
        (/js$/.test(newArgs[0]) ? 'JavaScript ' : 'TypeScript ') +
        'passage, ' + name + ', created.'
      );
    } else if (/^header-[jt]s$/.test(newArgs[0])) {
      await makeNewHeader.apply(null, newArgs);
      console.log(
        (/js$/.test(newArgs[0]) ? 'JavaScript ' : 'TypeScript ') +
        'header, ' + name + ', created.'
      );
    } else if (newArgs[0] === 'footer-ts' || newArgs[0] === 'footer-js') {
      await makeNewFooter.apply(null, newArgs);
      console.log(
        (/js$/.test(newArgs[0]) ? 'JavaScript ' : 'TypeScript ') +
        'footer, ' + name + ', created.'
      );
    } else if (newArgs[0] === 'plugin-ts' || newArgs[0] === 'plugin-js') {
      await makeNewPlugin.apply(null, newArgs);
      console.log(
        (/js$/.test(newArgs[0]) ? 'JavaScript ' : 'TypeScript ') +
        'plugin, ' + name + ', created.'
      );
    }
  } catch (err) {
    console.error(err);
  }
};

async function checkForFilepathReqs(directory) {
  console.log('Checking filepath requirements.');

  const dirExists = await fs.exists(directory);
  if (!dirExists) {
    throw new Error(`There was no directory at ${directory}.`);
  }

  const passDirExists = fs.exists(path.join(directory, 'passages'));
  if (!passDirExists) {
    throw new Error(
      'There was no passages directory within ' + directory + '.'
    );
  }
}

async function makeNewPassage(type, directory, name) {
  if (!/^passage-[jt]s$/.test(type)) {
    throw new Error('The type received by makeNewPassage was neither ' +
                    '"passage-ts" nor "passage-js".');
  }

  const type = 'passage';
  const codeExtension = type === 'passage-js' ? '.jsx' : '.tsx'
  const destinationDir = path.join(directory, 'passages');
  const includeStyle = true;
  const templatesDir = path.join(directory, 'templates', type);

  return await makeNewAsset({
    codeExtension,
    destinationDir,
    includeStyle,
    name,
    templatesDir,
    type,
  });
}

async function makeNewHeader(type, directory, name) {
  if (!/^header-[jt]s$/.test(type)) {
    throw new Error('The type received by makeNewHeader was neither ' +
                    '"header-ts" nor "header-js".');
  }

  const type = 'header';
  const codeExtension = type === 'header-js' ? '.jsx' : '.tsx'
  const destinationDir = path.join(directory, 'headers');
  const includeStyle = true;
  const templatesDir = path.join(directory, 'templates', type);

  return await makeNewAsset({
    codeExtension,
    destinationDir,
    includeStyle,
    name,
    templatesDir,
    type,
  });
}

async function makeNewFooter(type, directory, name) {
  if (!/^footer-[jt]s$/.test(type)) {
    throw new Error('The type received by makeNewFooter was neither ' +
                    '"footer-ts" nor "footer-js".');
  }

  const type = 'footer';
  const codeExtension = type === 'footer-js' ? '.jsx' : '.tsx'
  const destinationDir = path.join(directory, 'footers');
  const includeStyle = true;
  const templatesDir = path.join(directory, 'templates', type);

  return await makeNewAsset({
    codeExtension,
    destinationDir,
    includeStyle,
    name,
    templatesDir,
    type,
  });
}

async function makeNewPlugin(type, directory, name) {
  if (!/^plugin-[jt]s$/.test(type)) {
    throw new Error('The type received by makeNewFooter was neither ' +
                    '"footer-ts" nor "footer-js".');
  }

  const type = 'plugin';
  const codeExtension = type === 'plugin-js' ? '.jsx' : '.tsx'
  const destinationDir = path.join(directory, 'plugins');
  /* Plugins do not have any styling by default. */
  const includeStyle = false;
  const templatesDir = path.join(directory, 'templates', type);

  return await makeNewAsset({
    codeExtension,
    destinationDir,
    includeStyle,
    name,
    templatesDir,
    type,
  });
}

async function makeNewAsset(args) {
  const codeExtension = args.codeExtension;
  const destinationDir = args.destinationDir;
  const includeStyle = args.includeStyle;
  const name = args.name;
  const templatesDir = args.templatesDir;
  const type = args.type;

  const newAssetDir = path.join(destinationDir, name);

  console.log('Creating new ' + type + ' directory at ' + newAssetDir);

  const codeTemplatePath = path.join(templatesDir, type + codeExtension);
  const testTemplatePath = path.join(templatesDir, type + '.test' + codeExtension);
  const styleTemplatePath = path.join(templatesDir, type + '.scss');

  try {
    await fs.mkdir(destinationDir);
  } catch (err) {
    if (err.code !== 'EEXIST') {
      return reject(err);
    }
  }

  await fs.mkdir(newAssetDir);

  console.log(`Reading code template at ${codeTemplatePath}`);

  await fs.readFile(codeTemplatePath);

  console.log('Rewriting code template.');

  const rewrittenData = makeGenericTemplateReplacements({
    data,
    name,
  });

  const newCodePath = path.join(newAssetDir, name + codeExtension);

  console.log('Writing code template to ' + newCodePath);

  await fs.writeFile(newCodePath, rewrittenData);

  console.log('Reading test template from ' + testTemplatePath);

  const data = fs.readFile(testTemplatePath);

  console.log('Rewriting test template.');

  const rewrittenData = makeGenericTemplateReplacements({
    data,
    name,
  });

  const newTestPath = path.join(newAssetDir, name + '.test' + codeExtension);

  console.log('Writing test template to ' + newTestPath);

  await fs.writeFile(newTestPath, rewrittenData);
  if (includeStyle) {
    console.log('Reading style template from ' + styleTemplatePath);

    const data = await fs.readFile(styleTemplatePath);
    console.log('Rewriting style template.');

    const rewrittenData = makeGenericTemplateReplacements({
      data,
      name,
    });

    const newStylePath = path.join(newAssetDir, name + '.scss');

    console.log('Writing style template to ' + newStylePath);

    await fs.writeFile(newStylePath, rewrittenData);
  }
}

function makeGenericTemplateReplacements({
  data,
  name,
}) {
  return data.toString().split('%NAME%').join(name);
}
