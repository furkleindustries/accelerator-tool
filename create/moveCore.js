import {
  log,
} from 'colorful-logging/log';
import * as fs from 'fs-extra';
import * as path from 'path';

export async function moveCore(directory) {
  log('Moving core contents to story folder.');

  const coreDir = path.join(directory, 'node_modules', 'accelerator-core');
  const copyArgs = {
    dot: true,
    overwrite: true,
  };

  await fs.copy(coreDir, directory, copyArgs);
}
