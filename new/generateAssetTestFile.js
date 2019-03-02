import chalk from 'chalk';
import {
  log,
} from 'colorful-logging/log';
import * as fs from 'fs-extra';
import {
  makeTemplateReplacements,
} from '../functions/makeTemplateReplacements';
import * as path from 'path';

export async function generateAssetTestFile({
  codeExtension,
  config,
  name,
  newAssetDir,
  templatesDir,
  type,
})
{
  const testTemplatePath = path.join(
    templatesDir,
    `${type}.test${codeExtension}`,
  );

  log(`Reading test template from "${chalk.bold(testTemplatePath)}".`);

  const data = await fs.readFile(testTemplatePath, 'utf8');

  log('Rewriting test template.');

  const rewrittenData = makeTemplateReplacements({
    config,
    data,
    name,
  });

  const newTestPath = path.join(newAssetDir, `${name}.test${codeExtension}`);

  log(`Writing test template to "${chalk.bold(newTestPath)}".`);

  await fs.writeFile(newTestPath, rewrittenData);
}
