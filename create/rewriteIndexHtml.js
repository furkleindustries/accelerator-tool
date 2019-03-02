import * as fs from 'fs-extra';
import {
  log,
} from 'colorful-logging';
import {
  makeTemplateReplacements,
} from '../functions/makeTemplateReplacements';
import * as path from 'path';

export async function rewriteIndexHtml(directory, config, name) {
  log('Rewriting index.html.');

  const indexPath = path.join(directory, 'templates', 'index.html');
  const data = await fs.readFile(indexPath, 'utf8');

  const rewrittenData = makeTemplateReplacements({
    config,
    data,
    name,
    /* Do not replace the publicUrl. This would break routing. */
    dontReplacePublicUrl: true,
  });

  await fs.writeFile(indexPath, rewrittenData);
}
