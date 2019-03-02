import chalk from 'chalk';
import {
  log,
} from 'colorful-logging';
import * as fs from 'fs-extra';
import {
  makeTemplateReplacements,
} from '../functions/makeTemplateReplacements';
import * as path from 'path';

export async function generateAssetCodeFile({
  codeExtension,
  config,
  name,
  newAssetDir,
  templatesDir,
  type,
})
{
  const codeTemplatePath = path.join(templatesDir, `${type}${codeExtension}`);

  log(`Reading code template from "${chalk.bold(codeTemplatePath)}".`);

  const data = await fs.readFile(codeTemplatePath, 'utf8');

  log('Rewriting code template.');

  const rewrittenData = makeTemplateReplacements({
    config,
    data,
    name,
  });

  const newCodePath = path.join(newAssetDir, `${name}${codeExtension}`);

  log(`Writing code template to "${chalk.bold(newCodePath)}".`);

  await fs.writeFile(newCodePath, rewrittenData);
}
