import * as fs  from 'fs-extra';
import {
  IFID,
} from 'ifid';
import {
  makeTemplateReplacements,
} from '../functions/makeTemplateReplacements';
import * as path from 'path';

export async function rewriteConfig(directory, name) {
  const defPath = path.join(directory, 'src', 'configuration', 'defaults');
  const { defaults } = require(defPath);
  const ifid = new IFID().toString();
  const config = {
    ...defaults,
    ifid,
    name,
  };

  const configPath = path.join(directory, 'accelerator.config.js');
  const data = await fs.readFile(configPath, 'utf8');

  const modified = makeTemplateReplacements({
    config,
    data,
    name,
  });

  await fs.writeFile(configPath, modified);

  return import(path.join(directory, 'accelerator.config'));
}
