import {
  log,
} from 'colorful-logging';
import * as fs from 'fs-extra';
import * as path from 'path';

export async function removeOldCore(directory) {
  log('Removing old core directory.');

  const coreDir = path.join(directory, 'node_modules', 'accelerator_core');
  await fs.remove(coreDir);
}
