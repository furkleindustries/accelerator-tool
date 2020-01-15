import chalk from 'chalk';
import {
  log,
} from 'colorful-logging';
import {
  readFile,
  writeFile,
} from 'fs-extra';
import {
  makeTemplateReplacements,
} from '../functions/makeTemplateReplacements';
import * as path from 'path';

export const generateAssetStyleFile = async ({
  config,
  forceCss,
  name,
  newAssetDir,
  noCssModules,
  templatesDir,
  type,
}) =>
{
  const styleTemplatePath = path.join(
    templatesDir,
    `${type}.${(noCssModules ? 'nomodule.' : '')}` +
      `${(forceCss ? 'css' : 'less')}`,
  );

  log(`Reading style template from "${chalk.bold(styleTemplatePath)}".`);

  const data = await readFile(styleTemplatePath, 'utf8');
  log('Rewriting style template.');

  const rewrittenData = makeTemplateReplacements({
    config,
    data,
    name,
  });

  const newStylePath = path.join(newAssetDir, `${name}.less`);

  log(`Writing style template to "${chalk.bold(newStylePath)}".`);

  await writeFile(newStylePath, rewrittenData);
};
