import {
  log,
} from 'colorful-logging';
import * as fs from 'fs-extra';
import * as path from 'path';

export async function renameCodeWorkspace(directory, name) {
  log('Renaming code-workspace file.');

  const from = path.join(directory, 'accelerator-core.code-workspace');
  const to = path.join(directory, `${name}.code-workspace`);
  await fs.rename(from, to);
}
